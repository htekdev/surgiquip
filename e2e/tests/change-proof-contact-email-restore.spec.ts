/**
 * Change Proof E2E Spec — Contact Email Mailto Restore
 * ONE SINGLE test() block = ONE continuous video proving the fix
 *
 * Flow:
 *   → Homepage
 *   → Navigate to Contact page
 *   → Scroll to contact info — verify email mailto link is present
 *   → Scroll to form — verify form present
 *   → Back to email — confirm fix is live
 *
 * Proof keyword: change-proof
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectAttribute,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(180000);

async function smoothScroll(page: Page, totalPx = 1000, stepPx = 250, delayMs = 380) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-contact-email-restore', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Navigate to Contact
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '📞 Opening Contact Page →');
  await page.waitForTimeout(600);
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Contact Page — verify email mailto link (the fix)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Contact Page — Info Section');
  await page.waitForTimeout(800);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Contact page H1');

  await smoothScroll(page, 400, 200, 400);
  await showPhaseLabel(page, '📧 Email Contact Info — Testing Fix');
  await page.waitForTimeout(600);

  // The key fix: email mailto link must be present
  const emailLink = page.locator('a[href^="mailto:"]').first();
  await emailLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await expectVisible(emailLink, 'Email mailto link — RESTORED');
  await expectAttribute(emailLink, 'href', /mailto:/, 'mailto: href present');

  await showPhaseLabel(page, '✅ Email Link Found — Fix Confirmed');
  await page.waitForTimeout(800);

  const emailLabel = page.locator('text=Email').first();
  await expectVisible(emailLabel, 'Email label visible');
  await page.waitForTimeout(600);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Contact Form — confirm rest of page is intact
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 600, 250, 380);
  await showPhaseLabel(page, '📝 Contact Form — Still Present After Fix');
  await page.waitForTimeout(600);

  const form = page.locator('form').first();
  await expectVisible(form, 'Contact form');

  await showPhaseLabel(page, '✅ Contact Page Complete — Email + Form Verified');
  await page.waitForTimeout(1200);
});

