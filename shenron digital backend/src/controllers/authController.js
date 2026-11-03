import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { adminTokenOptions, cookieOptions } from "../middleware/auth.js";

export async function login(req, res) {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const valid = email === req.app.locals.env.adminEmail &&
    password.length > 0 &&
    Buffer.byteLength(password, "utf8") <= 72 &&
    await bcrypt.compare(password, req.app.locals.env.adminPasswordHash);

  if (!valid) return res.status(401).json({ message: "Email or password is incorrect." });

  const env = req.app.locals.env;
  const token = jwt.sign({ role: "admin" }, env.jwtSecret, {
    ...adminTokenOptions,
    subject: env.adminEmail,
  });
  res.cookie(env.jwtCookieName, token, { ...cookieOptions(env), maxAge: 8 * 60 * 60 * 1000 });
  return res.json({ admin: { email: env.adminEmail } });
}

export function session(req, res) {
  return res.json({ admin: req.admin });
}

export function logout(req, res) {
  const env = req.app.locals.env;
  res.clearCookie(env.jwtCookieName, cookieOptions(env));
  return res.json({ message: "Signed out." });
}
