// One-off asset generator. Run: `node scripts/make-assets.mjs`
// Outputs are committed (public/og.png, public/art/*.webp) so builds never depend on sharp.
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => path.join(root, "public", p);

// 1) WebP copies of the heavy pixel-art PNGs (lossless keeps hard pixel edges).
for (const name of ["courtroom-hero", "frame1_courthouse", "frame3_judge", "frame4_gavel_3", "frame5_endcard"]) {
  await sharp(pub(`art/${name}.png`)).webp({ lossless: true, effort: 6 }).toFile(pub(`art/${name}.webp`));
}

// 2) Open Graph image 1200×630: wordmark + courtroom crop + headline.
const W = 1200;
const H = 630;
const artW = 560;
const artH = 500;
const artX = W - artW - 50;
const artY = (H - artH) / 2;

const art = await sharp(pub("art/courtroom-hero.png"))
  .extract({ left: 0, top: 0, width: 941, height: 840 })
  .resize(artW, artH, { fit: "cover", position: "top", kernel: sharp.kernel.nearest })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${artW}" height="${artH}"><rect width="${artW}" height="${artH}" rx="36" ry="36"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const wordmark = await sharp(await readFile(pub("brand/PleadWordmark.svg")), { density: 300 })
  .resize({ width: 300 })
  .png()
  .toBuffer();

const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="78%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#EAA0A4" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#FFF6ED" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#FFF6ED"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="${artX - 8}" y="${artY - 8}" width="${artW + 16}" height="${artH + 16}" rx="44" fill="#541F2C"/>
  <text x="64" y="232" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="#7C3042">THE AI COURTROOM FOR COUPLES</text>
  <text font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="800" font-size="56" fill="#541F2C" letter-spacing="-1.5">
    <tspan x="62" y="310">Settle the</tspan>
    <tspan x="62" y="374">argument.</tspan>
    <tspan x="62" y="438">Plead your case.</tspan>
  </text>
  <text x="64" y="512" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" fill="#3B2425">AI jurors deliberate. The AI judge rules.</text>
</svg>`);

await sharp(bg)
  .composite([
    { input: wordmark, left: 44, top: 22 },
    { input: art, left: artX, top: artY },
  ])
  .png({ compressionLevel: 9 })
  .toFile(pub("og.png"));

console.log("wrote public/og.png and public/art/*.webp");
