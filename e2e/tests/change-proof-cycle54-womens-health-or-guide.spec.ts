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

test('change-proof-cycle54-womens-health-or-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — find Women's Health OR article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Women\'s Health OR Article Card');
  await page.waitForTimeout(800);

  const articleLink = page.locator('a[href*="womens-health-or-equipment-guide"]').first();
  await articleLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(articleLink, 'Women\'s Health OR article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate directly to article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Women\'s Health OR Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/womens-health-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /womens-health-or-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Women\'s Health OR Guide — Article Hero');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Women.*Health/i, 'Article title contains "Women\'s Health"');

  const gynTag = page.locator('text=GYN surgery equipment Texas').first();
  await expectVisible(gynTag, 'GYN surgery equipment Texas tag visible');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — GYN vs General OR section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 GYN Surgical ORs vs General ORs Section');
  await page.waitForTimeout(1200);

  const gynOrSection = page.locator('text=GYN Surgical OR').first();
  await gynOrSection.scrollIntoViewIfNeeded();
  await expectVisible(gynOrSection, 'GYN OR vs General OR section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Surgical tables section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🛏️ Surgical Tables for GYN Procedures');
  await page.waitForTimeout(1200);

  const tablesSection = page.locator('text=Surgical Tables for GYN').first();
  await tablesSection.scrollIntoViewIfNeeded();
  await expectVisible(tablesSection, 'Surgical Tables for GYN section heading');

  // Skytron 6700B reference
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '⚙️ Skytron 6700B — GYN Workhorse');
  await page.waitForTimeout(1000);

  const skytronRef = page.locator('text=Skytron 6700B').first();
  await skytronRef.scrollIntoViewIfNeeded();
  await expectVisible(skytronRef, 'Skytron 6700B reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Boom system for robotic GYN section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Boom System Design for Robotic GYN ORs');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Boom System Design for Robotic GYN').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom System Design for Robotic GYN section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Women's health installations
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏨 Women\'s Health Installations Across SE Texas');
  await page.waitForTimeout(1200);

  // Scope to .blog-body to avoid hidden nav elements; use simple pattern to sidestep
  // smart-quote encoding issues with "Women's" in regex filtering on remote CI runners.
  const installsSection = page.locator('.blog-body h2').filter({ hasText: /Installations Across/i }).first();
  await installsSection.waitFor({ state: 'visible', timeout: 20000 });
  await installsSection.scrollIntoViewIfNeeded();
  await expectVisible(installsSection, 'Women\'s Health Installations section heading');

  // Woman's Hospital of Texas reference (use regex to avoid apostrophe mismatch)
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🏥 Woman\'s Hospital of Texas — 35 LDRP');
  await page.waitForTimeout(1000);

  // Article renders "Woman's Hospital of Texas" as bold text (**...**) inside a <p>,
  // NOT as an h3. Scope to .blog-body strong to find the bold installation reference.
  const womansHospital = page.locator('.blog-body strong').filter({ hasText: /Woman.*Hospital/i }).first();
  await womansHospital.waitFor({ state: 'visible', timeout: 15000 });
  await womansHospital.scrollIntoViewIfNeeded();
  await expectVisible(womansHospital, 'Woman\'s Hospital of Texas bold reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — UTMB John Sealy reference
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🎓 UTMB John Sealy — Academic GYN Program');
  await page.waitForTimeout(1000);

  const utmbRef = page.locator('text=UTMB John Sealy').first();
  await utmbRef.scrollIntoViewIfNeeded();
  await expectVisible(utmbRef, 'UTMB John Sealy reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 10 — Planning section and CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📞 Planning a Women\'s Health OR Suite Section');
  await page.waitForTimeout(1200);

  const planningSection = page.locator('h2').filter({ hasText: /Planning a Women/i }).first();
  await planningSection.scrollIntoViewIfNeeded();
  await expectVisible(planningSection, 'Planning section heading');

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number in article CTA');

  await showPhaseLabel(page, '✅ Women\'s Health OR Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
