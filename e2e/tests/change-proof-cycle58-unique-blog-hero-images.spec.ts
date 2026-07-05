/**
 * Change Proof E2E Spec — Cycle 58: Unique Blog Hero Images
 * ONE SINGLE test() block = ONE continuous video
 * Proof keyword: change-proof
 * Verifies that 4 blog articles have unique, article-specific hero images
 * (not shared generic service page images)
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectAttribute,
} from './visual-assert';

test.setTimeout(240000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle58-unique-blog-hero-images', async ({ page }) => {

  // PART 1 — Endoscopy/GI Suite article — verify unique hero
  await showPhaseLabel(page, '🏥 Cycle 58 — Unique Blog Hero Images');
  await page.goto('/blog/endoscopy-gi-suite-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /endoscopy-gi-suite/);

  await showPhaseLabel(page, '🔬 Endoscopy — Verifying unique hero image');
  await page.waitForTimeout(1000);

  const endoscopyH1 = page.locator('h1').first();
  await expectVisible(endoscopyH1, 'Endoscopy article H1');
  await expectText(endoscopyH1, /Endoscopy|GI/i, 'Endoscopy article title');

  // Hero image must reference the endoscopy-specific image
  const endoscopyHero = page.locator('img[src*="endoscopy-gi-suite-hero"]');
  await endoscopyHero.waitFor({ state: 'visible', timeout: 15000 });
  await expectVisible(endoscopyHero, 'Endoscopy unique hero image');
  await expectAttribute(endoscopyHero, 'src', /endoscopy-gi-suite-hero/, 'Endoscopy hero src');

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // PART 2 — Neurosurgery article — verify unique hero
  await showPhaseLabel(page, '🧠 Neurosurgery — Verifying unique hero image');
  await page.goto('/blog/neurosurgery-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /neurosurgery-or-equipment-guide/);
  await page.waitForTimeout(1000);

  const neuroH1 = page.locator('h1').first();
  await expectVisible(neuroH1, 'Neurosurgery article H1');
  await expectText(neuroH1, /Neurosurgery/i, 'Neurosurgery article title');

  const neuroHero = page.locator('img[src*="neurosurgery-or-suite-hero"]');
  await neuroHero.waitFor({ state: 'visible', timeout: 15000 });
  await expectVisible(neuroHero, 'Neurosurgery unique hero image');
  await expectAttribute(neuroHero, 'src', /neurosurgery-or-suite-hero/, 'Neurosurgery hero src');

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // PART 3 — Oncology article — verify unique hero
  await showPhaseLabel(page, '🎗️ Oncology — Verifying unique hero image');
  await page.goto('/blog/oncologic-surgery-or-equipment-guide-texas');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /oncologic-surgery-or-equipment-guide/);
  await page.waitForTimeout(1000);

  const oncoH1 = page.locator('h1').first();
  await expectVisible(oncoH1, 'Oncology article H1');
  await expectText(oncoH1, /Oncolog/i, 'Oncology article title');

  const oncoHero = page.locator('img[src*="oncology-or-suite-hero"]');
  await oncoHero.waitFor({ state: 'visible', timeout: 15000 });
  await expectVisible(oncoHero, 'Oncology unique hero image');
  await expectAttribute(oncoHero, 'src', /oncology-or-suite-hero/, 'Oncology hero src');

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // PART 4 — Surgical Lighting article — verify unique hero
  await showPhaseLabel(page, '💡 Surgical Lighting — Verifying unique hero image');
  await page.goto('/blog/surgical-lighting-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /surgical-lighting-guide/);
  await page.waitForTimeout(1000);

  const lightH1 = page.locator('h1').first();
  await expectVisible(lightH1, 'Surgical Lighting article H1');
  await expectText(lightH1, /Surgical Lighting/i, 'Surgical Lighting article title');

  const lightHero = page.locator('img[src*="surgical-lighting-hero"]');
  await lightHero.waitFor({ state: 'visible', timeout: 15000 });
  await expectVisible(lightHero, 'Surgical Lighting unique hero image');
  await expectAttribute(lightHero, 'src', /surgical-lighting-hero/, 'Surgical Lighting hero src');

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // PART 5 — Blog index — confirm all 4 unique card images visible
  await showPhaseLabel(page, '📚 Blog Index — Confirming all unique hero images visible');
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  // Scroll through blog cards
  await smoothScroll(page, 1200, 260, 400);
  await page.waitForTimeout(800);

  // Each article's unique image should be present in the blog index cards
  const endoscopyCard = page.locator('img[src*="endoscopy-gi-suite-hero"]').first();
  await endoscopyCard.scrollIntoViewIfNeeded();
  await expectVisible(endoscopyCard, 'Endoscopy card unique image in blog index');

  const neuroCard = page.locator('img[src*="neurosurgery-or-suite-hero"]').first();
  await neuroCard.scrollIntoViewIfNeeded();
  await expectVisible(neuroCard, 'Neurosurgery card unique image in blog index');

  const oncoCard = page.locator('img[src*="oncology-or-suite-hero"]').first();
  await oncoCard.scrollIntoViewIfNeeded();
  await expectVisible(oncoCard, 'Oncology card unique image in blog index');

  const lightCard = page.locator('img[src*="surgical-lighting-hero"]').first();
  await lightCard.scrollIntoViewIfNeeded();
  await expectVisible(lightCard, 'Surgical Lighting card unique image in blog index');

  await showPhaseLabel(page, '✅ All 4 blog hero images verified unique!');
  await page.waitForTimeout(1200);

  // PART 6 — Homepage integrity check
  await showPhaseLabel(page, '🏠 Homepage integrity check');
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const heroHeading = page.locator('h1').first();
  await expectVisible(heroHeading, 'Homepage H1');
  await page.waitForTimeout(1000);
});

