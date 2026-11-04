const types = new Set(["doc", "paragraph", "heading", "bulletList", "orderedList", "listItem", "blockquote", "horizontalRule", "hardBreak", "codeBlock", "image", "text"]);
const marks = new Set(["bold", "italic", "underline", "strike", "code", "link"]);
export function safeContentUrl(value) {
  if (typeof value !== "string" || value.length > 2048 || /[\s\\]/.test(value)) return false;
  if (/^\/api\/media\/[a-f0-9]{24}$/.test(value)) return true;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}
export function validateRichContent(value) {
  if (value == null) return null;
  const fail = () => { throw Object.assign(new Error("Invalid article formatting or media URL."), { status: 400 }); };
  if (JSON.stringify(value).length > 250000 || value.type !== "doc") fail();
  let nodes = 0;
  function visit(node, depth = 0) {
    if (!node || !types.has(node.type) || depth > 30 || ++nodes > 10000) fail();
    const result = { type: node.type };
    if (node.type === "text") { if (typeof node.text !== "string") fail(); result.text = node.text; }
    if (node.type === "heading") { if (![2,3,4].includes(node.attrs?.level)) fail(); result.attrs = { level: node.attrs.level }; }
    if (node.type === "image") { if (!safeContentUrl(node.attrs?.src)) fail(); result.attrs = { src: node.attrs.src, alt: String(node.attrs.alt || "").slice(0,200) }; }
    if (node.type === "orderedList") result.attrs = { start: Math.max(1, Math.min(9999, Number(node.attrs?.start) || 1)) };
    if (node.marks) {
      if (!Array.isArray(node.marks) || node.marks.length > 8) fail();
      result.marks = node.marks.map(mark => {
        if (!marks.has(mark.type)) fail();
        if (mark.type === "link") { if (!safeContentUrl(mark.attrs?.href)) fail(); return { type: "link", attrs: { href: mark.attrs.href, target: "_blank", rel: "noopener noreferrer" } }; }
        return { type: mark.type };
      });
    }
    if (node.content) { if (!Array.isArray(node.content)) fail(); result.content = node.content.map(child => visit(child, depth + 1)); }
    return result;
  }
  return visit(value);
}
export function richText(node) { return node?.type === "text" ? node.text : (node?.content || []).map(richText).join(["doc", "bulletList", "orderedList"].includes(node?.type) ? "\n\n" : ""); }
