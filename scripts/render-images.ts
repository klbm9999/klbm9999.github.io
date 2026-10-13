// Renders the raster images in public/ from their sources:
//   public/favicon.svg -> public/favicon.ico (32 px) and public/apple-touch-icon.png (180 px)
//   src/data/profile.ts -> public/og.png (the 1200 x 630 link preview card)
// The outputs are committed, so this only needs to run when the icon or the
// profile's name or headline changes: node scripts/render-images.ts

import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { profile } from '../src/data/profile.ts';

const FONT = "'Noto Sans', Helvetica, Arial, sans-serif";
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap by character count, good enough for a short headline. */
function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Wraps a PNG in a single-image ICO container. */
function icoFromPng(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8); // palette size
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // image data offset
  return Buffer.concat([header, png]);
}

const favicon = readFileSync(new URL('../public/favicon.svg', import.meta.url));
const favicon32 = await sharp(favicon, { density: 300 }).resize(32, 32).png().toBuffer();
writeFileSync(new URL('../public/favicon.ico', import.meta.url), icoFromPng(favicon32, 32));
await sharp(favicon, { density: 600 })
  .resize(180, 180)
  .flatten({ background: '#16181d' })
  .png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);

const headline = wrap(profile.headline, 36)
  .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 74}">${escape(line)}</tspan>`)
  .join('');

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="#1f5fbf"/>
  <rect x="80" y="84" width="64" height="64" rx="14" fill="#16181d"/>
  <text x="112" y="126.5" fill="#ffffff" font-family="${FONT}" font-size="29" font-weight="700" letter-spacing="-1" text-anchor="middle">KL</text>
  <text x="168" y="127" fill="#16181d" font-family="${FONT}" font-size="34" font-weight="700">${escape(profile.name)}</text>
  <text x="80" y="268" fill="#16181d" font-family="${FONT}" font-size="60" font-weight="700" letter-spacing="-1.5">${headline}</text>
  <text x="80" y="548" fill="#5b6270" font-family="${FONT}" font-size="28">klbm9999.github.io · ${escape(profile.location)}</text>
</svg>`;

await sharp(Buffer.from(card)).png().toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('Rendered favicon.ico, apple-touch-icon.png and og.png in public/.');
