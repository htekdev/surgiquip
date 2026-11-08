import { test, expect, type Page } from '@playwright/test';
import { expectVisible, expectAttribute, showPhaseLabel } from './visual-assert';

const areas = [
  'beaumont-tx', 'corpus-christi-tx', 'cypress-tx', 'galveston-tx',
  'houston-tx', 'humble-tx', 'league-city-tx', 'lubbock-tx',
  'pearland-tx', 'san-antonio-tx', 'southeast-texas', 'sugar-land-tx',
  'the-woodlands-tx', 'victoria-tx', 'webster-tx',
];
const articles = [
  'cardiac-catheterization-lab-equipment-guide-texas',
  'hybrid-or-planning-design-guide-texas-hospitals',
  'emergency-department-equipment-guide-texas-hospitals',
  'multi-brand-or-equipment-service-repair-texas',
  'neurosurgery-or-equipment-guide-texas-hospitals',
  'ldrp-birthing-suite-equipment-guide-texas-hospitals',
  'orthopedic-or-equipment-guide-texas-hospitals',
  'skytron-surgical-table-comparison-guide-texas',
  'surgical-equipment-suppliers-houston-tx',
  'womens-health-or-equipment-guide-texas-hospitals',
];
const noPublicEmail = /mailto:|@[a-z0-9.-]*surgiquip(?:solutions)?\.com\b/i;

async function clickRoute(page: Page, route: string) {
  const dropdownLink = page.locator(`[data-nav-item]:has(a[href="${route}"]) > a[aria-haspopup]`).first();
  if (await dropdownLink.count()) await dropdownLink.hover();
  const link = page.locator(`a[href="${route}"], a[href="${route}/"]`).first();
  if (await link.count()) {
    await expectVisible(link, `Existing link to ${route}`);
    await link.click();
  } else {
    // Existing orphan suburb pages have no site links. Verify the real public
    // route directly rather than fabricate navigation or broaden this fix.
    test.info().annotations.push({ type: 'existing-unlinked-route', description: route });
    await page.goto(route);
  }
  await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`));
  await expectVisible(page.locator('h1').first(), `${route} heading retained`);
}

async function verifyPage(page: Page) {
  expect(await page.content(), 'No public address/link, including JSON-LD').not.toMatch(noPublicEmail);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expectVisible(page.locator('a[href="tel:+17136816362"]:visible').first(), 'Existing phone available');
}

async function verifyForm(page: Page, source: 'contact' | 'quote') {
  const form = page.locator('form').first();
  await form.scrollIntoViewIfNeeded();
  await expectVisible(form, `${source} form retained`);
  await expectAttribute(form, 'action', 'https://formspree.io/f/mykrddag', 'Same Formspree endpoint');
  await expectAttribute(form, 'method', /post/i, 'POST preserved');
  await expectAttribute(form.locator('input[name="source"]'), 'value', source, 'Source routing preserved');
  await expectAttribute(form.locator('input[name="_gotcha"]'), 'tabindex', '-1', 'Honeypot preserved');
  const email = form.locator('input[name="email"]');
  await expectVisible(email, 'Visitor email field is NOT removed');
  await expectAttribute(email, 'type', 'email', 'Native email validation retained');
  await expectAttribute(email, 'autocomplete', 'email', 'Autofill retained');
  expect(await email.evaluate((input: HTMLInputElement) => input.required)).toBe(true);
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
  await email.fill('review@example.invalid');
  expect(await email.evaluate((input: HTMLInputElement) => input.checkValidity())).toBe(true);
  await email.clear();
  // Deliberately no submit/click: this proof must never contact the provider.
}

test('change-proof-public-email-removal — public routes retain phone and Formspree paths', async ({ page }, testInfo) => {
  test.setTimeout(600_000);
  let providerPosts = 0;
  await page.route('https://formspree.io/**', async (route) => {
    if (route.request().method() === 'POST') providerPosts++;
    await route.abort();
  });
  await page.goto('/');
  await verifyPage(page);
  await page.waitForTimeout(800);

  await clickRoute(page, '/contact');
  await showPhaseLabel(page, 'Contact: public email removed, visitor form retained');
  await verifyPage(page);
  await verifyForm(page, 'contact');
  await page.waitForTimeout(900);
  await page.setViewportSize({ width: 375, height: 900 });
  await verifyPage(page);
  await verifyForm(page, 'contact');
  await page.waitForTimeout(900);
  await page.setViewportSize({ width: 1280, height: 720 });

  await clickRoute(page, '/quote');
  await showPhaseLabel(page, 'Quote: unchanged form and phone, Contact Us link');
  await verifyPage(page);
  await verifyForm(page, 'quote');
  await page.waitForTimeout(800);

  for (const route of ['/privacy', '/terms']) {
    await clickRoute(page, route);
    await verifyPage(page);
    await page.locator('h2').last().scrollIntoViewIfNeeded();
    await showPhaseLabel(page, `${route}: contact form and phone instead of public email`);
    await page.waitForTimeout(900);
    await clickRoute(page, '/contact');
  }

  // Follow actual existing navigation/links; never inject review-only links.
  await clickRoute(page, '/about');
  for (const route of ['/about/team', '/about/accreditation']) {
    await clickRoute(page, route);
    await verifyPage(page);
    await page.locator('a[href="/contact"]').last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await clickRoute(page, '/about');
  }

  await clickRoute(page, '/services');
  await clickRoute(page, '/services/service-and-repair');
  await verifyPage(page);
  await expectVisible(page.locator('ol .font-semibold').filter({ hasText: 'Call or Contact Form' }), 'Service contact step corrected');
  await page.waitForTimeout(800);

  await clickRoute(page, '/service-areas');
  for (const area of areas) {
    await clickRoute(page, `/service-areas/${area}`);
    await verifyPage(page);
    await showPhaseLabel(page, `${area}: phone/schema retained, public email removed`);
    if (area === 'houston-tx') {
      await page.getByText('2020 Johanna Drive', { exact: false }).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
    }
    await page.waitForTimeout(300);
    await clickRoute(page, '/service-areas');
  }

  await clickRoute(page, '/blog');
  for (const article of articles) {
    await clickRoute(page, `/blog/${article}`);
    await verifyPage(page);
    const body = page.locator('article');
    await body.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
    await showPhaseLabel(page, 'Article contact details: existing phone, no public email');
    await page.waitForTimeout(900);
    await clickRoute(page, '/blog');
  }

  // Thank-you is a direct landing route; visiting it is not a form submission.
  await page.goto('/thank-you');
  await verifyPage(page);
  await page.locator('a[href="/contact"]').last().scrollIntoViewIfNeeded();
  await showPhaseLabel(page, 'Thank-you: contact link retained without sending a test submission');
  await page.waitForTimeout(900);
  await clickRoute(page, '/contact');
  expect(providerPosts, 'No active test submission occurred').toBe(0);
  await testInfo.attach('public-email-removal-routes', {
    body: JSON.stringify({ areas, articles, visitorFormsRetained: true, providerPosts }),
    contentType: 'application/json',
  });
});
