/**
 * Change Proof E2E Spec — Cycle 43: Ceiling-Mount Boom Systems Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Boom Systems article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
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

test('change-proof-boom-systems-blog', async ({ page }) => {

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
  // PART 2 — Blog Index — find Boom Systems article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 1000, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Boom Systems Article Card');
  await page.waitForTimeout(800);

  // Find the boom systems article card link
  const boomLink = page.locator('a[href*="ceiling-mount-boom"]').first();
  await boomLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(boomLink, 'Boom Systems article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Boom Systems article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Boom Systems Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/ceiling-mount-boom-systems-texas-operating-rooms');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /ceiling-mount-boom-systems/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Boom Systems Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Boom Systems/i, 'Article title contains "Boom Systems"');

  // Tags should be visible
  const boomTag = page.locator('text=surgical boom systems').first();
  await expectVisible(boomTag, 'surgical boom systems tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article body — verify key sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Why Boom Systems Matter Section');
  await page.waitForTimeout(1200);

  const whySection = page.locator('text=Why Boom Systems Matter').first();
  await whySection.scrollIntoViewIfNeeded();
  await expectVisible(whySection, 'Why Boom Systems Matter section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🏗️ Center-Mount vs. Pendant Section');
  await page.waitForTimeout(1200);

  const centerMountSection = page.locator('text=Center-Mount vs. Pendant').first();
  await centerMountSection.scrollIntoViewIfNeeded();
  await expectVisible(centerMountSection, 'Center-Mount vs. Pendant section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Boom Configuration Section');
  await page.waitForTimeout(1200);

  const configSection = page.locator('text=Boom Configuration').first();
  await configSection.scrollIntoViewIfNeeded();
  await expectVisible(configSection, 'Boom Configuration section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🔧 Installation Standards Section');
  await page.waitForTimeout(1200);

  const installSection = page.locator('text=Installation Standards').first();
  await installSection.scrollIntoViewIfNeeded();
  await expectVisible(installSection, 'Installation Standards section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — PM table and bottom CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🔧 Preventive Maintenance Section');
  await page.waitForTimeout(1000);

  const pmSection = page.locator('text=Preventive Maintenance for OR Boom').first();
  await pmSection.scrollIntoViewIfNeeded();
  await expectVisible(pmSection, 'Preventive Maintenance section');

  await smoothScroll(page, 1500, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Contact Surgiquip');
  await page.waitForTimeout(1000);

  // Verify the bottom CTA link to /contact or /quote
  const contactLink = page.locator('a[href="/contact"]').first();
  await contactLink.scrollIntoViewIfNeeded();
  await expectVisible(contactLink, 'Contact link in article footer');

  await showPhaseLabel(page, '✅ Boom Systems Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
