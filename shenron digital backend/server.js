import { createServer } from "node:http";
import { connectDatabase } from "./src/config/database.js";
import { loadEnv } from "./src/config/env.js";
import { createApp } from "./src/app.js";
import { startAcknowledgements } from "./src/utils/acknowledgements.js";

let env;
try {
  env = loadEnv();
} catch (error) {
  console.error(`Backend configuration error: ${error.message}`);
  process.exit(1);
}

try {
  await connectDatabase(env.mongoUri);
} catch (error) {
  const code = error?.code || error?.cause?.code || error?.name || "unknown error";
  const atlasTimeout = env.mongoUri.startsWith("mongodb+srv://") &&
    (code === "ETIMEOUT" || error?.name === "MongooseServerSelectionError");
  const hint = atlasTimeout
    ? "Check that the Atlas cluster is active, this machine's public IP is allowed in Network Access, and DNS/outbound MongoDB access is available."
    : "Check MONGODB_URI and database access.";
  console.error(`MongoDB connection failed (${code}). ${hint}`);
  process.exit(1);
}

const app = createApp(env);
const server = createServer(app);
const stopAcknowledgements = startAcknowledgements(env);
app.locals.sendAcknowledgement = stopAcknowledgements.sendNow;
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${env.port} is already in use. Configure PORT or stop the other service.`);
  } else {
    console.error(`Backend could not start (${error.code || error.name || "unknown error"}).`);
  }
  process.exit(1);
});

server.listen(env.port, env.host, () => {
  console.log(`Shenron Digital API listening on ${env.host}:${env.port}.`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => { stopAcknowledgements(); server.close(() => process.exit(0)); });
}
