import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { createAuthRoutes } from "./routes/authRoutes.js";
import { createAdminBlogRoutes } from "./routes/adminBlogRoutes.js";
import { publicBlogRoutes } from "./routes/publicBlogRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp(env) {
  const app = express();
  app.locals.env = env;

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || env.clientOrigins.includes(origin.replace(/\/$/, ""))) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
  });
  app.use("/api/blogs", publicBlogRoutes);
  app.use("/api/admin", createAuthRoutes(env));
  app.use("/api/admin/blogs", createAdminBlogRoutes(env));
  app.use((req, res) => res.status(404).json({ message: "API route not found." }));
  app.use(errorHandler);

  return app;
}
