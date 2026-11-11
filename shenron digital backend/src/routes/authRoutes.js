import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, session, forgotPassword, resetPassword } from "../controllers/authController.js";
import { requireAdmin, requireSameOrigin } from "../middleware/auth.js";

export function createAuthRoutes(env) {
  const router = Router();
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many sign-in attempts. Wait a few minutes and try again." },
  });

  router.post("/login", loginLimiter, requireSameOrigin(env), login);
  router.get("/session", requireAdmin(env), session);
  const recoveryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-8", legacyHeaders: false,
    message: { message: "Too many recovery attempts. Please try again in 15 minutes." } });
  router.post("/forgot-password", recoveryLimiter, requireSameOrigin(env), forgotPassword);
  const resetLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false,
    message: { message: "Too many reset attempts. Please try again in 15 minutes." } });
  router.post("/reset-password", resetLimiter, requireSameOrigin(env), resetPassword);
  router.post("/logout", requireSameOrigin(env), requireAdmin(env), logout);
  return router;
}
