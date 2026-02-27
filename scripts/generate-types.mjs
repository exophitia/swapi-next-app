/**
 * Fetches sample responses from SWAPI per resource, saves to samples/,
 * then runs quicktype to generate TypeScript types to lib/types/.
 * Run: npm run generate:types
 */
import { mkdir, writeFile } from "fs/promises";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SWAPI_BASE = "https://swapi.py4e.com/api";
const SAMPLES_DIR = path.join(ROOT, "samples");
const TYPES_DIR = path.join(ROOT, "lib", "types");

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function main() {
  const res = await fetch(`${SWAPI_BASE}/`);
  const data = await res.json();
  const keys = Object.keys(data).filter(
    (k) => typeof data[k] === "string" && data[k].startsWith("http")
  );

  await mkdir(SAMPLES_DIR, { recursive: true });
  await mkdir(TYPES_DIR, { recursive: true });

  for (const resource of keys) {
    let item = null;
    const itemRes = await fetch(`${SWAPI_BASE}/${resource}/1/`);
    if (itemRes.ok) {
      item = await itemRes.json();
    } else {
      const listRes = await fetch(`${SWAPI_BASE}/${resource}/?page=1`);
      if (!listRes.ok) continue;
      const list = await listRes.json();
      const results = list.results || [];
      if (results.length === 0) continue;
      const firstUrl = results[0].url;
      const singleRes = await fetch(firstUrl);
      if (!singleRes.ok) continue;
      item = await singleRes.json();
    }
    const samplePath = path.join(SAMPLES_DIR, `${resource}.json`);
    await writeFile(samplePath, JSON.stringify(item, null, 2), "utf-8");

    const typeName = capitalize(resource);
    const outPath = path.join(TYPES_DIR, `${resource}.ts`);
    execSync(
      `npx quicktype "${samplePath}" -o "${outPath}" --just-types --top-level ${typeName}`,
      { stdio: "inherit", cwd: ROOT }
    );
  }

  console.log("Types generated in lib/types/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
