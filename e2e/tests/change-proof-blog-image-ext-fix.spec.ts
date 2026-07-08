import { test, expect } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel } from './visual-assert';

/**
 * change-proof-blog-image-ext-fix
 *
 * Verifies that 4 blog articles with previously broken .png image references
 * now resolve correctly with .webp references. Also confirms the new
 * sterilization-equipment-guide-hero.webp is served for the SPD guide.
 *
 * Quality Mode fix: broken OG/hero images on cardiac cath, ceiling booms,
 * LDRP birthing suite, and sterile processing department guides.
 */

test('fix(blog): verify broken .png → .webp image references resolved on 4 blog posts', async ({ page }) => {
  const DELAY = 600;

  // ── Phase 1: Cardiac Catheterization Lab ────────────────────────────
  await showPhaseLabel(page, 'Phase 1: Cardiac Cath Lab — image loads');
  await page.goto('/blog/cardiac-catheterization-lab-equipment-guide-texas');
  await page.waitForTimeout(DELAY);

  // OG image should NOT contain .png extension
  const cathOgImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(cathOgImage).not.toMatch(/\.png$/i);

  // Hero image element should be present and loaded
  const cathHero = page.locator('img').first();
  await expectVisible(page, cathHero, 'Cardiac cath lab hero image');

  // Verify no 404 for the image by checking network (src must be .webp)
  const cathImgSrc = await cathHero.getAttribute('src');
  if (cathImgSrc) {
    expect(cathImgSrc).not.toMatch(/\.png$/i);
  }

  await expectText(page, 'Cardiac Catheterization Lab Equipment', 'Cath lab page title');

  // ── Phase 2: Ceiling-Mount Boom Systems ─────────────────────────────
  await showPhaseLabel(page, 'Phase 2: Ceiling-Mount Booms — image loads');
  await page.goto('/blog/ceiling-mount-boom-systems-texas-operating-rooms');
  await page.waitForTimeout(DELAY);

  const boomOgImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(boomOgImage).not.toMatch(/\.png$/i);

  const boomHero = page.locator('img').first();
  await expectVisible(page, boomHero, 'Ceiling mount boom hero image');

  const boomImgSrc = await boomHero.getAttribute('src');
  if (boomImgSrc) {
    expect(boomImgSrc).not.toMatch(/\.png$/i);
  }

  await expectText(page, 'Ceiling-Mount Boom Systems', 'Boom systems page title');

  // ── Phase 3: LDRP Birthing Suite ────────────────────────────────────
  await showPhaseLabel(page, 'Phase 3: LDRP Birthing Suite — image loads');
  await page.goto('/blog/ldrp-birthing-suite-equipment-guide-texas-hospitals');
  await page.waitForTimeout(DELAY);

  const ldrpOgImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ldrpOgImage).not.toMatch(/\.png$/i);

  const ldrpHero = page.locator('img').first();
  await expectVisible(page, ldrpHero, 'LDRP birthing suite hero image');

  const ldrpImgSrc = await ldrpHero.getAttribute('src');
  if (ldrpImgSrc) {
    expect(ldrpImgSrc).not.toMatch(/\.png$/i);
  }

  await expectText(page, 'LDRP Suite Equipment Guide', 'LDRP page title');

  // ── Phase 4: Sterile Processing Department — dedicated SPD hero ──────
  await showPhaseLabel(page, 'Phase 4: Sterile Processing Dept — dedicated SPD hero image');
  await page.goto('/blog/sterile-processing-department-equipment-guide-texas');
  await page.waitForTimeout(DELAY);

  const spdOgImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(spdOgImage).not.toMatch(/\.png$/i);
  // Should now reference the dedicated sterilization guide hero
  expect(spdOgImage).toContain('sterilization-equipment-guide-hero');

  const spdHero = page.locator('img').first();
  await expectVisible(page, spdHero, 'SPD sterile processing hero image');

  await expectText(page, 'Sterile Processing Department Equipment', 'SPD page title');

  // ── Phase 5: Blog index — all 4 articles visible ────────────────────
  await showPhaseLabel(page, 'Phase 5: Blog index — all 4 fixed articles appear');
  await page.goto('/blog');
  await page.waitForTimeout(DELAY);

  await expectText(page, 'Cardiac Catheterization', 'Cath lab article in index');
  await expectText(page, 'Ceiling-Mount Boom', 'Boom systems article in index');
  await expectText(page, 'LDRP Suite', 'LDRP article in index');
  await expectText(page, 'Sterile Processing', 'SPD article in index');
});
