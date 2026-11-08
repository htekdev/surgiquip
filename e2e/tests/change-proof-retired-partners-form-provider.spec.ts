import { test, expect } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel } from './visual-assert';

test('change-proof retired dealer bookmarks and factual form provider, with retained inquiry flows', async ({ page, request }) => {
  test.setTimeout(180000);
  let providerPosts = 0;
  await page.route('https://formspree.io/**', async (route) => {
    if (route.request().method() === 'POST') providerPosts++;
    await route.abort();
  });

  await page.goto('/');
  await showPhaseLabel(page, 'Existing footer privacy link');
  await page.locator('footer a[href="/privacy"]').click();
  const provider = page.locator('li').filter({ hasText: 'Our contact and quote forms send submissions to Formspree for processing.' });
  await provider.scrollIntoViewIfNeeded();
  await showPhaseLabel(page, 'Actual form provider, no new legal assurances');
  await expectVisible(provider, 'Factual provider correction');
  await expectText(provider, 'Formspree for processing', 'Form processor is correctly named');
  await expect(page.locator('main')).not.toContainText('Resend');
  await expect(page.locator('main')).toContainText('November 8, 2026');

  // These withdrawn pages have no current nav links. Test real old bookmarks,
  // never manufacture links or imply an approved replacement partner.
  for (const path of ['/products/hsi', '/products/hsi/', '/products/hsi/index.html', '/products/knight', '/products/knight/', '/products/knight/index.html']) {
    await showPhaseLabel(page, `Retired bookmark: ${path} — permanent catalog redirect`);
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), `${path} is a real permanent redirect`).toBe(301);
    const destination = new URL(response.headers().location, response.url());
    expect(destination.pathname.replace(/\/$/, '')).toBe('/products');
    await page.goto(path);
    await expectURL(page, /\/products\/?$/);
    await expectVisible(page.locator('h1'), 'Current catalog reached from old bookmark');
    await expectText(page.locator('h1'), 'Equipment Catalog', 'No withdrawn dealer sales page');
    await expect(page.locator('main')).not.toContainText(/\b(?:HSI|Knight)\b/);
  }

  const sitemapResponse = await request.get('/sitemap-0.xml');
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).not.toMatch(/\/products\/(?:hsi|knight)(?:\/|<)/);
  expect(sitemap).toContain('/products/skytron');

  // Verify existing available sales route and identity, not new partner products.
  await page.locator('[data-nav-item] > a[href="/products"][aria-haspopup]').hover();
  await page.locator('a[href="/products/skytron"]:visible').first().click();
  await showPhaseLabel(page, 'Existing Skytron catalog remains available');
  await expectVisible(page.locator('h1'), 'Skytron page retained');
  await expectText(page.locator('h1'), 'Skytron', 'Existing brand not redesigned');

  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 800 });
    for (const path of ['/contact', '/quote']) {
      await page.goto(path);
      await showPhaseLabel(page, `${path} at actual ${width}px — unchanged form, no submission`);
      const form = page.locator('form');
      await form.scrollIntoViewIfNeeded();
      await expectVisible(form, 'Inquiry form retained');
      await expect(form).toHaveAttribute('action', 'https://formspree.io/f/mykrddag');
      await expect(form).toHaveAttribute('method', /post/i);
      await expect(form.locator('input[type="email"]')).toHaveCount(1);
      await expect(form.locator('input[type="email"]')).toHaveAttribute('required', '');
      expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    }
  }
  expect(providerPosts, 'No live lead, test email or form submission').toBe(0);
});
