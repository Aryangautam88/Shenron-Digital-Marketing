import bcrypt from "bcryptjs";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== "function") {
  console.error("Run this command in an interactive terminal so the password can be entered without echoing.");
  process.exit(1);
}

process.stdout.write("Admin password (hidden): ");
process.stdin.setEncoding("utf8");
process.stdin.setRawMode(true);
process.stdin.resume();

let password = "";
process.stdin.on("data", async (character) => {
  if (character === "\u0003") {
    process.stdin.setRawMode(false);
    process.exit(1);
  }
  if (character === "\r" || character === "\n") {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write("\n");
    if (Buffer.byteLength(password, "utf8") < 8 || Buffer.byteLength(password, "utf8") > 72) {
      console.error("Password must be between 8 and 72 UTF-8 bytes.");
      process.exit(1);
    }
    const hash = await bcrypt.hash(password, 12);
    if (process.argv.includes("--save")) {
      const envPath = fileURLToPath(new URL("../.env", import.meta.url));
      let content = readFileSync(envPath, "utf8");
      content = /^ADMIN_PASSWORD_HASH=.*$/m.test(content)
        ? content.replace(/^ADMIN_PASSWORD_HASH=.*$/m, () => `ADMIN_PASSWORD_HASH=${hash}`)
        : `${content}\nADMIN_PASSWORD_HASH=${hash}\n`;
      writeFileSync(envPath, content);
      process.stdout.write("Admin password securely saved as a bcrypt hash in .env. Restart the backend.\n");
    } else process.stdout.write(`${hash}\n`);
    process.exit(0);
  }
  if (character === "\u007f" || character === "\b") {
    password = password.slice(0, -1);
    return;
  }
  password += character;
});
