import { BLOG_CATEGORIES } from "../models/Blog.js";

export function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180)
    .replace(/-+$/g, "");
}

export function buildBlogFields(input, current = null) {
  const title = String(input.title ?? current?.title ?? "").trim();
  const slug = slugify(input.slug ?? current?.slug ?? title);
  const description = String(input.description ?? current?.description ?? "").trim();
  const seoMetaTitle = String(input.seoMetaTitle ?? current?.seoMetaTitle ?? "").trim();
  const seoMetaDescription = String(input.seoMetaDescription ?? current?.seoMetaDescription ?? "").trim();
  const keywordInput = input.seoKeywords ?? current?.seoKeywords ?? [];
  const keywordList = Array.isArray(keywordInput) ? keywordInput : String(keywordInput).split(",");
  const seoKeywords = [...new Set(keywordList.map((keyword) => String(keyword).trim()).filter(Boolean))];
  const category = String(input.category ?? current?.category ?? "").trim();
  const content = String(input.content ?? current?.content ?? "").trim();
  const coverImage = String(input.coverImage ?? current?.coverImage ?? "").trim();
  const author = String(input.author ?? current?.author ?? "Kravs Infotech").trim();
  const status = String(input.status ?? current?.status ?? "draft");
  const featured = input.featured === undefined ? Boolean(current?.featured) : input.featured === true;

  if (!title || title.length > 160) throw Object.assign(new Error("Title is required and must be under 160 characters."), { status: 400 });
  if (!slug) throw Object.assign(new Error("The title must include letters or numbers to create a URL."), { status: 400 });
  if (!description || description.length > 320) throw Object.assign(new Error("Description is required and must be under 320 characters."), { status: 400 });
  if (seoMetaTitle.length > 70) throw Object.assign(new Error("SEO meta titles must be 70 characters or fewer."), { status: 400 });
  if (seoMetaDescription.length > 160) throw Object.assign(new Error("SEO meta descriptions must be 160 characters or fewer."), { status: 400 });
  if (seoKeywords.length > 20) throw Object.assign(new Error("Add no more than 20 SEO keywords."), { status: 400 });
  if (seoKeywords.some((keyword) => keyword.length > 60)) throw Object.assign(new Error("Each SEO keyword must be 60 characters or fewer."), { status: 400 });
  if (!BLOG_CATEGORIES.includes(category)) throw Object.assign(new Error("Choose a valid blog category."), { status: 400 });
  if (content.length > 50000) throw Object.assign(new Error("Article content must be under 50,000 characters."), { status: 400 });
  if (author.length > 100) throw Object.assign(new Error("Author name must be under 100 characters."), { status: 400 });
  if (!["draft", "published"].includes(status)) throw Object.assign(new Error("Choose draft or published status."), { status: 400 });
  if (status === "published" && content.length < 80) {
    throw Object.assign(new Error("Add at least 80 characters of article content before publishing."), { status: 400 });
  }
  if (coverImage) {
    const isLocalPath = coverImage.startsWith("/") && !coverImage.startsWith("//") && !coverImage.includes("\\");
    let isWebUrl = false;
    try {
      const url = new URL(coverImage);
      isWebUrl = ["http:", "https:"].includes(url.protocol);
    } catch {
      // Relative same-site image paths are allowed above.
    }
    if (!isLocalPath && !isWebUrl) throw Object.assign(new Error("Cover image must be an HTTP(S) URL or a same-site path."), { status: 400 });
  }

  const words = content.split(/\s+/).filter(Boolean).length;
  const wasPublished = current?.status === "published";
  const publishedAt = status === "published"
    ? (wasPublished ? current.publishedAt || new Date() : new Date())
    : null;

  return {
    title,
    slug,
    description,
    seoMetaTitle,
    seoMetaDescription,
    seoKeywords,
    category,
    content,
    coverImage,
    author: author || "Kravs Infotech",
    status,
    featured,
    readingTime: Math.max(1, Math.ceil(words / 200)),
    publishedAt,
  };
}
