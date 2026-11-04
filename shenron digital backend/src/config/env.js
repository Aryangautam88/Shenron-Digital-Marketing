import "dotenv/config";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

export function loadEnv() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const origins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  for (const origin of origins) {
    const parsed = new URL(origin);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error("CLIENT_ORIGIN entries must be HTTP(S) origins without paths.");
    }
  }

  const jwtSecret = required("JWT_SECRET");
  if (jwtSecret.length < 32) throw new Error("JWT_SECRET must contain at least 32 characters.");

  const adminPasswordHash = required("ADMIN_PASSWORD_HASH");
  if (!/^\$2[aby]\$\d\d\$/.test(adminPasswordHash)) {
    throw new Error("ADMIN_PASSWORD_HASH must be a bcrypt hash. Run npm.cmd run hash-password.");
  }

  const port = Number(process.env.PORT || 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be a valid TCP port.");

  return {
    nodeEnv,
    host: process.env.HOST?.trim() || "127.0.0.1",
    port,
    mongoUri: required("MONGODB_URI"),
    clientOrigins: origins,
    adminEmail: required("ADMIN_EMAIL").toLowerCase(),
    adminPasswordHash,
    jwtSecret,
    jwtCookieName: process.env.JWT_COOKIE_NAME?.trim() || "sd_admin_session",
  };
}
