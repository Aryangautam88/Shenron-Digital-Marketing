import { blogApi } from "./blogApi";

export async function uploadAsset(file) {
  const result = await blogApi("/admin/uploads", { method: "POST", headers: { "Content-Type": file.type }, body: file });
  const base = import.meta.env.VITE_API_BASE_URL;
  return base?.startsWith("http") ? new URL(result.url, base).href : result.url;
}
