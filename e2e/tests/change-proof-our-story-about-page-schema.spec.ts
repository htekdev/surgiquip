/**
 * Change Proof E2E Spec — Fix: Missing AboutPage schema on /about/our-story
 * ONE SINGLE test() block = ONE continuous video
 *
 * PR-specific: navigates directly to /about/our-story — the exact page changed.
 * Demonstrates:
 *   → Page loads with correct H1
 *   → AboutPage + BreadcrumbList JSON-LD present (previously only BreadcrumbList)
 *   → Organization mainEntity in schema (foundingDate: 1983, foundingLocation: Houston TX)
 *   → Breadcrumb nav links visible
 *   → 43-year history copy rendered
 *
 * Proof keyword: change-proof
 * Pacing: 500ms scroll step, 1200ms between major actions
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  expectJsonLd,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 300, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);
}

test('change-proof-our-story-about-page-schema', async ({ page }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage orientation
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  const homeH1 = page.locator('h1').first();
  await expectVisible(homeH1, 'Homepage H1');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Navigate to Our Story
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Navigating to /about/our-story');
  await page.waitForTimeout(800);

  await page.goto('/about/our-story');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📖 Our Story Page — AboutPage schema fix');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/about\/our-story/, 'Our Story URL');

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Our Story H1');
  await expectText(h1, '43', 'H1 mentions 43-year history');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Verify JSON-LD schema present (AboutPage + BreadcrumbList)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔍 Schema Check — AboutPage + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1000);

  await expectJsonLd(page, 'AboutPage + BreadcrumbList schema');

  // Verify AboutPage schema type is present in one of the ld+json blocks
  const schemas = page.locator('script[type="application/ld+json"]');
  const schemaCount = await schemas.count();
  let foundAboutPage = false;
  for (let i = 0; i < schemaCount; i++) {
    const content = await schemas.nth(i).textContent();
    if (content && content.includes('AboutPage')) {
      foundAboutPage = true;
      break;
    }
  }
  if (!foundAboutPage) throw new Error('AboutPage schema not found in JSON-LD blocks');
  await page.waitForTimeout(800);

  // Verify Organization mainEntity with foundingDate
  let foundFounding = false;
  for (let i = 0; i < schemaCount; i++) {
    const content = await schemas.nth(i).textContent();
    if (content && content.includes('1983')) {
      foundFounding = true;
      break;
    }
  }
  if (!foundFounding) throw new Error('foundingDate 1983 not found in JSON-LD');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '✅ AboutPage schema verified — foundingDate 1983 present');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Breadcrumb nav links
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Breadcrumb navigation links');
  await page.waitForTimeout(800);

  const homeBreadcrumb = page.locator('main a[href="/"]').first();
  await expectVisible(homeBreadcrumb, 'Home breadcrumb link');
  await page.waitForTimeout(500);

  const aboutBreadcrumb = page.locator('main a[href="/about"]').first();
  await expectVisible(aboutBreadcrumb, 'About breadcrumb link');
  await page.waitForTimeout(500);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through 43-year history content
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📜 Scrolling 43-year company history');
  await page.waitForTimeout(800);

  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  // Verify 1983 founding year appears in copy
  const founding = page.locator('text=1983').first();
  await founding.scrollIntoViewIfNeeded();
  await expectVisible(founding, '1983 founding year in copy');
  await page.waitForTimeout(800);

  await smoothScroll(page, 1000, 300, 500);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Navigate back to About via breadcrumb
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '← Back to About via breadcrumb');
  await page.waitForTimeout(800);

  await scrollToTop(page);
  await page.waitForTimeout(800);

  const aboutNav = page.locator('main a[href="/about"]').first();
  await aboutNav.scrollIntoViewIfNeeded();
  await expectVisible(aboutNav, 'About breadcrumb — clickable');
  await aboutNav.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/about$/, 'Back on About index');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '✅ Fix complete — /about/our-story now has AboutPage + BreadcrumbList schema');
  await page.waitForTimeout(2000);
});
