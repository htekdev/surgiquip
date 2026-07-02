/**
 * Change Proof E2E Spec — Cycle 55: Skytron Real Product Models
 * Verifies /products/skytron shows real model names: 6700B, 6701, 3600, Aurora LED,
 * Stellar, AR24, Center Mount Booms, SkyVision — replacing generic category names.
 * ONE SINGLE test() block = ONE continuous video
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

test('change-proof-cycle55-skytron-real-product-models', async ({ page }) => {

  // PART 1 — Homepage
  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  // PART 2 — Products index
  await showPhaseLabel(page, '📦 Opening Products Index →');
  await page.waitForTimeout(700);
  await page.goto('/products');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📦 Products Index');
  await page.waitForTimeout(1000);

  const productsH1 = page.locator('h1').first();
  await expectVisible(productsH1, 'Products index H1');

  const skytronLink = page.locator('a[href="/products/skytron"]').first();
  await skytronLink.scrollIntoViewIfNeeded();
  await expectVisible(skytronLink, 'Skytron product link');

  // PART 3 — Skytron page hero
  await showPhaseLabel(page, '🔭 Opening Skytron Product Page →');
  await page.waitForTimeout(700);
  await page.goto('/products/skytron');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /\/products\/skytron/);

  await showPhaseLabel(page, '🛏️ Skytron Page — Hero Section');
  await page.waitForTimeout(1200);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Skytron page H1');
  await expectText(h1, /Skytron/i, 'H1 contains "Skytron"');

  // Hero model badge bar: 6700B in text
  const badgeBar = page.locator('text=6700B').first();
  await expectVisible(badgeBar, 'Badge bar shows 6700B model');

  // PART 4 — Surgical Tables section
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🪑 Surgical Tables Section');
  await page.waitForTimeout(1200);

  const tablesH2 = page.locator('h2').filter({ hasText: /Skytron Operating Tables/i }).first();
  await tablesH2.scrollIntoViewIfNeeded();
  await expectVisible(tablesH2, 'Surgical Tables h2');

  // Real model: 6700B
  const model6700B = page.locator('h3').filter({ hasText: /6700B/ }).first();
  await model6700B.scrollIntoViewIfNeeded();
  await expectVisible(model6700B, 'Skytron 6700B model card');

  // PART 5 — 6701 and 3600 models
  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📊 Skytron 6701 & 3600 Series Cards');
  await page.waitForTimeout(1200);

  const model6701 = page.locator('h3').filter({ hasText: /6701/ }).first();
  await model6701.scrollIntoViewIfNeeded();
  await expectVisible(model6701, 'Skytron 6701 model card');

  const model3600 = page.locator('h3').filter({ hasText: /3600/ }).first();
  await model3600.scrollIntoViewIfNeeded();
  await expectVisible(model3600, 'Skytron 3600 Series card');

  // PART 6 — Surgical Lights section
  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '💡 Surgical Lights — Aurora LED Section');
  await page.waitForTimeout(1200);

  const lightsH2 = page.locator('h2').filter({ hasText: /Skytron Lighting Systems/i }).first();
  await lightsH2.scrollIntoViewIfNeeded();
  await expectVisible(lightsH2, 'Surgical Lights h2');

  const auroraCard = page.locator('h3').filter({ hasText: /Aurora LED/ }).first();
  await auroraCard.scrollIntoViewIfNeeded();
  await expectVisible(auroraCard, 'Aurora LED featured card');

  // Aurora CRI spec
  const criSpec = page.locator('text=97+').first();
  await criSpec.scrollIntoViewIfNeeded();
  await expectVisible(criSpec, 'CRI 97+ spec visible');

  // PART 7 — Other lights: Stellar, AR24
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '💡 Stellar LED & AR24 Birthing Light Cards');
  await page.waitForTimeout(1000);

  const stellarCard = page.locator('h3').filter({ hasText: /Stellar/ }).first();
  await stellarCard.scrollIntoViewIfNeeded();
  await expectVisible(stellarCard, 'Stellar LED card');

  const ar24Card = page.locator('h3').filter({ hasText: /AR24/ }).first();
  await ar24Card.scrollIntoViewIfNeeded();
  await expectVisible(ar24Card, 'AR24 Birthing Light card');

  // PART 8 — Center Mount Booms section
  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '⚙️ Center Mount Booms Section');
  await page.waitForTimeout(1200);

  const boomsH2 = page.locator('h2').filter({ hasText: /Center Mount Booms/i }).first();
  await boomsH2.scrollIntoViewIfNeeded();
  await expectVisible(boomsH2, 'Center Mount Booms h2');

  // NFPA 99 mention
  const nfpaText = page.locator('text=NFPA 99').first();
  await nfpaText.scrollIntoViewIfNeeded();
  await expectVisible(nfpaText, 'NFPA 99 compliance mention');

  // PART 9 — SkyVision OR Integration
  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📺 SkyVision OR Integration Section');
  await page.waitForTimeout(1200);

  const skyVisionH2 = page.locator('h2').filter({ hasText: /SkyVision/i }).first();
  await skyVisionH2.scrollIntoViewIfNeeded();
  await expectVisible(skyVisionH2, 'SkyVision h2');

  // PART 10 — Dealer credentials + CTA
  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏆 Authorized Dealer Credentials');
  await page.waitForTimeout(1000);

  const credH2 = page.locator('h2').filter({ hasText: /Authorized Means Protected/i }).first();
  await credH2.scrollIntoViewIfNeeded();
  await expectVisible(credH2, 'Authorized Means Protected h2');

  // CTA
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Request a Quote');
  await page.waitForTimeout(1000);

  const ctaBtn = page.locator('a[href="/quote"]').last();
  await ctaBtn.scrollIntoViewIfNeeded();
  await expectVisible(ctaBtn, 'Request a Quote CTA button');

  await showPhaseLabel(page, '✅ Skytron Real Product Models — Fully Verified');
  await page.waitForTimeout(1500);
});
