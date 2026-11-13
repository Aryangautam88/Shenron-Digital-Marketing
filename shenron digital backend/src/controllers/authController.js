import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import { AdminAccount, getAdminAccount } from "../models/AdminAccount.js";
import { brandedSender, createMailer } from "../utils/mailer.js";
import { adminTokenOptions, cookieOptions } from "../middleware/auth.js";

export async function login(req, res) {
  const account = await getAdminAccount(req.app.locals.env);
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const passwordMatches = await bcrypt.compare(Buffer.byteLength(password, "utf8") <= 72 ? password : "", account.passwordHash);
  const valid = email === req.app.locals.env.adminEmail && password.length > 0 && passwordMatches;

  if (!valid) return res.status(401).json({ message: "Email or password is incorrect." });

  const env = req.app.locals.env;
  const token = jwt.sign({ role: "admin", version: account.sessionVersion }, env.jwtSecret, {
    ...adminTokenOptions,
    subject: env.adminEmail,
  });
  res.cookie(env.jwtCookieName, token, { ...cookieOptions(env), maxAge: 8 * 60 * 60 * 1000 });
  return res.json({ admin: { email: env.adminEmail } });
}

export function session(req, res) {
  return res.json({ admin: req.admin });
}

export async function logout(req, res) {
  const env = req.app.locals.env;
  await AdminAccount.updateOne({ email: env.adminEmail }, { $inc: { sessionVersion: 1 } });
  res.clearCookie(env.jwtCookieName, cookieOptions(env));
  return res.json({ message: "Signed out." });
}

const recoveryMessage = "If this email matches the admin account, a recovery link will be sent. Check your inbox and spam folder.";
const digest = token => createHash("sha256").update(token).digest("hex");

export async function forgotPassword(req, res) {
  const env = req.app.locals.env;
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  // Respond before SMTP work for a consistent response regardless of account existence.
  res.status(202).json({ message: recoveryMessage });
  try {
    const account = await getAdminAccount(env);
    if (email !== env.adminEmail || !env.smtpHost || !env.mailFrom) return;
    const token = randomBytes(32).toString("hex");
    const resetHash = digest(token);
    const claimed = await AdminAccount.findOneAndUpdate({ _id: account._id,
      $or: [{ resetRequestedAt: { $exists: false } }, { resetRequestedAt: { $lt: new Date(Date.now() - 60000) } }],
    }, { $set: { resetHash, resetExpiresAt: new Date(Date.now() + 15 * 60000), resetRequestedAt: new Date() } });
    if (!claimed) return;
    const url = new URL("/admin", env.clientOrigins[0]);
    url.hash = `reset=${token}`;
    const mailer = createMailer(env);
    try {
      await mailer.sendMail({ from: brandedSender(env), to: env.adminEmail,
        subject: "Reset your Kravs Infotech admin password",
        text: `Use this link to set a new admin password:\n\n${url.href}\n\nThis link expires in 15 minutes and can be used once. If you did not request this, ignore this email.`,
      });
    } catch (error) {
      await AdminAccount.updateOne({ _id: account._id, resetHash }, { $unset: { resetHash: "", resetExpiresAt: "" } });
      console.error("Password recovery SMTP failed:", error.code || "unknown");
    } finally { mailer.close(); }
  } catch { console.error("Password recovery could not be processed."); }
}

export async function resetPassword(req, res) {
  const { token, password } = req.body || {};
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) {
    return res.status(400).json({ message: "This recovery link is invalid or expired. Request a new one." });
  }
  if (typeof password !== "string" || password.length < 12 || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({ message: "Use a password with at least 12 characters and at most 72 UTF-8 bytes." });
  }
  const env = req.app.locals.env;
  const resetHash = digest(token);
  const filter = { email: env.adminEmail, resetHash, resetExpiresAt: { $gt: new Date() } };
  if (!await AdminAccount.exists(filter)) return res.status(400).json({ message: "This recovery link is invalid or expired. Request a new one." });
  const passwordHash = await bcrypt.hash(password, 12);
  const account = await AdminAccount.findOneAndUpdate({ ...filter, resetExpiresAt: { $gt: new Date() } }, {
    $set: { passwordHash }, $inc: { sessionVersion: 1 }, $unset: { resetHash: "", resetExpiresAt: "" },
  });
  if (!account) return res.status(400).json({ message: "This recovery link is invalid or expired. Request a new one." });
  res.clearCookie(env.jwtCookieName, cookieOptions(env));
  return res.json({ message: "Password updated. Sign in with your new password. All previous sessions have been signed out." });
}
