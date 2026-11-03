import { Blog } from "../models/Blog.js";
import { buildBlogFields } from "../utils/blogFields.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function listPublished(req, res) {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(36, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
  const filter = { status: "published" };
  const category = String(req.query.category || "").trim();
  const search = String(req.query.search || "").trim();
  if (category) filter.category = category;
  if (search) {
    const safeSearch = new RegExp(escapeRegex(search.slice(0, 80)), "i");
    filter.$or = [{ title: safeSearch }, { description: safeSearch }, { category: safeSearch }];
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select("title slug description category coverImage author featured readingTime publishedAt createdAt updatedAt")
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);
  return res.json({ blogs, pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) } });
}

export async function getPublished(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!blog) return res.status(404).json({ message: "This article could not be found." });
  return res.json({ blog });
}

export async function listAdmin(req, res) {
  const filter = {};
  if (["draft", "published"].includes(req.query.status)) filter.status = req.query.status;
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.search) {
    const safeSearch = new RegExp(escapeRegex(String(req.query.search).slice(0, 80)), "i");
    filter.$or = [{ title: safeSearch }, { description: safeSearch }, { slug: safeSearch }];
  }
  const blogs = await Blog.find(filter).sort({ updatedAt: -1 }).limit(200).lean();
  return res.json({ blogs });
}

export async function getAdmin(req, res) {
  const blog = await Blog.findById(req.params.id).lean();
  if (!blog) return res.status(404).json({ message: "This article could not be found." });
  return res.json({ blog });
}

export async function createBlog(req, res) {
  const fields = buildBlogFields(req.body || {});
  const blog = await Blog.create(fields);
  return res.status(201).json({ blog });
}

export async function updateBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "This article could not be found." });
  Object.assign(blog, buildBlogFields(req.body || {}, blog));
  await blog.save();
  return res.json({ blog });
}

export async function deleteBlog(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: "This article could not be found." });
  return res.json({ message: "Article deleted." });
}
