import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(
  new URL("../app/data/build-time.ts", import.meta.url)
);
const folderPath = dirname(filePath);
const buildTime = new Date().toISOString();

await mkdir(folderPath, { recursive: true });
await writeFile(filePath, `export const buildTime = "${buildTime}";\n`, "utf8");
