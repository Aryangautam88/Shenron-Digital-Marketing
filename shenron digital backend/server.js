import { createServer } from "node:http";
import { connectDatabase } from "./src/config/database.js";
import { loadEnv } from "./src/config/env.js";
import { createApp } from "./src/app.js";

const env = loadEnv();

try {
  await connectDatabase(env.mongoUri);
} catch (error) {
  console.error(
    `MongoDB connection failed (${error?.code || error?.name || "unknown error"}). Check MONGODB_URI and database access.`,
  );
  process.exit(1);
}

const server = createServer(createApp(env));
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
  process.on(signal, () => server.close(() => process.exit(0)));
}
