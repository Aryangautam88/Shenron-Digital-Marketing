import { Router } from "express";
import { getPublished, listPublished } from "../controllers/blogController.js";

export const publicBlogRoutes = Router();
publicBlogRoutes.get("/", listPublished);
publicBlogRoutes.get("/:slug", getPublished);
