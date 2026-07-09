import { Locator, Page, expect } from '@playwright/test';

/**
 * Visual Assertion Helpers — Surgiquip E2E
 *
 * Wraps standard Playwright assertions with PULSING visual highlighting so that
 * anyone watching the recorded video can clearly SEE what element is being validated.
 * Uses animated pulsing glow (not static borders) to distinguish from app CSS.
 *
 * Features:
 * - Pulsing animation on highlights (unmistakable in video)
 * - Running assertion counter overlay in top-left corner
 * - Phase labels in top-right corner
 * - 500ms highlight duration for clear visibility
 *
 * Colors:
 * - Green (#00ff00) = asserting visibility/existence
 * - Blue (#3b82f6) = asserting content/value
 * - Yellow (#fbbf24) = asserting state (disabled, class, etc.)
 * - Magenta (#e879f9) = asserting data persistence/values
 */

const HIGHLIGHT_DURATION = 500; // ms — clearly visible at normal playback
const FLASH_DURATION = 250;

// Track assertion count per page for the counter overlay
const pageAssertionCounts = new WeakMap<Page, number>();

function getCount(page: Page): number {
  return pageAssertionCounts.get(page) || 0;
}

function incrementCount(page: Page): number {
  const count = getCount(page) + 1;
  pageAssertionCounts.set(page, count);
  return count;
}

/**
 * Safely extract the Page from a Locator.
 *
 * Playwright < 1.50: locator.page() is a method.
 * Playwright ≥ 1.50: locator.page() was removed — the property may not exist.
 * This helper handles both versions gracefully.
 */
function getPage(locator: Locator): Page | undefined {
  const pageProp = (locator as any).page;
  if (typeof pageProp === 'function') {
    try { return pageProp.call(locator) as Page; } catch { return undefined; }
  }
  if (pageProp && typeof pageProp === 'object' && typeof (pageProp as any).evaluate === 'function') {
    // It's already a Page object exposed as a getter property
    return pageProp as Page;
  }
  return undefined;
}

interface HighlightOptions {
  color?: string;
  label?: string;
  duration?: number;
}

async function updateAssertionCounter(page: Page, count: number) {
  await page.evaluate(
    ({ count }) => {
      let counter = document.getElementById('__e2e_assert_counter');
      if (!counter) {
        counter = document.createElement('div');
        counter.id = '__e2e_assert_counter';
        counter.style.cssText = `
          position: fixed; top: 12px; left: 12px; z-index: 999999;
          background: rgba(0,0,0,0.9); color: #4ade80; font-size: 13px;
          font-weight: bold; padding: 6px 12px; border-radius: 6px;
          font-family: monospace; pointer-events: none;
          border: 1px solid #4ade80;
        `;
        document.body.appendChild(counter);
      }
      counter.textContent = `✓ ${count} passed`;
    },
    { count }
  ).catch(() => {});
}

async function highlight(locator: Locator, options: HighlightOptions = {}) {
  const { color = '#00ff00', label, duration = HIGHLIGHT_DURATION } = options;

  try {
    await locator.scrollIntoViewIfNeeded({ timeout: 3_000 });
  } catch {
    // Element might not be scrollable — continue anyway
  }

  // Inject pulsing keyframe animation if not already present
  const page = getPage(locator);
  if (page) {
    await page.evaluate(() => {
      if (!document.getElementById('__e2e_pulse_style')) {
        const style = document.createElement('style');
        style.id = '__e2e_pulse_style';
        style.textContent = `
          @keyframes e2ePulse {
            0%, 100% { box-shadow: 0 0 4px 2px currentColor; }
            50% { box-shadow: 0 0 12px 6px currentColor; }
          }
        `;
        document.head.appendChild(style);
      }
    }).catch(() => {});
  }

  await locator.evaluate(
    (el, { color, label }) => {
      // Add pulsing highlight — uses box-shadow animation, NOT outline
      el.style.color = color;
      el.style.boxShadow = `0 0 8px 4px ${color}`;
      el.style.animation = 'e2ePulse 0.6s ease-in-out infinite';
      el.style.borderRadius = el.style.borderRadius || '4px';

      // Add floating label if provided
      if (label) {
        const tag = document.createElement('div');
        tag.id = '__e2e_assert_label';
        tag.textContent = label;
        tag.style.cssText = `
          position: absolute; top: -30px; left: 0; z-index: 99999;
          background: ${color}; color: #000; font-size: 11px; font-weight: bold;
          padding: 3px 10px; border-radius: 4px; white-space: nowrap;
          font-family: monospace; pointer-events: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        el.style.position = el.style.position || 'relative';
        el.appendChild(tag);
      }
    },
    { color, label }
  ).catch(() => {});

  // Wait for highlight duration — use page.waitForTimeout if available, else setTimeout
  if (page) {
    await page.waitForTimeout(duration);
  } else {
    await new Promise<void>((r) => setTimeout(r, duration));
  }
}

async function removeHighlight(locator: Locator) {
  await locator.evaluate((el) => {
    el.style.boxShadow = '';
    el.style.animation = '';
    el.style.color = '';
    const label = el.querySelector('#__e2e_assert_label');
    if (label) label.remove();
  }).catch(() => {});
}

async function flashResult(locator: Locator, passed: boolean) {
  const color = passed ? '#4ade80' : '#ef4444';
  await locator.evaluate(
    (el, color) => {
      el.style.animation = '';
      el.style.boxShadow = `0 0 12px 6px ${color}`;
    },
    color
  ).catch(() => {});
  const page = getPage(locator);
  if (page) {
    await page.waitForTimeout(FLASH_DURATION);
  } else {
    await new Promise<void>((r) => setTimeout(r, FLASH_DURATION));
  }
  await removeHighlight(locator);
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Assert element is visible with green pulsing highlight in video.
 */
export async function expectVisible(locator: Locator, label?: string) {
  const page = getPage(locator);
  await highlight(locator, { color: '#00ff00', label: label || '✓ visible' });
  await expect(locator).toBeVisible();
  if (page) {
    const count = incrementCount(page);
    await updateAssertionCounter(page, count);
  }
  await flashResult(locator, true);
}

/**
 * Assert element is NOT visible.
 */
export async function expectHidden(locator: Locator, label?: string) {
  const page = getPage(locator);
  await expect(locator).not.toBeVisible();
  if (page) {
    const count = incrementCount(page);
    await updateAssertionCounter(page, count);
  }
}

/**
 * Assert element contains specific text with blue pulsing highlight.
 */
export async function expectText(locator: Locator, text: string | RegExp, label?: string) {
  const page = getPage(locator);
  await highlight(locator, { color: '#3b82f6', label: label || `✓ "${text}"` });
  if (typeof text === 'string') {
    await expect(locator).toContainText(text);
  } else {
    await expect(locator).toHaveText(text);
  }
  if (page) {
    const count = incrementCount(page);
    await updateAssertionCounter(page, count);
  }
  await flashResult(locator, true);
}

/**
 * Assert element has a specific attribute value with magenta pulsing highlight.
 */
export async function expectAttribute(locator: Locator, attr: string, value: string | RegExp, label?: string) {
  const page = getPage(locator);
  await highlight(locator, { color: '#e879f9', label: label || `✓ ${attr}` });
  await expect(locator).toHaveAttribute(attr, value);
  if (page) {
    const count = incrementCount(page);
    await updateAssertionCounter(page, count);
  }
  await flashResult(locator, true);
}

/**
 * Assert URL matches pattern with yellow phase highlight.
 */
export async function expectURL(page: Page, pattern: string | RegExp, label?: string) {
  await expect(page).toHaveURL(pattern);
  const count = incrementCount(page);
  await updateAssertionCounter(page, count);
}

/**
 * Assert element has a specific CSS class with yellow pulsing highlight.
 */
export async function expectClass(locator: Locator, classPattern: RegExp, label?: string) {
  const page = getPage(locator);
  await highlight(locator, { color: '#fbbf24', label: label || '✓ class' });
  await expect(locator).toHaveClass(classPattern);
  if (page) {
    const count = incrementCount(page);
    await updateAssertionCounter(page, count);
  }
  await flashResult(locator, true);
}

/**
 * Assert a count of elements matching a locator.
 */
export async function expectCount(locator: Locator, count: number, label?: string) {
  const page = getPage(locator);
  await expect(locator).toHaveCount(count);
  if (page) {
    const c = incrementCount(page);
    await updateAssertionCounter(page, c);
  }
}

/**
 * Assert page title matches.
 */
export async function expectTitle(page: Page, title: string | RegExp, label?: string) {
  await expect(page).toHaveTitle(title);
  const count = incrementCount(page);
  await updateAssertionCounter(page, count);
}

/**
 * Assert JSON-LD schema exists on the page and every block is valid JSON.
 *
 * NOTE: <script type="application/ld+json"> tags live in <head> and are never
 * "visible" in Playwright's sense — toBeVisible() always fails for them.
 * This helper checks existence + parseability instead, then shows a green
 * phase label so the assertion is clearly visible in recorded videos.
 */
export async function expectJsonLd(page: Page, label = 'JSON-LD Schema') {
  const schemas = page.locator('script[type="application/ld+json"]');
  const count = await schemas.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const content = await schemas.nth(i).textContent();
    expect(() => JSON.parse(content!)).not.toThrow();
  }
  const c = incrementCount(page);
  await updateAssertionCounter(page, c);
  await showPhaseLabel(
    page,
    `✅ ${label}: ${count} schema block${count > 1 ? 's' : ''} found & valid`,
    1500,
  );
}

/**
 * Visual pause with a large phase label overlay — marks test phases in the video.
 * Shows in top-right corner with dark background.
 */
export async function showPhaseLabel(page: Page, text: string, duration = 1000) {
  await page.evaluate(
    ({ text }) => {
      // Remove previous label if exists
      const prev = document.getElementById('__e2e_phase_label');
      if (prev) prev.remove();

      const overlay = document.createElement('div');
      overlay.id = '__e2e_phase_label';
      overlay.textContent = text;
      overlay.style.cssText = `
        position: fixed; top: 12px; right: 12px; z-index: 999999;
        background: rgba(0,0,0,0.9); color: #fff; font-size: 16px;
        font-weight: bold; padding: 10px 20px; border-radius: 10px;
        font-family: system-ui, sans-serif; pointer-events: none;
        border: 2px solid rgba(255,255,255,0.3);
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      `;
      document.body.appendChild(overlay);
    },
    { text }
  );
  await page.waitForTimeout(duration);
  await page.evaluate(() => {
    const el = document.getElementById('__e2e_phase_label');
    if (el) el.remove();
  });
}
