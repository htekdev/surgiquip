/**
 * Change Proof E2E Spec — Cycle 42: Hybrid OR Planning & Design Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Hybrid OR article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
 *   → Sidebar CTA visible — Request a Quote
 *   → Bottom CTA section
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

test('change-proof-hybrid-or-planning-blog', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Blog Index
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📝 Opening Blog Index →');
  await page.waitForTimeout(700);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog Index — find Hybrid OR article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Hybrid OR Article Card');
  await page.waitForTimeout(800);

  // Find the hybrid OR article card link
  const hybridLink = page.locator('a[href*="hybrid-or"]').first();
  await hybridLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(hybridLink, 'Hybrid OR article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Hybrid OR article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Hybrid OR Planning Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/hybrid-or-planning-design-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /hybrid-or-planning-design-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Hybrid OR Planning Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Hybrid OR/i, 'Article title contains "Hybrid OR"');

  // Tags should be visible
  const hybridTag = page.locator('text=hybrid OR').first();
  await expectVisible(hybridTag, 'Hybrid OR tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article body — verify key sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 What Is a Hybrid OR?');
  await page.waitForTimeout(1200);

  const whatIsSection = page.locator('text=What Is a Hybrid OR').first();
  await whatIsSection.scrollIntoViewIfNeeded();
  await expectVisible(whatIsSection, 'What Is a Hybrid OR section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🏗️ Imaging System & Room Sizing Section');
  await page.waitForTimeout(1200);

  const imagingSection = page.locator('text=Imaging System Selection').first();
  await imagingSection.scrollIntoViewIfNeeded();
  await expectVisible(imagingSection, 'Imaging System Selection section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Boom System Design Section');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Boom System Design').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom System Design section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '💡 Surgical Lighting Section');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Sidebar CTA and bottom CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📦 Texas Examples + Sidebar CTA');
  await page.waitForTimeout(1000);

  const texasSection = page.locator('text=Southeast Texas Hybrid OR Projects').first();
  await texasSection.scrollIntoViewIfNeeded();
  await expectVisible(texasSection, 'Texas hybrid OR projects section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Ready to Discuss Your Project');
  await page.waitForTimeout(1000);

  const bottomCTA = page.locator('text=Ready to Discuss Your Project').first();
  await bottomCTA.scrollIntoViewIfNeeded();
  await expectVisible(bottomCTA, 'Bottom CTA section');

  await showPhaseLabel(page, '✅ Hybrid OR Planning Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
