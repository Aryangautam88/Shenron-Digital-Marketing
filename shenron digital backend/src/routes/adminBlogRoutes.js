import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAdmin,
  listAdmin,
  updateBlog,
} from "../controllers/blogController.js";
import { requireAdmin, requireSameOrigin } from "../middleware/auth.js";

export function createAdminBlogRoutes(env) {
  const router = Router();
  const originGuard = requireSameOrigin(env);
  router.use(requireAdmin(env));
  router.use((req, res, next) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return originGuard(req, res, next);
    return next();
  });

  router.get("/", listAdmin);
  router.get("/:id", getAdmin);
  router.post("/", createBlog);
  router.put("/:id", updateBlog);
  router.delete("/:id", deleteBlog);
  return router;
}
