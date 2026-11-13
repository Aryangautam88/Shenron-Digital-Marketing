
import nodemailer from "nodemailer";
import addressparser from "nodemailer/lib/addressparser/index.js";

export function brandedSender(env) {
  const address = addressparser(env.mailFrom || "", { flatten: true })[0]?.address;
  if (!address) throw new Error("Configure a valid MAIL_FROM email address.");
  return { name: "Kravs Infotech", address };
}

export function createMailer(env) {
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: Number(env.smtpPort),
    secure: Number(env.smtpPort) === 465,
    ...(env.smtpUser ? { auth: {
      user: env.smtpUser,
      pass: env.smtpPassword,
    } } : {}),
    requireTLS: Number(env.smtpPort) === 587 || (env.nodeEnv === "production" && Number(env.smtpPort) !== 465),
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });

  return transporter;
}
