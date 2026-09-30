// Renders the app to static HTML at build time, so the page paints before any JS runs.
// main.tsx then hydrates this markup instead of rendering from scratch.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const templatePath = `${root}dist/index.html`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const { render } = await import(serverEntry);
const template = await readFile(templatePath, "utf8");
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}

const html = template.replace(marker, `<div id="root">${render()}</div>`);
await writeFile(templatePath, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });

console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} KB to dist/index.html`);
