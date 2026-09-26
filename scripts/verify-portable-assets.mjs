import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "public/favicon.png",
  "src/assets/eal-family.jpg",
  "src/assets/eal-hero.jpg",
  "src/assets/eal-pathway.jpg",
];
const missing = requiredFiles.filter((file) => !existsSync(resolve(file)));

const pointerFiles = [
  "src/assets/EA-Legacy-logo.png.asset.json",
  "src/assets/Eagles_Practice_Hero.webm.asset.json",
  "src/assets/Eagles_Practice_V1.mp4.asset.json",
  "src/assets/Eagles_Practice_Web.mp4.asset.json",
  "src/assets/Eagles_Practice_Web_Clean.mp4.asset.json",
];
const lovablesOnly = pointerFiles.filter((file) => {
  if (!existsSync(resolve(file))) return true;
  try {
    return JSON.parse(readFileSync(resolve(file), "utf8")).url?.startsWith("/__l5e/") ?? true;
  } catch {
    return true;
  }
});

if (missing.length) {
  console.error("Missing original image files required by the source:");
  for (const file of missing) console.error(`  - ${file}`);
}
if (lovablesOnly.length) {
  console.error("These media references still point to Lovable-only URLs:");
  for (const file of lovablesOnly) console.error(`  - ${file}`);
}
if (missing.length || lovablesOnly.length) {
  console.error("Restore exact original media from Lovable, replace portable URLs, then rerun this check. Never copy .env to the public repository.");
  process.exitCode = 1;
} else {
  console.log("All original image paths exist and no Lovable-only media pointers remain.");
}
