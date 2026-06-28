/**
 * scripts/convert-to-webp.mjs
 * 
 * Converts all PNG images in public/images/ to WebP format using sharp.
 * Replaces the original PNG files with WebP equivalents.
 * 
 * Usage: node scripts/convert-to-webp.mjs
 */

import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');

const WEBP_QUALITY = 85; // High quality, ~65-70% smaller than PNG

async function findPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const pngs = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findPngs(fullPath);
      pngs.push(...nested);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.png') {
      pngs.push(fullPath);
    }
  }
  return pngs;
}

async function convertToWebP(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const before = (await stat(pngPath)).size;
  
  await sharp(pngPath)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);
  
  const after = (await stat(webpPath)).size;
  const savings = ((1 - after / before) * 100).toFixed(1);
  
  // Remove the original PNG
  await unlink(pngPath);
  
  const relPath = pngPath.replace(ROOT + '\\', '').replace(/\\/g, '/');
  console.log(`✅ ${relPath} → .webp  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, -${savings}%)`);
  return { before, after };
}

async function main() {
  console.log('🔄 Converting public/images PNGs to WebP...\n');
  
  const pngs = await findPngs(IMAGES_DIR);
  
  if (pngs.length === 0) {
    console.log('No PNG files found in public/images/');
    return;
  }
  
  console.log(`Found ${pngs.length} PNG files.\n`);
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  for (const png of pngs) {
    const { before, after } = await convertToWebP(png);
    totalBefore += before;
    totalAfter += after;
  }
  
  const totalSavings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(`\n🎉 Done! ${pngs.length} images converted.`);
  console.log(`   Total before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Total after:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Savings:      ${totalSavings}%`);
}

main().catch(console.error);
