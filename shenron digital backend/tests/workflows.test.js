import "dotenv/config";
import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import net from "node:net";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AdminAccount } from "../src/models/AdminAccount.js";
import { createApp } from "../src/app.js";
import { Enquiry } from "../src/models/Enquiry.js";
import { validateEnquiry } from "../src/routes/enquiryRoutes.js";
import { startAcknowledgements } from "../src/utils/acknowledgements.js";
import { imageType } from "../src/routes/mediaRoutes.js";
import { validateRichContent } from "../src/utils/richContent.js";

const valid = { name: "Test visitor", email: "visitor@example.test", company: "Example", phone: "", message: "Please help with our website project.", services: ["SEO"], consent: "yes" };
test("contact validation rejects missing consent, injected fields, invalid email and services", () => {
  assert.equal(validateEnquiry(valid).email, valid.email);
  for (const override of [{ consent: "no" }, { name: {} }, { email: "bad" }, { email: "test@example.test\r\nBcc: other@example.test" }, { services: ["invalid"] }, { message: "tiny" }]) {
    assert.throws(() => validateEnquiry({ ...valid, ...override }), { status: 400 });
  }
  assert.equal(imageType(Buffer.from("<svg>not an allowed upload</svg>")), null);
  for (const node of [
    { type: "image", attrs: { src: "javascript:alert(1)" } },
    { type: "text", text: "unsafe", marks: [{ type: "link", attrs: { href: "javascript:alert(1)" } }] },
    { type: "script", content: [] },
  ]) assert.throws(() => validateRichContent({type:"doc",content:[node]}), {status:400});
});

test("authenticated enquiry, SMTP acknowledgement, upload and blog workflows", { skip: !process.env.MONGODB_URI, timeout: 30000 }, async () => {
  const dbName = `shenron_test_${Date.now()}_${process.pid}`;
  assert.match(dbName, /^shenron_test_\d+_\d+$/);
  let server, smtp, stopMail;
  const messages = [];
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName, serverSelectionTimeoutMS: 4000 });
    // Local SMTP sink: captures mail without contacting an external mail server.
    smtp = net.createServer(socket => {
      socket.write("220 localhost test SMTP\r\n");
      let buffer = "", data = false, body = "";
      socket.on("data", chunk => {
        buffer += chunk.toString();
        while (buffer.includes("\r\n")) {
          const end = buffer.indexOf("\r\n"), line = buffer.slice(0, end);
          buffer = buffer.slice(end + 2);
          if (data) {
            if (line === ".") { messages.push(body); body = ""; data = false; socket.write("250 accepted\r\n"); }
            else body += line + "\n";
          } else if (/^EHLO|^HELO/i.test(line)) socket.write("250 localhost\r\n");
          else if (/^DATA/i.test(line)) { data = true; socket.write("354 send message\r\n"); }
          else if (/^QUIT/i.test(line)) socket.end("221 bye\r\n");
          else socket.write("250 OK\r\n");
        }
      });
    });
    await new Promise(resolve => smtp.listen(0, "127.0.0.1", resolve));
    const env = { nodeEnv: "development", clientOrigins: ["http://localhost:5173"], adminEmail: "admin@example.test", adminPasswordHash: await bcrypt.hash("test-password-only", 4), jwtSecret: "test-secret-that-is-at-least-32-characters", jwtCookieName: "test_admin", smtpHost: "127.0.0.1", smtpPort: smtp.address().port, mailFrom: "test@example.test" };
    server = createServer(createApp(env));
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    let cookie = "";
    const request = (path, method = "GET", body, extras = {}) => fetch(base + "/api" + path, { method, headers: { Origin: env.clientOrigins[0], ...(cookie ? { Cookie: cookie } : {}), ...(body ? { "Content-Type": "application/json" } : {}), ...extras }, body: body ? JSON.stringify(body) : undefined });
    for (const path of ["/admin/enquiries", "/admin/blogs", "/admin/session"]) assert.equal((await request(path)).status, 401);
    assert.equal((await request("/admin/uploads", "POST")).status, 401);
    assert.equal((await request("/contact", "POST", { ...valid, consent: "no" })).status, 400);
    assert.equal((await request("/contact", "POST", valid)).status, 201);
    assert.equal(await Enquiry.countDocuments(), 1);
    stopMail = startAcknowledgements(env);
    for (let i = 0; i < 50; i++) {
      if ((await Enquiry.findOne().lean()).acknowledgement.status === "sent") break;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.equal((await Enquiry.findOne().lean()).acknowledgement.status, "sent");
    assert.equal(messages.length, 1);
    assert.match(messages[0], /visitor@example.test/);
    assert.equal((await request("/admin/login", "POST", { email: env.adminEmail, password: "wrong" })).status, 401);
    const login = await request("/admin/login", "POST", { email: env.adminEmail, password: "test-password-only" });
    assert.equal(login.status, 200);
    const setCookie = login.headers.get("set-cookie");
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /SameSite=Lax/i);
    cookie = setCookie.split(";")[0];
    const inbox = await (await request("/admin/enquiries")).json();
    assert.equal(inbox.unread, 1);
    const id = inbox.enquiries[0]._id;
    assert.equal((await request(`/admin/enquiries/${id}`, "PATCH", { status: "resolved" }, { Origin: "https://evil.example" })).status, 403);
    assert.equal((await request(`/admin/enquiries/${id}`, "PATCH", { status: "in-progress", notes: "Follow up tomorrow" })).status, 200);
    assert.equal((await Enquiry.findById(id)).notes, "Follow up tomorrow");
    assert.equal((await request(`/admin/enquiries/${id}`, "PATCH", { replyDraft: "Saved response for our visitor." })).status, 200);
    assert.equal((await Enquiry.findById(id)).reply.draft, "Saved response for our visitor.");
    assert.equal((await request(`/admin/enquiries/${id}/reply`, "POST", {message:"Too short"})).status, 400);
    assert.equal((await request(`/admin/enquiries/${id}/reply`, "POST", {message:"Your enquiry has been reviewed. We will be in touch."}, {Origin:"https://evil.example"})).status, 403);
    assert.equal((await request(`/admin/enquiries/${id}/reply`, "POST", {message:"Your enquiry has been reviewed. We will be in touch."})).status, 200);
    assert.equal(messages.length, 2);
    assert.ok((await Enquiry.findById(id)).reply.sentAt);
    const searched = await (await request('/admin/enquiries?search=Test%20visitor')).json();
    assert.equal(searched.total, 1);
    assert.equal((await (await request('/admin/enquiries?search=nonexistent')).json()).total, 0);
    assert.equal((await request(`/admin/enquiries/${id}/retry-email`, "POST")).status, 409);
    await Enquiry.updateOne({ _id: id }, { $set: { "acknowledgement.status": "failed", "acknowledgement.attempts": 5 } });
    assert.equal((await request(`/admin/enquiries/${id}/retry-email`, "POST")).status, 200);
    assert.equal((await Enquiry.findById(id)).acknowledgement.status, "pending");
    const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aXioAAAAASUVORK5CYII=", "base64");
    const upload = await fetch(base + "/api/admin/uploads", { method: "POST", headers: { Cookie: cookie, Origin: env.clientOrigins[0], "Content-Type": "image/png" }, body: png });
    assert.equal(upload.status, 201);
    const { url } = await upload.json();
    const downloaded = await fetch(base + url);
    assert.equal(downloaded.headers.get("content-type"), "image/png");
    assert.deepEqual(Buffer.from(await downloaded.arrayBuffer()), png);
    const partial = await fetch(base + url, {headers:{Range:'bytes=0-7'}});
    assert.equal(partial.status, 206);
    assert.deepEqual(Buffer.from(await partial.arrayBuffer()), png.subarray(0,8));
    const richContent = {type:'doc', content:[{type:'heading',attrs:{level:2},content:[{type:'text',text:'A formatted heading'}]}, {type:'paragraph',content:[{type:'text',text:'Useful article content. '.repeat(8),marks:[{type:'bold'}]}]}, {type:'image',attrs:{src:url,alt:'Test cover'}}]};
    const payload = { title: "Test article", description: "Test description", category: "Strategy", content: "Useful article content. ".repeat(8), richContent, coverAlt:'Test cover', status: "draft", coverImage: url };
    const created = await request("/admin/blogs", "POST", payload);
    assert.equal(created.status, 201);
    const { blog } = await created.json();
    assert.equal((await request(`/blogs/${blog.slug}`)).status, 404);
    assert.equal((await request(`/admin/blogs/${blog._id}`, "PUT", { ...payload, status: "published", title: "Updated article" })).status, 200);
    assert.equal((await request(`/blogs/${blog.slug}`)).status, 200);
    const published = await (await request(`/blogs/${blog.slug}`)).json();
    assert.equal(published.blog.richContent.content[0].type, 'heading');
    assert.equal(published.blog.coverAlt, 'Test cover');
    assert.equal((await request(`/admin/blogs/${blog._id}`, "DELETE")).status, 200);
    assert.equal((await request(`/blogs/${blog.slug}`)).status, 404);
    assert.equal((await request("/admin/logout", "POST")).status, 200);
    assert.equal((await request("/admin/session")).status, 401, "copied cookie is revoked on logout");
    const relogin = await request("/admin/login", "POST", { email: env.adminEmail, password: "test-password-only" });
    cookie = relogin.headers.get("set-cookie").split(";")[0];
    const unknown = await request("/admin/forgot-password", "POST", { email: "unknown@example.test" });
    const recovery = await request("/admin/forgot-password", "POST", { email: env.adminEmail });
    assert.equal(recovery.status, 202);
    assert.deepEqual(await unknown.json(), await recovery.json());
    const decodeMail = message => /Content-Transfer-Encoding: base64/i.test(message)
      ? Buffer.from(message.split(/\n\n/).slice(1).join("\n\n").replace(/\s/g, ""), "base64").toString("utf8")
      : message.replace(/=\r?\n/g, "").replace(/=3D/g, "=");
    for (let i = 0; i < 200; i++) {
      if (messages.some(message => decodeMail(message).includes("reset="))) break;
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    const recoveryMail = messages.find(message => decodeMail(message).includes("reset="));
    assert.ok(recoveryMail, "recovery mail reached local SMTP sink");
    const decoded = decodeMail(recoveryMail);
    const token = decoded.match(/reset=([a-f0-9]{64})/)?.[1];
    assert.ok(token);
    const stored = await AdminAccount.findOne({ email: env.adminEmail });
    assert.notEqual(stored.resetHash, token);
    const password = "new-secure-password-2026";
    assert.equal((await request("/admin/reset-password", "POST", { token, password: "short" })).status, 400);
    assert.equal((await request("/admin/reset-password", "POST", { token, password }, { Origin: "https://evil.example" })).status, 403);
    await AdminAccount.updateOne({ _id: stored._id }, { $set: { resetExpiresAt: new Date(Date.now() - 1000) } });
    assert.equal((await request("/admin/reset-password", "POST", { token, password })).status, 400);
    await AdminAccount.updateOne({ _id: stored._id }, { $set: { resetExpiresAt: new Date(Date.now() + 60000) } });
    const resets = await Promise.all([request("/admin/reset-password", "POST", { token, password }), request("/admin/reset-password", "POST", { token, password })]);
    assert.deepEqual(resets.map(result => result.status).sort(), [200, 400], "one concurrent reset succeeds");
    assert.equal((await request("/admin/session")).status, 401, "reset revokes existing sessions");
    assert.equal((await request("/admin/login", "POST", { email: env.adminEmail, password: "test-password-only" })).status, 401);
    assert.equal((await request("/admin/login", "POST", { email: env.adminEmail, password })).status, 200);
  } finally {
    stopMail?.();
    if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
    if (smtp) await new Promise(resolve => smtp.close(resolve));
    // Only this run's explicitly named disposable database may be dropped.
    if (mongoose.connection.name === dbName) await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});
