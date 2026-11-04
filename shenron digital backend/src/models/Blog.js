import mongoose from "mongoose";

export const BLOG_CATEGORIES = [
  "Strategy",
  "Web development",
  "SEO",
  "Paid media",
  "Design",
];

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    description: { type: String, required: true, trim: true, maxlength: 320 },
    seoMetaTitle: { type: String, trim: true, maxlength: 70, default: "" },
    seoMetaDescription: { type: String, trim: true, maxlength: 160, default: "" },
    seoKeywords: { type: [{ type: String, trim: true, maxlength: 60 }], default: [] },
    category: { type: String, required: true, enum: BLOG_CATEGORIES, index: true },
    coverImage: { type: String, trim: true, maxlength: 2048, default: "" },
    content: { type: String, trim: true, maxlength: 50000, default: "" },
    author: { type: String, trim: true, maxlength: 100, default: "Kravs Infotech" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, min: 1, default: 1 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

blogSchema.index({ status: 1, featured: -1, publishedAt: -1 });
blogSchema.index({ title: "text", description: "text" });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
