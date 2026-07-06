import { test, expect } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel } from './visual-assert';

/**
 * Cycle 60 — Blog meta description trimming
 * Verifies all 11 blog article meta descriptions are ≤155 chars
 * and the descriptions exist/render on the page.
 */
test('cycle60 — blog meta descriptions ≤155 chars', async ({ page }) => {
  test.setTimeout(240000);

  const articles = [
    { slug: 'ambulatory-surgery-center-equipment-guide-texas', maxLen: 155 },
    { slug: 'endoscopy-gi-suite-equipment-guide-texas-hospitals', maxLen: 155 },
    { slug: 'neurosurgery-or-equipment-guide-texas-hospitals', maxLen: 155 },
    { slug: 'oncologic-surgery-or-equipment-guide-texas', maxLen: 155 },
    { slug: 'or-installation-planning-guide-texas', maxLen: 155 },
    { slug: 'or-table-selection-guide-texas-hospitals', maxLen: 155 },
    { slug: 'preventive-maintenance-or-equipment-texas', maxLen: 155 },
    { slug: 'skytron-authorized-dealer-southeast-texas', maxLen: 155 },
    { slug: 'sterilization-equipment-guide-texas-hospitals', maxLen: 155 },
    { slug: 'surgical-equipment-suppliers-houston-tx', maxLen: 155 },
    { slug: 'surgical-lighting-guide-texas-hospitals', maxLen: 155 },
  ];

  for (const { slug, maxLen } of articles) {
    await showPhaseLabel(page, `Checking: ${slug}`);
    await page.goto(`/blog/${slug}`);

    // Verify page loads
    await expectVisible(page.locator('h1').first(), `${slug} h1`);

    // Verify meta description exists and is ≤155 chars
    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute('content');
    expect(content, `${slug}: meta description missing`).toBeTruthy();
    expect(
      content!.length,
      `${slug}: meta description is ${content!.length} chars (limit: ${maxLen}): "${content}"`
    ).toBeLessThanOrEqual(maxLen);

    // Verify OG description also exists and is ≤155 chars
    const ogDesc = page.locator('meta[property="og:description"]');
    const ogContent = await ogDesc.getAttribute('content');
    if (ogContent) {
      expect(
        ogContent.length,
        `${slug}: og:description is ${ogContent.length} chars (limit: ${maxLen}): "${ogContent}"`
      ).toBeLessThanOrEqual(maxLen);
    }
  }

  // Sanity check blog index
  await showPhaseLabel(page, 'Blog index integrity');
  await page.goto('/blog');
  await expectVisible(page.locator('h1').first(), 'blog index h1');
});
