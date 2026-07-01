import { test, expect } from "@playwright/test";
import { visualAssert } from "./visual-assert";

const BASE =
  process.env.PLAYWRIGHT_BASE_URL ||
  process.env.BASE_URL ||
  "http://localhost:4321";

test("change-proof-cycle54-womens-health-or-guide — walk-through women's health OR equipment guide article", async ({
  page,
}) => {
  // ── 1. Blog index — article appears in listing ──────────────────────────────
  await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
  await visualAssert(page, "01-blog-index-womens-health");

  const articleLink = page.locator('a[href*="womens-health-or-equipment-guide"]').first();
  await expect(articleLink).toBeVisible({ timeout: 15000 });
  await articleLink.scrollIntoViewIfNeeded();
  await visualAssert(page, "02-blog-index-article-card-visible");
  await page.waitForTimeout(1200);

  // ── 2. Navigate to article ────────────────────────────────────────────────
  await page.goto(`${BASE}/blog/womens-health-or-equipment-guide-texas-hospitals`, {
    waitUntil: "networkidle",
  });
  await visualAssert(page, "03-article-hero");

  // ── 3. H1 title visible ───────────────────────────────────────────────────
  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible({ timeout: 10000 });
  await h1.scrollIntoViewIfNeeded();
  await visualAssert(page, "04-article-h1-visible");
  await page.waitForTimeout(1200);

  // ── 4. GYN OR section ─────────────────────────────────────────────────────
  const gynSection = page.locator("h2").filter({ hasText: /GYN Surgical OR/i }).first();
  if (await gynSection.count() > 0) {
    await gynSection.scrollIntoViewIfNeeded();
    await visualAssert(page, "05-gyn-or-section");
    await page.waitForTimeout(1200);
  }

  // ── 5. Surgical tables section ────────────────────────────────────────────
  const tablesSection = page.locator("h2").filter({ hasText: /Surgical Tables/i }).first();
  if (await tablesSection.count() > 0) {
    await tablesSection.scrollIntoViewIfNeeded();
    await visualAssert(page, "06-surgical-tables-section");
    await page.waitForTimeout(1200);
  }

  // ── 6. Robotic GYN boom section ───────────────────────────────────────────
  const boomSection = page.locator("h2").filter({ hasText: /Boom System/i }).first();
  if (await boomSection.count() > 0) {
    await boomSection.scrollIntoViewIfNeeded();
    await visualAssert(page, "07-boom-system-section");
    await page.waitForTimeout(1200);
  }

  // ── 7. Women's health installations ──────────────────────────────────────
  const installSection = page.locator("h2").filter({ hasText: /Women.*Health Installations/i }).first();
  if (await installSection.count() > 0) {
    await installSection.scrollIntoViewIfNeeded();
    await visualAssert(page, "08-womens-health-installations");
    await page.waitForTimeout(1200);
  }

  // ── 8. Real install references: Woman's Hospital, UTMB, MH Memorial City ─
  const womansHospital = page.locator("text=Woman").first();
  if (await womansHospital.count() > 0) {
    await womansHospital.scrollIntoViewIfNeeded();
    await visualAssert(page, "09-womans-hospital-reference");
  }

  const utmbRef = page.locator("text=UTMB").first();
  if (await utmbRef.count() > 0) {
    await utmbRef.scrollIntoViewIfNeeded();
    await visualAssert(page, "10-utmb-reference");
  }
  await page.waitForTimeout(1200);

  // ── 9. Footer / CTA ───────────────────────────────────────────────────────
  const footer = page.locator("footer").first();
  await footer.scrollIntoViewIfNeeded();
  await visualAssert(page, "11-article-footer");
  await page.waitForTimeout(500);

  // ── 10. Homepage still loads correctly ───────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const nav = page.locator("nav").first();
  await expect(nav).toBeVisible({ timeout: 10000 });
  await visualAssert(page, "12-homepage-nav-intact");
});
