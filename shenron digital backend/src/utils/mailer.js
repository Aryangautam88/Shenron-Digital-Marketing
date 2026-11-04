import nodemailer from "nodemailer";
export function createMailer(env) {
  return nodemailer.createTransport({
    host: env.smtpHost, port: env.smtpPort, secure: env.smtpPort === 465,
    ...(env.smtpUser ? { auth: { user: env.smtpUser, pass: env.smtpPassword } } : {}),
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 30000,
    requireTLS: env.nodeEnv === "production" && env.smtpPort !== 465,
  });
}
