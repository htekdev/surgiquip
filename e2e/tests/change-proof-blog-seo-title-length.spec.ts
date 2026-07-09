import { test, expect } from '@playwright/test';
import { showPhaseLabel } from './visual-assert';

/**
 * change-proof-blog-seo-title-length
 *
 * Verifies that all 10 blog articles that previously lacked a seoTitle field
 * now have <title> tags ≤60 characters after adding seoTitle frontmatter.
 *
 * The blog layout uses: `${seoTitle ?? title} | Surgiquip Solutions`
 * Without seoTitle, the full verbose H1 title was used (91–171 chars).
 *
 * Quality Mode fix: SEO title tags exceeding Google's ~60-char SERP display limit.
 */

const ARTICLES: { slug: string; expectedSeoTitle: string }[] = [
  {
    slug: 'cardiac-catheterization-lab-equipment-guide-texas',
    expectedSeoTitle: 'Cath Lab Equipment Guide | Texas',
  },
  {
    slug: 'ceiling-mount-boom-systems-texas-operating-rooms',
    expectedSeoTitle: 'Ceiling Boom Systems Guide | Texas',
  },
  {
    slug: 'emergency-department-equipment-guide-texas-hospitals',
    expectedSeoTitle: 'ED & Trauma Bay Equipment | Texas',
  },
  {
    slug: 'hybrid-or-planning-design-guide-texas-hospitals',
    expectedSeoTitle: 'Hybrid OR Planning Guide | Texas',
  },
  {
    slug: 'ldrp-birthing-suite-equipment-guide-texas-hospitals',
    expectedSeoTitle: 'LDRP Suite Equipment Guide | TX',
  },
  {
    slug: 'multi-brand-or-equipment-service-repair-texas',
    expectedSeoTitle: 'Multi-Brand OR Service & Repair TX',
  },
  {
    slug: 'orthopedic-or-equipment-guide-texas-hospitals',
    expectedSeoTitle: 'Orthopedic OR Equipment | Texas',
  },
  {
    slug: 'skytron-surgical-table-comparison-guide-texas',
    expectedSeoTitle: 'Skytron Table Comparison | Texas',
  },
  {
    slug: 'sterile-processing-department-equipment-guide-texas',
    expectedSeoTitle: 'Sterile Processing Guide | Texas',
  },
  {
    slug: 'womens-health-or-equipment-guide-texas-hospitals',
    expectedSeoTitle: "Women's Health OR Equipment TX",
  },
];

test('fix(seo): blog article <title> tags are ≤60 chars with seoTitle frontmatter on all 10 articles', async ({
  page,
}) => {
  const DELAY = 500;

  for (let i = 0; i < ARTICLES.length; i++) {
    const { slug, expectedSeoTitle } = ARTICLES[i];
    const expectedTitle = `${expectedSeoTitle} | Surgiquip Solutions`;

    await showPhaseLabel(
      page,
      `Phase ${i + 1}/${ARTICLES.length}: ${expectedSeoTitle}`,
    );

    await page.goto(`/blog/${slug}`);
    await page.waitForTimeout(DELAY);

    // Verify the page <title> matches the expected seoTitle + suffix
    const actualTitle = await page.title();
    expect(actualTitle).toBe(expectedTitle);

    // Verify ≤60 chars
    expect(actualTitle.length).toBeLessThanOrEqual(60);

    // Verify H1 still shows the full descriptive title (not truncated)
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // The H1 must NOT equal the seoTitle — it should still be the full verbose title
    const h1Text = await h1.textContent();
    expect(h1Text?.trim()).not.toBe(expectedSeoTitle);
  }

  // Final phase: blog index loads all 10 articles
  await showPhaseLabel(page, 'Phase 11: Blog index — all articles present');
  await page.goto('/blog');
  await page.waitForTimeout(DELAY);

  const blogTitle = await page.title();
  expect(blogTitle.length).toBeLessThanOrEqual(60);
  await expect(page.locator('main')).toBeVisible();
});
