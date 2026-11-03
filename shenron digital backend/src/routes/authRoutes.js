import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, session } from "../controllers/authController.js";
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
  router.post("/logout", requireSameOrigin(env), logout);
  return router;
}
