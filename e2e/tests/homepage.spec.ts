import { test } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel, expectURL, expectJsonLd } from './visual-assert';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render hero section', async ({ page }) => {
    await showPhaseLabel(page, '🏠 Homepage Hero');
    const hero = page.locator('section').first();
    await expectVisible(hero, 'Hero section');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Hero heading');
    // h1: "Medical Equipment Sales & Service — Dedicated to Excellence Since {year}"
    await expectText(heading, 'Medical Equipment', 'Hero h1 text');
  });

  test('should render stat bar', async ({ page }) => {
    await showPhaseLabel(page, '📊 Stat Bar');
    // StatBar renders a section with bold stat values
    const statBar = page.locator('section').nth(1);
    await expectVisible(statBar, 'Stats section');
  });

  test('should render services grid', async ({ page }) => {
    await showPhaseLabel(page, '🔧 Services Grid');
    // ServicesGrid renders <section id="services">
    const servicesSection = page.locator('#services');
    await expectVisible(servicesSection, 'Services section');
  });

  test('should render partner logos', async ({ page }) => {
    await showPhaseLabel(page, '🤝 Partner Logos');
    // Scope to the dedicated partners section to avoid matching EquipmentShowcase eyebrow
    const partnersSection = page.locator('section').filter({ hasText: 'Our Partners' });
    await expectVisible(partnersSection, 'Partners section');
    // SKYTRON® label inside the partner grid
    const skytron = partnersSection.locator('div').filter({ hasText: /SKYTRON/i }).first();
    await expectVisible(skytron, 'Skytron partner label');
  });

  test('should render FAQ section', async ({ page }) => {
    await showPhaseLabel(page, '❓ FAQ Section');
    // FAQSection uses aria-labelledby="faq-heading"; homepage heading is "Everything You Need to Know"
    const faq = page.locator('[aria-labelledby="faq-heading"]');
    await expectVisible(faq, 'FAQ section');
  });

  test('should render CTA section', async ({ page }) => {
    await showPhaseLabel(page, '📞 CTA Section');
    const cta = page.locator('a[href="/contact"], a[href="/quote"]').first();
    await expectVisible(cta, 'CTA link');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Schema Validation');
    // Homepage injects 3 blocks: Organization, WebSite, FAQPage
    await expectJsonLd(page, 'Homepage JSON-LD');
  });
});
