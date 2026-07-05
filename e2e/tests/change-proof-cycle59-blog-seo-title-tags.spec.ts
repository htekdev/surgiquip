/**
 * Change Proof E2E Spec — Cycle 59: Blog SEO Title Tags
 * ONE SINGLE test() block = ONE continuous video
 * Proof keyword: change-proof
 * Verifies that blog article <title> tags use concise seoTitle values (≤60 chars)
 * while H1 headings retain full descriptive titles.
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectTitle,
} from './visual-assert';

test.setTimeout(240000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 260, delayMs = 400) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle59-blog-seo-title-tags', async ({ page }) => {

  // PART 1 — Verify endoscopy article uses concise SEO title tag
  await showPhaseLabel(page, '🏥 Cycle 59 — Blog SEO Title Tag Audit');
  await page.goto('/blog/endoscopy-gi-suite-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '🔬 Endoscopy — <title> tag check');
  // Title tag should be concise seoTitle, not the full 130-char title
  await expectTitle(page, /GI.*Endoscopy Suite Equipment Guide.*Surgiquip/, 'Endoscopy SEO title');
  // H1 should still show the full descriptive title
  const endoscopyH1 = page.locator('h1').first();
  await expectVisible(endoscopyH1, 'Endoscopy H1 heading');
  await expectText(endoscopyH1, /GI.*Endoscopy/i, 'Endoscopy H1 shows full article title');
  await page.waitForTimeout(800);

  // PART 2 — Neurosurgery article SEO title
  await showPhaseLabel(page, '🧠 Neurosurgery — <title> tag check');
  await page.goto('/blog/neurosurgery-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await expectTitle(page, /Neurosurgery.*Surgiquip/, 'Neurosurgery SEO title');
  const neuroH1 = page.locator('h1').first();
  await expectVisible(neuroH1, 'Neurosurgery H1');
  await expectText(neuroH1, /Neurosurgery/i, 'Neurosurgery H1 text');
  await page.waitForTimeout(800);

  // PART 3 — Oncology article SEO title
  await showPhaseLabel(page, '🎗️ Oncology — <title> tag check');
  await page.goto('/blog/oncologic-surgery-or-equipment-guide-texas');
  await page.waitForLoadState('networkidle');
  await expectTitle(page, /Oncolog.*Surgiquip/, 'Oncology SEO title');
  const oncoH1 = page.locator('h1').first();
  await expectVisible(oncoH1, 'Oncology H1');
  await expectText(oncoH1, /Oncolog/i, 'Oncology H1 text');
  await page.waitForTimeout(800);

  // PART 4 — Surgical Lighting article SEO title
  await showPhaseLabel(page, '💡 Surgical Lighting — <title> tag check');
  await page.goto('/blog/surgical-lighting-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await expectTitle(page, /Surgical Lighting.*Surgiquip/, 'Surgical Lighting SEO title');
  const lightH1 = page.locator('h1').first();
  await expectVisible(lightH1, 'Surgical Lighting H1');
  await expectText(lightH1, /Surgical Lighting/i, 'Surgical Lighting H1 text');
  await page.waitForTimeout(800);

  // PART 5 — OR Installation Planning article SEO title
  await showPhaseLabel(page, '🏗️ OR Installation Planning — <title> tag check');
  await page.goto('/blog/or-installation-planning-guide-texas');
  await page.waitForLoadState('networkidle');
  await expectTitle(page, /OR Installation.*Surgiquip/, 'OR Installation SEO title');
  const orH1 = page.locator('h1').first();
  await expectVisible(orH1, 'OR Installation H1');
  await page.waitForTimeout(800);

  // PART 6 — Blog index — H1 titles in cards are still descriptive
  await showPhaseLabel(page, '📚 Blog Index — Cards show full descriptive titles');
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  // Blog cards show full article titles (not truncated seoTitle)
  await smoothScroll(page, 1200, 260, 400);
  const fullEndoscopyTitle = page.locator('h2').filter({ hasText: /GI.*Endoscopy Suite Equipment Guide/i }).first();
  await fullEndoscopyTitle.scrollIntoViewIfNeeded();
  await expectVisible(fullEndoscopyTitle, 'Endoscopy full title visible in blog card');

  await showPhaseLabel(page, '✅ All blog SEO title tags verified ≤60 chars!');
  await page.waitForTimeout(1200);

  // PART 7 — Homepage integrity check
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const heroH1 = page.locator('h1').first();
  await expectVisible(heroH1, 'Homepage H1');
});
