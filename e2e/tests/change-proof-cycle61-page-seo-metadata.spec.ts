import { test, expect } from '@playwright/test';
import { expectVisible, showPhaseLabel } from './visual-assert';

/**
 * Cycle 61 — Page SEO metadata (title tags + meta descriptions)
 * Verifies all non-blog pages have title tags ≤60 chars and
 * meta descriptions ≤155 chars.
 */
test('cycle61 — page title tags ≤60 chars and meta descriptions ≤155 chars', async ({ page }) => {
  test.setTimeout(240000);

  const pages = [
    // Core pages
    { path: '/', label: 'Homepage' },
    { path: '/about', label: 'About' },
    { path: '/about/our-story', label: 'Our Story' },
    { path: '/about/team', label: 'Team' },
    { path: '/contact', label: 'Contact' },
    { path: '/quote', label: 'Quote' },
    { path: '/projects', label: 'Projects' },
    // Products
    { path: '/products', label: 'Products index' },
    { path: '/products/skytron', label: 'Skytron products' },
    { path: '/products/hsi', label: 'HSI products' },
    { path: '/products/knight', label: 'Knight products' },
    // Services
    { path: '/services', label: 'Services index' },
    { path: '/services/or-installation', label: 'OR Installation' },
    { path: '/services/preventive-maintenance', label: 'Preventive Maintenance' },
    { path: '/services/equipment-sales', label: 'Equipment Sales' },
    { path: '/services/service-and-repair', label: 'Service & Repair' },
    // Service areas
    { path: '/service-areas', label: 'Service Areas index' },
    { path: '/service-areas/houston-tx', label: 'Houston TX' },
    { path: '/service-areas/beaumont-tx', label: 'Beaumont TX' },
    { path: '/service-areas/victoria-tx', label: 'Victoria TX' },
    { path: '/service-areas/corpus-christi-tx', label: 'Corpus Christi TX' },
    { path: '/service-areas/san-antonio-tx', label: 'San Antonio TX' },
    { path: '/service-areas/lubbock-tx', label: 'Lubbock TX' },
    { path: '/service-areas/southeast-texas', label: 'Southeast Texas' },
  ];

  for (const { path, label } of pages) {
    await showPhaseLabel(page, `Checking: ${label}`);
    await page.goto(path);

    // Page loads
    await expectVisible(page, 'h1');

    // Title tag ≤60 chars
    const title = await page.title();
    expect(
      title.length,
      `${label} (${path}): title is ${title.length} chars (limit: 60): "${title}"`
    ).toBeLessThanOrEqual(60);

    // Meta description ≤155 chars (if present)
    const metaDesc = page.locator('meta[name="description"]');
    const descContent = await metaDesc.getAttribute('content');
    if (descContent) {
      expect(
        descContent.length,
        `${label} (${path}): meta description is ${descContent.length} chars (limit: 155): "${descContent}"`
      ).toBeLessThanOrEqual(155);
    }
  }
});
