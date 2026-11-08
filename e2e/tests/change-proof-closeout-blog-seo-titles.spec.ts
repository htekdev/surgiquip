import { test, expect } from '@playwright/test';
import { expectTitle, expectText, expectVisible, expectURL, showPhaseLabel } from './visual-assert';

// Only the five missing titles from the older SEO PR. Preserve current H1s,
// article-specific images, client wording and the live form integration.
const articles = [
  {
    slug: 'emergency-department-equipment-guide-texas-hospitals',
    seoTitle: 'ED & Trauma Bay Equipment | Texas',
    heading: 'Emergency Department Equipment Guide: Boom Systems, Lighting, and Infrastructure for Texas EDs and Trauma Bays',
    image: '/images/blog/or-installation-planning-hero.webp',
  },
  {
    slug: 'ldrp-birthing-suite-equipment-guide-texas-hospitals',
    seoTitle: 'LDRP Suite Equipment Guide | TX',
    heading: "LDRP Suite Equipment Guide: What Texas Women's Hospitals Need to Know",
    image: '/images/services/or-installation-hero.webp',
  },
  {
    slug: 'orthopedic-or-equipment-guide-texas-hospitals',
    seoTitle: 'Orthopedic OR Equipment | Texas',
    heading: 'Orthopedic OR Equipment Guide: Surgical Tables, Boom Systems, and Lighting for Texas Orthopedic ORs',
    image: '/images/blog/orthopedic-or-suite-hero.webp',
  },
  {
    slug: 'skytron-surgical-table-comparison-guide-texas',
    seoTitle: 'Skytron Table Comparison | Texas',
    heading: 'Skytron Surgical Tables: Model Comparison Guide for Texas Hospitals and Surgery Centers',
    image: '/images/products/skytron-hero.webp',
  },
  {
    slug: 'sterile-processing-department-equipment-guide-texas',
    seoTitle: 'Sterile Processing Guide | Texas',
    heading: 'Sterile Processing Department Equipment: A Technical Guide for Texas Hospitals',
    image: '/images/blog/sterilization-equipment-guide-hero.webp',
  },
];

// One continuous recorded test; every changed route is visited through its
// actual index link. No form submissions or provider writes are performed.
test('change-proof-closeout-blog-seo-titles: six routes and unchanged article content', async ({ page, request }, testInfo) => {
  test.setTimeout(240_000);
  const coverage: { route: string; titleLength: number }[] = [];

  await page.goto('/blog');
  await expectTitle(page, 'Surgical Equipment Resources | Surgiquip Solutions');
  await expectVisible(page.locator('main h1'), 'Blog index heading is unchanged and visible');
  coverage.push({ route: '/blog', titleLength: (await page.title()).length });

  for (const article of articles) {
    await page.goto('/blog');
    await page.locator(`main a[href="/blog/${article.slug}"]`).first().click();
    await expectURL(page, new RegExp(`/blog/${article.slug}/?$`));
    const title = `${article.seoTitle} | Surgiquip Solutions`;
    await expectTitle(page, title);
    expect(title.length).toBeLessThanOrEqual(60);
    await showPhaseLabel(page, `Verified ${title.length}-character title: ${article.seoTitle}`, 1500);
    await expectText(page.locator('main h1'), article.heading, 'Original full H1 preserved');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/blog/${article.slug}$`));

    const hero = page.locator(`main img[src="${article.image}"]`).first();
    await expectVisible(hero, 'Current article-specific image preserved');
    await expect(hero).toHaveAttribute('alt', article.heading);
    await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect((await request.get(article.image)).status()).toBe(200);

    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .flatMap((text) => {
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : [parsed];
      });
    expect(schemas.some((schema) => schema['@type'] === 'BlogPosting' && schema.headline === article.heading)).toBe(true);
    await expectVisible(page.locator('main article.blog-body'), 'Original article body still renders');
    await page.mouse.wheel(0, 450);
    await showPhaseLabel(page, 'Original content, image and schema preserved', 1500);
    coverage.push({ route: `/blog/${article.slug}`, titleLength: title.length });
  }

  expect(coverage).toHaveLength(6);
  expect(coverage.every((route) => route.titleLength <= 60)).toBe(true);
  await testInfo.attach('changed-route-coverage', {
    body: JSON.stringify({ coveredRoutes: 6, changedRoutes: 6, routes: coverage }, null, 2),
    contentType: 'application/json',
  });
});
