import { test } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel, expectURL } from './visual-assert';

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
    await expectText(heading, 'Surgiquip', 'Brand name in hero');
  });

  test('should render stat bar', async ({ page }) => {
    await showPhaseLabel(page, '📊 Stat Bar');
    // StatBar shows key metrics (years, projects, etc.)
    const statBar = page.locator('[data-section="stats"], section:has(strong)').first();
    await expectVisible(statBar, 'Stats section');
  });

  test('should render services grid', async ({ page }) => {
    await showPhaseLabel(page, '🔧 Services Grid');
    const servicesSection = page.locator('text=Services').first();
    await expectVisible(servicesSection, 'Services heading');
  });

  test('should render partner logos', async ({ page }) => {
    await showPhaseLabel(page, '🤝 Partner Logos');
    const partners = page.locator('text=Skytron').first();
    await expectVisible(partners, 'Skytron partner');
  });

  test('should render FAQ section', async ({ page }) => {
    await showPhaseLabel(page, '❓ FAQ Section');
    const faq = page.locator('text=Frequently Asked').first();
    await expectVisible(faq, 'FAQ heading');
  });

  test('should render CTA section', async ({ page }) => {
    await showPhaseLabel(page, '📞 CTA Section');
    const cta = page.locator('a[href="/contact"], a[href="/quote"]').first();
    await expectVisible(cta, 'CTA link');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Schema Validation');
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    await expectVisible(jsonLd, 'JSON-LD script tag');
  });
});
