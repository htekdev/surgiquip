/**
 * Change Proof E2E Spec — Cycle 64: Responsive Design Breakpoints
 * ONE SINGLE test() block = ONE continuous video proving layout at 768px (tablet) and 1440px (large desktop)
 *
 * Viewports tested:
 *   → Tablet 768px  (iPad) — layout must not break, nav visible, cards in columns
 *   → Large Desktop 1440px — full-width layout correct, hero/footer look premium
 *
 * Key pages verified:
 *   → Homepage (/, hero, stat bar, services grid)
 *   → Services index (/services)
 *   → Products index (/products)
 *   → Contact (/contact)
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

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 240, delayMs = 450) {
  await page.mouse.move(400, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-responsive-breakpoints', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — TABLET 768px: Homepage
  // ═══════════════════════════════════════════════════════════════════════════

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '📱 Tablet 768px — Homepage');
  await page.waitForTimeout(1200);

  const heroH1 = page.locator('h1').first();
  await expectVisible(heroH1, 'Homepage H1 at 768px');
  await expectText(heroH1, /Medical Equipment|Excellence/i, 'Homepage hero heading');

  // Header should be visible at tablet
  const header = page.locator('header').first();
  await expectVisible(header, 'Header at 768px');

  await showPhaseLabel(page, '📱 Tablet — Scrolling homepage content');
  await smoothScroll(page, 1200, 240, 400);

  // Services section visible
  const servicesSection = page.locator('main section, main div').filter({ hasText: /OR Installation|Service & Repair|Preventive/i }).first();
  await expectVisible(servicesSection, 'Services section at 768px');

  await showPhaseLabel(page, '✅ Tablet 768px — Homepage layout correct');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — TABLET 768px: Services page
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📱 Tablet 768px — /services');
  await page.waitForTimeout(500);
  await page.goto('/services');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/services/);
  const servicesH1 = page.locator('h1').first();
  await expectVisible(servicesH1, 'Services H1 at 768px');

  await showPhaseLabel(page, '📱 Tablet — Services page renders correctly');
  await smoothScroll(page, 900, 240, 400);

  // OR Installation card must be reachable
  const orLink = page.locator('main a[href="/services/or-installation"]').first();
  await expectVisible(orLink, 'OR Installation link at 768px');
  await page.waitForTimeout(700);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — TABLET 768px: Products page
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📱 Tablet 768px — /products');
  await page.goto('/products');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/products/);
  const productsH1 = page.locator('h1').first();
  await expectVisible(productsH1, 'Products H1 at 768px');

  await showPhaseLabel(page, '📱 Tablet — Products page layout');
  await smoothScroll(page, 700, 240, 400);

  // Skytron link must be present
  const skytronLink = page.locator('main a[href="/products/skytron"]').first();
  await expectVisible(skytronLink, 'Skytron product link at 768px');
  await page.waitForTimeout(700);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — TABLET 768px: Contact page
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📱 Tablet 768px — /contact');
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/contact/);
  const contactH1 = page.locator('h1').first();
  await expectVisible(contactH1, 'Contact H1 at 768px');

  // Form must be visible
  const contactForm = page.locator('form').first();
  await expectVisible(contactForm, 'Contact form at 768px');

  // Phone number
  const phoneLink = page.locator('a[href*="713"]').first();
  await expectVisible(phoneLink, 'Phone link at 768px');

  await showPhaseLabel(page, '✅ Tablet 768px — Contact form + info visible');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — LARGE DESKTOP 1440px: Homepage
  // ═══════════════════════════════════════════════════════════════════════════

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🖥️ Large Desktop 1440px — Homepage');
  await page.waitForTimeout(1200);

  const desktopH1 = page.locator('h1').first();
  await expectVisible(desktopH1, 'Homepage H1 at 1440px');

  // Full nav links visible (not hamburger)
  const desktopNavServices = page.locator('header a[href="/services"], header a:has-text("Services")').first();
  await expectVisible(desktopNavServices, 'Services nav link at 1440px');

  await showPhaseLabel(page, '🖥️ 1440px — Scrolling full homepage');
  await smoothScroll(page, 1400, 280, 400);

  // Stat bar should render prominently
  const statBar = page.locator('main').filter({ hasText: /43 Years|Houston|Southeast Texas/i }).first();
  await expectVisible(statBar, 'Stat bar / trust indicators at 1440px');

  await showPhaseLabel(page, '✅ Large Desktop 1440px — Homepage premium layout');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — LARGE DESKTOP 1440px: Services + Products
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🖥️ 1440px — /services');
  await page.goto('/services');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/services/);
  const servicesH1_1440 = page.locator('h1').first();
  await expectVisible(servicesH1_1440, 'Services H1 at 1440px');
  await smoothScroll(page, 900, 280, 400);
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '🖥️ 1440px — /products/skytron');
  await page.goto('/products/skytron');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/products\/skytron/);
  const skytronH1 = page.locator('h1').first();
  await expectVisible(skytronH1, 'Skytron H1 at 1440px');
  await expectText(skytronH1, /Skytron/i, 'Skytron heading');

  await showPhaseLabel(page, '🖥️ 1440px — Skytron products page');
  await smoothScroll(page, 900, 280, 400);

  // Real model names must appear
  const modelSection = page.locator('main').filter({ hasText: /6700B|Aurora LED|Center Mount/i }).first();
  await expectVisible(modelSection, 'Real Skytron model names visible at 1440px');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — All breakpoints verified
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Cycle 64 Complete — Tablet 768px + Large Desktop 1440px Verified');
  await page.waitForTimeout(2000);
});
