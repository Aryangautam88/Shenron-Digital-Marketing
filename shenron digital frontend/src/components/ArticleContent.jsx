import { createElement } from "react";
import "./ArticleContent.css";

function safeUrl(value) {
  if (typeof value !== "string" || /[\s\\]/.test(value)) return "";
  if (/^\/api\/media\/[a-f0-9]{24}$/.test(value)) return value;
  try { return ["http:", "https:"].includes(new URL(value).protocol) ? value : ""; } catch { return ""; }
}
function renderNode(node, key, depth = 0) {
  if (!node || depth > 30) return null;
  if (node.type === "text") {
    return (node.marks || []).reduce((text, mark, index) => {
      const tags = { bold: "strong", italic: "em", underline: "u", strike: "s", code: "code" };
      if (tags[mark.type]) return createElement(tags[mark.type], { key: `${key}-${index}` }, text);
      if (mark.type === "link" && safeUrl(mark.attrs?.href)) return <a key={`${key}-${index}`} href={safeUrl(mark.attrs.href)} target="_blank" rel="noopener noreferrer">{text}</a>;
      return text;
    }, node.text);
  }
  if (node.type === "image") return safeUrl(node.attrs?.src) ? <img key={key} src={safeUrl(node.attrs.src)} alt={node.attrs.alt || ""} loading="lazy"/> : null;
  if (node.type === "hardBreak") return <br key={key}/>;
  if (node.type === "horizontalRule") return <hr key={key}/>;
  const children = (node.content || []).map((child, i) => renderNode(child, `${key}-${i}`, depth + 1));
  if (node.type === "doc") return children;
  if (node.type === "codeBlock") return <pre key={key}><code>{children}</code></pre>;
  const tags = { paragraph: "p", bulletList: "ul", orderedList: "ol", listItem: "li", blockquote: "blockquote" };
  const tag = node.type === "heading" ? `h${[2,3,4].includes(node.attrs?.level) ? node.attrs.level : 2}` : tags[node.type];
  return tag ? createElement(tag, { key }, children) : null;
}
export function FeaturedVideo({ url }) {
  const safe = safeUrl(url);
  if (!safe) return null;
  if (safe.startsWith("/api/media/") || /\.(mp4|webm)(\?|$)/i.test(safe) || /\/api\/media\/[a-f0-9]{24}$/.test(safe)) return <video className="article-video" src={safe} controls preload="metadata"/>;
  const parsed = new URL(safe);
  let embed = "";
  if (["youtube.com", "www.youtube.com", "youtu.be", "www.youtu.be"].includes(parsed.hostname)) {
    const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    if (/^[a-zA-Z0-9_-]{11}$/.test(id || "")) embed = `https://www.youtube-nocookie.com/embed/${id}`;
  }
  if (["vimeo.com", "www.vimeo.com"].includes(parsed.hostname) && /^\/\d+$/.test(parsed.pathname)) embed = `https://player.vimeo.com/video${parsed.pathname}`;
  return embed ? <iframe className="article-video" src={embed} title="Featured article video" loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen/> : <a href={safe} target="_blank" rel="noopener noreferrer">Watch featured video</a>;
}
export default function ArticleContent({ richContent, content = "" }) {
  return <div className="article-rich-content">{richContent ? renderNode(richContent, "article") : content.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>;
}
