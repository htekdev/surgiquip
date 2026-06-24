/**
 * gen-favicons.mjs
 * Generates favicon PNG assets from public/favicon.svg using sharp.
 * Run: node scripts/gen-favicons.mjs
 *
 * Outputs:
 *   public/apple-touch-icon.png  (180×180)
 *   public/favicon-32x32.png     (32×32)
 *   public/favicon-16x16.png     (16×16)
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'favicon.svg');
const publicDir = join(root, 'public');

if (!existsSync(svgPath)) {
  console.error('❌ public/favicon.svg not found');
  process.exit(1);
}

const svgBuffer = readFileSync(svgPath);

const targets = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
];

for (const { name, size } of targets) {
  const outPath = join(publicDir, name);
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`✅ Generated ${name} (${size}×${size})`);
}

console.log('✓ All favicon assets generated.');
