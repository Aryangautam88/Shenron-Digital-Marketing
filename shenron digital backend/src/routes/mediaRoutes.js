import express, { Router } from "express";
import mongoose from "mongoose";
import { requireAdmin, requireSameOrigin } from "../middleware/auth.js";

const Media = mongoose.model("Media", new mongoose.Schema({ data: Buffer, contentType: String }, { timestamps: true }));
export function imageType(bytes) {
  if (!Buffer.isBuffer(bytes)) return null;
  if (bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return "image/png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}
export function createMediaRoutes(env) {
  const router = Router();
  router.post("/admin/uploads", requireAdmin(env), requireSameOrigin(env), express.raw({ type: ["image/png", "image/jpeg", "image/webp", "video/mp4", "video/webm"], limit: "10mb" }), async (req, res) => {
    let contentType = imageType(req.body);
    if (Buffer.isBuffer(req.body) && !contentType) {
      if (req.body.toString("ascii", 4, 8) === "ftyp") contentType = "video/mp4";
      if (req.body.subarray(0, 4).equals(Buffer.from([26,69,223,163]))) contentType = "video/webm";
    }
    if (!contentType || req.body.length < 32 || contentType !== req.get("Content-Type") || (contentType.startsWith("image/") && req.body.length > 5 * 1024 * 1024)) return res.status(400).json({ message: "Upload PNG/JPEG/WebP images up to 5 MB or MP4/WebM videos up to 10 MB." });
    const media = await Media.create({ data: req.body, contentType });
    res.status(201).json({ url: `/api/media/${media._id}` });
  });
  router.get("/media/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404);
    const media = await Media.findById(req.params.id).lean();
    if (!media) return res.sendStatus(404);
    res.set({ "Content-Type": media.contentType, "Cache-Control": "public, max-age=31536000, immutable", "Cross-Origin-Resource-Policy": "cross-origin" });
    const data = Buffer.from(media.data.buffer ?? media.data);
    res.set("Accept-Ranges", "bytes");
    const range = req.get("range");
    if (range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range);
      const start = match ? Number(match[1]) : NaN;
      const end = match?.[2] ? Math.min(Number(match[2]), data.length - 1) : data.length - 1;
      if (!Number.isSafeInteger(start) || start < 0 || start > end || start >= data.length) return res.status(416).set("Content-Range", `bytes */${data.length}`).end();
      return res.status(206).set("Content-Range", `bytes ${start}-${end}/${data.length}`).send(data.subarray(start, end + 1));
    }
    res.send(data);
  });
  return router;
}
