import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link2, ImagePlus, Undo2, Redo2, Minus, RemoveFormatting } from "lucide-react";
import { uploadAsset } from "../lib/uploadAsset";

export default function RichEditor({ form, onChange, onError, onBusy }) {
  const [link, setLink] = useState(null);
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ heading: { levels: [2,3,4] }, link: { openOnClick: false } }), Image, Placeholder.configure({ placeholder: "Start writing your article…" })],
    content: form.richContent || { type: "doc", content: form.content.split(/\n\s*\n/).map(text => ({ type: "paragraph", ...(text ? { content: [{ type: "text", text }] } : {}) })) },
    onUpdate: ({ editor: current }) => onChange({ richContent: current.getJSON(), content: current.getText() }),
    editorProps: { attributes: { "aria-label": "Article content", role: "textbox", "aria-multiline": "true" } },
  });
  if (!editor) return <p>Loading editor…</p>;
  const tool = (label, Icon, action, active = false) => <button key={label} type="button" title={label} aria-label={label} aria-pressed={active} onClick={action}><Icon size={16}/></button>;
  async function insertImage(event) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { onError("Choose a PNG, JPEG, or WebP image up to 5 MB."); return; }
    onBusy(true);
    try { const url = await uploadAsset(file); editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run(); }
    catch (err) { onError(err.message); }
    finally { onBusy(false); event.target.value = ""; }
  }
  return <div className="desk-rich-editor"><div className="desk-toolbar" role="toolbar" aria-label="Article formatting">
    {tool("Bold", Bold, () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
    {tool("Italic", Italic, () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
    {tool("Underline", Underline, () => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'))}
    {[2,3,4].map(level => <button type="button" key={level} aria-pressed={editor.isActive('heading',{level})} onClick={() => editor.chain().focus().toggleHeading({level}).run()}>H{level}</button>)}
    {tool("Bullet list", List, () => editor.chain().focus().toggleBulletList().run())}
    {tool("Numbered list", ListOrdered, () => editor.chain().focus().toggleOrderedList().run())}
    {tool("Quote", Quote, () => editor.chain().focus().toggleBlockquote().run())}
    {tool("Add or edit link", Link2, () => setLink(editor.getAttributes('link').href || "https://"))}
    {tool("Divider", Minus, () => editor.chain().focus().setHorizontalRule().run())}
    <label className="desk-upload-tool"><ImagePlus size={16}/> Image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={insertImage}/></label>
    {tool("Undo", Undo2, () => editor.chain().focus().undo().run())}{tool("Redo", Redo2, () => editor.chain().focus().redo().run())}{tool("Clear formatting", RemoveFormatting, () => editor.chain().focus().unsetAllMarks().clearNodes().run())}
  </div>
    {link !== null && <div className="desk-link-editor"><input aria-label="Link URL" type="url" value={link} onChange={e => setLink(e.target.value)}/><button type="button" onClick={() => { try { if (!['http:','https:'].includes(new URL(link).protocol)) throw new Error(); editor.chain().focus().extendMarkRange('link').setLink({href:link}).run(); setLink(null); } catch { onError("Enter a full HTTP or HTTPS link."); } }}>Apply link</button><button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setLink(null); }}>Remove link</button><button type="button" onClick={() => setLink(null)}>Cancel</button></div>}
    <EditorContent editor={editor} className="article-rich-content"/>
    <div className="desk-editor-count">{form.content.trim().split(/\s+/).filter(Boolean).length} words · {form.content.length.toLocaleString()}/50,000 characters</div>
  </div>;
}
