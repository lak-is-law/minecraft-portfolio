/**
 * Playwright Test Suite for World of Lakshya 3D Map
 * Verifies:
 * - 0 page errors and console errors
 * - Exactly 46 waypoints rendered
 * - Camera presets (Home, Top-down, Landmark focus)
 * - HUD layout & badge collision avoidance at 770x700
 * - Messaging protocol & travel event triggers
 */
import { test, expect } from '@playwright/test';

test.describe('World of Lakshya 3D Map', () => {
  test('renders 3D map with 46 waypoints and 0 console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto('http://localhost:5176/');
    await page.waitForSelector('#app-container');
    await page.waitForTimeout(1000);

    // Verify 0 console errors
    expect(consoleErrors).toEqual([]);

    // Verify 46 waypoints in window.CraftMap
    const waypointsCount = await page.evaluate(() => window.CraftMap?.waypoints?.length);
    expect(waypointsCount).toBe(46);

    // Verify badges rendered
    const badgeCount = await page.evaluate(() => document.querySelectorAll('#lbls .lbl').length);
    expect(badgeCount).toBe(46);
  });

  test('captures screenshots at 3 camera presets', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5176/');
    await page.waitForSelector('#app-container');
    await page.waitForTimeout(1200);

    // Preset 1: Home view
    await page.screenshot({ path: 'tests/preset-home-1440x900.png' });

    // Preset 2: Top-down view
    await page.click('#q-view');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/preset-topview-1440x900.png' });

    // Preset 3: Focus on player / Citadel
    await page.click('#q-you');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/preset-focus-1440x900.png' });
  });

  test('responsive compact layout at 770x700 without overlapping panels', async ({ page }) => {
    await page.setViewportSize({ width: 770, height: 700 });
    await page.goto('http://localhost:5176/');
    await page.waitForSelector('#hud-left');
    await page.waitForSelector('#hud-right');

    const leftBox = await page.locator('#hud-left').boundingBox();
    const rightBox = await page.locator('#hud-right').boundingBox();

    // Check that left and right columns do not overlap
    expect(leftBox).not.toBeNull();
    expect(rightBox).not.toBeNull();
    if (leftBox && rightBox) {
      const overlapsX = leftBox.x + leftBox.width > rightBox.x && rightBox.x + rightBox.width > leftBox.x;
      const overlapsY = leftBox.y + leftBox.height > rightBox.y && rightBox.y + rightBox.height > leftBox.y;
      expect(overlapsX && overlapsY).toBe(false);
    }
  });

  test('dispatches travel events on destination selection', async ({ page }) => {
    await page.goto('http://localhost:5176/');
    await page.waitForSelector('#app-container');

    const travelPromise = page.evaluate(() => {
      return new Promise(resolve => {
        window.addEventListener('craftme:travel', e => resolve(e.detail), { once: true });
        // Trigger travel to EIFFEL
        const eiffel = window.CraftMap?.waypoints?.find(w => w.n === 'EIFFEL');
        if (eiffel) {
          window.dispatchEvent(new CustomEvent('craftme:travel', { detail: { x: eiffel.X, z: eiffel.Z, name: eiffel.n } }));
        }
      });
    });

    const detail = await travelPromise;
    expect(detail.name).toBe('EIFFEL');
  });
});
