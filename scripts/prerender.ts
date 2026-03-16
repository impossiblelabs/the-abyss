import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

const { render } = await import(resolve(distDir, "server/entry-server.js"));

const html: string = render();

const page = template.replace(
  '<div id="root"></div>',
  `<div id="root">${html}</div>`,
);

writeFileSync(resolve(distDir, "index.html"), page);
console.log("  ✓ dist/index.html (prerendered)");

// Clean SSR build artifacts
rmSync(resolve(distDir, "server"), { recursive: true, force: true });
console.log("  ✓ cleaned dist/server/");
