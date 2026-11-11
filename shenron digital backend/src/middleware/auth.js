import jwt from "jsonwebtoken";
import { getAdminAccount } from "../models/AdminAccount.js";

const ISSUER = "shenron-digital";
const AUDIENCE = "shenron-digital-admin";

export function requireAdmin(env) {
  return async (req, res, next) => {
    const token = req.cookies?.[env.jwtCookieName];
    if (!token) return res.status(401).json({ message: "Admin sign-in is required." });

    try {
      const session = jwt.verify(token, env.jwtSecret, { issuer: ISSUER, audience: AUDIENCE, algorithms: ["HS256"] });
      if (session.role !== "admin" || session.sub !== env.adminEmail) throw new Error("Invalid admin session.");
      const account = await getAdminAccount(env);
      if (session.version !== account.sessionVersion) throw new Error("Revoked session.");
      req.admin = { email: session.sub, role: session.role };
      return next();
    } catch {
      res.clearCookie(env.jwtCookieName, cookieOptions(env));
      return res.status(401).json({ message: "Your admin session expired. Sign in again." });
    }
  };
}

export function requireSameOrigin(env) {
  return (req, res, next) => {
    const origin = req.get("origin")?.replace(/\/$/, "");
    if (!origin || !env.clientOrigins.includes(origin)) {
      return res.status(403).json({ message: "This request origin is not allowed." });
    }
    return next();
  };
}

export function cookieOptions(env) {
  return {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
    path: "/api/admin",
  };
}

export const adminTokenOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: "8h" };
