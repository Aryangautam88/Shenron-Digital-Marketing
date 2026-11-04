import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";
import { requireAdmin, requireSameOrigin } from "../middleware/auth.js";
import { createMailer } from "../utils/mailer.js";

const allowedServices = ["SEO", "Paid advertising", "Brand & digital design", "Web development", "Influencer marketing", "Not sure yet"];
export function validateEnquiry(body = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw Object.assign(new Error("Invalid enquiry."), { status: 400 });
  const fields = {};
  for (const [key, max] of Object.entries({ name: 100, email: 254, company: 150, phone: 30, message: 5000 })) {
    const value = body[key] ?? "";
    if (typeof value !== "string" || value.trim().length > max) throw Object.assign(new Error(`Invalid ${key}.`), { status: 400 });
    fields[key] = value.trim();
  }
  if (!fields.name || fields.message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || /[\r\n]/.test(fields.email) || body.consent !== "yes") {
    throw Object.assign(new Error("Enter your name, a valid email, a message of at least 10 characters, and your consent."), { status: 400 });
  }
  const services = body.services ?? [];
  if (!Array.isArray(services) || services.length > 6 || services.some(service => !allowedServices.includes(service))) throw Object.assign(new Error("Choose valid services."), { status: 400 });
  return { ...fields, email: fields.email.toLowerCase(), services: [...new Set(services)], consentAt: new Date() };
}

export function createContactRoutes() {
  const router = Router();
  router.post("/", rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Too many enquiries. Please try again later." } }), async (req, res) => {
    const fields = validateEnquiry(req.body);
    await Enquiry.create(fields);
    res.status(201).json({ message: "Your enquiry has been received." });
  });
  return router;
}

export function createAdminEnquiryRoutes(env) {
  const router = Router();
  router.use(requireAdmin(env));
  router.get("/", async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const filter = {};
    const search = String(req.query.search || "").trim().slice(0,100);
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = ["name", "email", "phone", "company", "message"].map(key => ({ [key]: new RegExp(escaped, "i") }));
    }
    if (["new", "in-progress", "resolved"].includes(req.query.status)) filter.status = req.query.status;
    const [enquiries, total, unread] = await Promise.all([
      Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * 25).limit(25).lean(),
      Enquiry.countDocuments(filter), Enquiry.countDocuments({ status: "new" }),
    ]);
    res.json({ enquiries, total, unread, mailConfigured: Boolean(env.smtpHost && env.mailFrom), pages: Math.max(1, Math.ceil(total / 25)) });
  });
  router.patch("/:id", requireSameOrigin(env), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Enquiry not found." });
    const update = {};
    if (req.body.status !== undefined) {
      if (!["new", "in-progress", "resolved"].includes(req.body.status)) return res.status(400).json({ message: "Invalid status." });
      update.status = req.body.status;
    }
    if (req.body.notes !== undefined) {
      if (typeof req.body.notes !== "string" || req.body.notes.length > 5000) return res.status(400).json({ message: "Notes must be under 5,000 characters." });
      update.notes = req.body.notes.trim();
    }
    if (req.body.replyDraft !== undefined) {
      if (typeof req.body.replyDraft !== "string" || req.body.replyDraft.length > 10000) return res.status(400).json({ message: "Reply draft must be under 10,000 characters." });
      update["reply.draft"] = req.body.replyDraft.trim();
    }
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found." });
    res.json({ enquiry });
  });
  router.post("/:id/reply", requireSameOrigin(env), rateLimit({ windowMs: 60000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false }), async (req, res) => {
    if (!env.smtpHost || !env.mailFrom) return res.status(503).json({ message: "Configure SMTP before sending replies." });
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Enquiry not found." });
    const message = req.body?.message;
    if (typeof message !== "string" || message.trim().length < 10 || message.length > 10000) return res.status(400).json({ message: "Reply must contain 10–10,000 characters." });
    const enquiry = await Enquiry.findOneAndUpdate({ _id: req.params.id, $or: [{ "reply.lockedUntil": { $exists: false } }, { "reply.lockedUntil": { $lte: new Date() } }] }, { $set: { "reply.lockedUntil": new Date(Date.now() + 120000) } }, { new: true });
    if (!enquiry) return res.status(409).json({ message: "Reply is already being sent, or the enquiry no longer exists." });
    const mailer = createMailer(env);
    try {
      await mailer.sendMail({ from: env.mailFrom, to: enquiry.email, subject: "Your enquiry — Kravs Infotech", text: message.trim() });
      await Enquiry.updateOne({ _id: enquiry._id }, { $set: { "reply.draft": message.trim(), "reply.lastMessage": message.trim(), "reply.sentAt": new Date() } });
      res.json({ message: "Reply accepted by the mail server." });
    } catch { res.status(502).json({ message: "Reply could not be confirmed. Check SMTP settings and delivery status before retrying." }); }
    finally { mailer.close(); await Enquiry.updateOne({ _id: enquiry._id }, { $unset: { "reply.lockedUntil": "" } }); }
  });
  router.post("/:id/retry-email", requireSameOrigin(env), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Enquiry not found." });
    const enquiry = await Enquiry.findOneAndUpdate({ _id: req.params.id, "acknowledgement.status": "failed" }, { $set: {
      "acknowledgement.status": "pending", "acknowledgement.attempts": 0, "acknowledgement.nextAttemptAt": new Date(),
    } }, { new: true });
    if (!enquiry) return res.status(409).json({ message: "Only failed acknowledgement emails can be retried." });
    res.json({ message: "Acknowledgement queued for retry." });
  });
  return router;
}
