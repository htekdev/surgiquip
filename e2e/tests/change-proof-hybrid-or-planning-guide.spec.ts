/**
 * Change Proof E2E Spec — Cycle 42: Hybrid OR Planning & Design Guide (route: guide variant)
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   1. Homepage (2s dwell — establish context)
 *   2. Click "Blog" nav link → blog index
 *   3. Locate Hybrid OR article card → click through to article
 *   4. Scroll full article — verify key sections
 *   5. Navigate back to blog index → verify article card still present
 *
 * Proof keyword: change-proof
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
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

test('change-proof-hybrid-or-planning-guide', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage (2s dwell)
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(2000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog nav click → Blog Index
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📰 Blog Nav → Blog Index');
  await page.waitForTimeout(600);

  const blogNavLink = page.locator('header a[href="/blog"]').first();
  await expectVisible(blogNavLink, 'Blog nav link in header');
  await blogNavLink.click();
  await page.waitForLoadState('networkidle');
  await expectURL(page, /\/blog/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Blog index — locate Hybrid OR article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Hybrid OR Article Card');
  await page.waitForTimeout(600);

  const hybridLink = page.locator('a[href*="hybrid-or"]').first();
  await hybridLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(hybridLink, 'Hybrid OR article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Click through to Hybrid OR article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Hybrid OR Planning Guide →');
  await page.waitForTimeout(700);
  await hybridLink.click();
  await page.waitForLoadState('networkidle');
  await expectURL(page, /hybrid-or-planning-design-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Article hero — verify title
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Hybrid OR Planning Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Hybrid OR/i, 'Article title contains "Hybrid OR"');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Scroll full article — key sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 What Is a Hybrid OR?');
  await page.waitForTimeout(1200);

  const whatIsSection = page.locator('text=What Is a Hybrid OR').first();
  await whatIsSection.scrollIntoViewIfNeeded();
  await expectVisible(whatIsSection, 'What Is a Hybrid OR section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🏗️ Imaging System Selection');
  await page.waitForTimeout(1200);

  const imagingSection = page.locator('text=Imaging System Selection').first();
  await imagingSection.scrollIntoViewIfNeeded();
  await expectVisible(imagingSection, 'Imaging System Selection section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Boom System Design');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Boom System Design').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom System Design section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏥 Southeast Texas Hybrid OR Projects');
  await page.waitForTimeout(1000);

  const texasSection = page.locator('text=Southeast Texas Hybrid OR Projects').first();
  await texasSection.scrollIntoViewIfNeeded();
  await expectVisible(texasSection, 'Southeast Texas Hybrid OR Projects section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Ready to Discuss');
  await page.waitForTimeout(1000);

  const bottomCTA = page.locator('text=Ready to Discuss Your Project').first();
  await bottomCTA.scrollIntoViewIfNeeded();
  await expectVisible(bottomCTA, 'Bottom CTA section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Back to blog index → verify article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '← Back to Blog Index');
  await page.waitForTimeout(800);
  await page.goBack();
  await page.waitForLoadState('networkidle');
  await expectURL(page, /\/blog/);

  await showPhaseLabel(page, '✅ Blog Index — Verify Hybrid OR Card Exists');
  await page.waitForTimeout(1000);

  const hybridCardBack = page.locator('a[href*="hybrid-or"]').first();
  await hybridCardBack.scrollIntoViewIfNeeded();
  await expectVisible(hybridCardBack, 'Hybrid OR card visible on blog index (verified post-nav)');

  await showPhaseLabel(page, '✅ Hybrid OR Planning Guide — change-proof COMPLETE');
  await page.waitForTimeout(1500);
});
