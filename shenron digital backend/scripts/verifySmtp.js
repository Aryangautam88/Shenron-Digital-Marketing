import { loadEnv } from "../src/config/env.js";
import { createMailer } from "../src/utils/mailer.js";

let mailer;
try {
  const env = loadEnv();
  if (!env.smtpHost || !env.smtpUser || !env.smtpPassword || !env.mailFrom) {
    throw new Error("Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD and MAIL_FROM in .env.");
  }
  mailer = createMailer(env);
  await mailer.verify();
  console.log("SMTP connection, TLS and authentication succeeded. No email was sent.");
} catch (error) {
  console.error("SMTP verification failed:", JSON.stringify({ code: error.code, command: error.command, responseCode: error.responseCode }));
  if (!mailer) console.error(error.message);
  process.exitCode = 1;
} finally {
  mailer?.close();
}
