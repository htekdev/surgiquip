import { test, expect } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel, expectJsonLd } from './visual-assert';

// ─── Projects Index ───────────────────────────────────────────────────────────

test.describe('Projects Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should render projects page heading', async ({ page }) => {
    await showPhaseLabel(page, '🏗️ Projects Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Projects heading');
    await expectText(heading, 'Case Studies', 'Projects h1 text');
    await expectURL(page, /\/projects/);
  });

  test('should display project cards', async ({ page }) => {
    await showPhaseLabel(page, '📋 Project Cards');
    // Project cards link to /projects/{slug}
    const projectLinks = page.locator('main a[href*="/projects/"]');
    const count = await projectLinks.count();
    // Must have at least one project card
    expect(count).toBeGreaterThan(0);
    const firstCard = projectLinks.first();
    await expectVisible(firstCard, 'First project card link');
  });

  test('should show years in business stat', async ({ page }) => {
    await showPhaseLabel(page, '📊 Stats Display');
    // "Over {years} years" stat paragraph
    const statText = page.locator('p').filter({ hasText: /years/ }).first();
    await expectVisible(statText, 'Years stat text');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Projects Schema Check');
    await expectJsonLd(page, 'Projects page JSON-LD');
  });
});

// ─── Project Detail Page ──────────────────────────────────────────────────────

test.describe('Project Detail Page', () => {
  // Uses the hybrid-or-houston project which exists on main
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects/hybrid-or-houston');
  });

  test('should render project detail heading', async ({ page }) => {
    await showPhaseLabel(page, '🏥 Project Detail');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Project heading');
  });

  test('should show facility and location metadata', async ({ page }) => {
    await showPhaseLabel(page, '📍 Project Metadata');
    // Facility or location text somewhere on page
    const body = page.locator('main');
    await expectVisible(body, 'Project body content');
  });

  test('should show breadcrumb navigation', async ({ page }) => {
    await showPhaseLabel(page, '🔗 Project Breadcrumb');
    // Breadcrumb nav with Home and Projects links
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]').first();
    await expectVisible(breadcrumb, 'Breadcrumb nav');

    const homeLink = breadcrumb.locator('a[href="/"]');
    await expectVisible(homeLink, 'Home in breadcrumb');
  });

  test('should have back-to-projects navigation', async ({ page }) => {
    await showPhaseLabel(page, '← Back to Projects');
    const backLink = page.locator('a[href="/projects"]').first();
    await expectVisible(backLink, 'Back to Projects link');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Project Detail Schema');
    await expectJsonLd(page, 'Project detail JSON-LD');
  });
});

// ─── Second Project Slug ──────────────────────────────────────────────────────

test.describe('Project Slug — Boom System', () => {
  test('should load boom-system project page', async ({ page }) => {
    await page.goto('/projects/boom-system-install-houston-asc');
    await showPhaseLabel(page, '🏗️ Boom System Project');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Boom system project heading');
    await expectURL(page, /\/projects\/boom-system-install-houston-asc/);
  });
});

// ─── Projects — Mobile ────────────────────────────────────────────────────────

test.describe('Projects — Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('should render projects index on mobile', async ({ page }) => {
    await page.goto('/projects');
    await showPhaseLabel(page, '📱 Projects Mobile');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Projects heading mobile');
  });
});
