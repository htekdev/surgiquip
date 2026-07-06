/**
 * Change Proof E2E Spec — Cycle 46: Multi-Brand OR Equipment Service & Repair Guide
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Multi-Brand Service article card
 *   → Navigate to article → verify title, tags, body sections
 *   → Scroll through full article — verify key H2 sections
 *   → Bottom CTA with phone number
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

test('change-proof-multi-brand-service-repair-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — find Multi-Brand Service article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Multi-Brand Service Article Card');
  await page.waitForTimeout(800);

  // Find the multi-brand service article card link
  const articleLink = page.locator('a[href*="multi-brand"]').first();
  await articleLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(articleLink, 'Multi-Brand Service article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Multi-Brand Service Repair Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/multi-brand-or-equipment-service-repair-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /multi-brand-or-equipment-service-repair/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Multi-Brand Service Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Multi-Brand/i, 'Article title contains "Multi-Brand"');

  // Tag should be visible
  const serviceTag = page.locator('text=surgical equipment repair').first();
  await serviceTag.scrollIntoViewIfNeeded();
  await expectVisible(serviceTag, 'Surgical equipment repair tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article — verify key H2 sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Why Single-Brand OR Fleets Are Exception');
  await page.waitForTimeout(1200);

  const singleBrandSection = page.locator('text=Why Single-Brand OR Fleets').first();
  await singleBrandSection.scrollIntoViewIfNeeded();
  await expectVisible(singleBrandSection, 'Single-Brand OR Fleets section heading');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🔧 Multi-Brand Service Capability Explained');
  await page.waitForTimeout(1200);

  const multiSection = page.locator('text=Multi-Brand Service').first();
  await multiSection.scrollIntoViewIfNeeded();
  await expectVisible(multiSection, 'Multi-Brand Service section heading');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '📊 Facilities Manager Decision Framework');
  await page.waitForTimeout(1200);

  const frameworkSection = page.locator('text=Facilities Manager').first();
  await frameworkSection.scrollIntoViewIfNeeded();
  await expectVisible(frameworkSection, 'Facilities Manager Decision Framework section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🛏️ Surgical Table Service — High Stakes Section');
  await page.waitForTimeout(1200);

  const tableSection = page.locator('text=Surgical Table Service').first();
  await tableSection.scrollIntoViewIfNeeded();
  await expectVisible(tableSection, 'Surgical Table Service section heading');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '⚙️ Ceiling Boom System Service Section');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Ceiling Boom System Service').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Ceiling Boom System Service section heading');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🧪 Sterilization Equipment — Compliance Section');
  await page.waitForTimeout(1200);

  const sterilizationSection = page.locator('text=Sterilization Equipment').first();
  await sterilizationSection.scrollIntoViewIfNeeded();
  await expectVisible(sterilizationSection, 'Sterilization Equipment section heading');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🤝 Building a Service Partnership');
  await page.waitForTimeout(1200);

  const partnershipSection = page.locator('text=Building a Service Partnership').first();
  await partnershipSection.scrollIntoViewIfNeeded();
  await expectVisible(partnershipSection, 'Building a Service Partnership section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Bottom CTA with Surgiquip coverage area
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📞 Surgiquip Service Coverage in Southeast Texas');
  await page.waitForTimeout(1000);

  const coverageSection = page.locator('text=Southeast Texas').first();
  await coverageSection.scrollIntoViewIfNeeded();
  await expectVisible(coverageSection, 'Surgiquip Service Coverage section');

  // Phone number visible at bottom
  const phoneLink = page.locator('a[href*="7136816362"]').first();
  await phoneLink.scrollIntoViewIfNeeded();
  await expectVisible(phoneLink, 'Contact phone link (713) 681-6362');

  await showPhaseLabel(page, '✅ Multi-Brand Service Repair Guide — Fully Verified');
  await page.waitForTimeout(1500);
});
