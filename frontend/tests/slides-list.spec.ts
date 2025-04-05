import { test, expect } from '@playwright/test';

test.describe('SlidesList Component', () => {
  test('renders list of slides correctly', async ({ page }) => {
    // Navigate to the page containing the SlidesList
    await page.goto('/create-new');
    
    // Wait for the slides list to be visible
    await page.waitForSelector('[role="list"]');
    
    // Take a screenshot of the slides list
    const slidesList = await page.locator('[role="list"]');
    await expect(slidesList).toHaveScreenshot('slides-list.png');
  });

  test('handles responsive layout', async ({ page }) => {
    await page.goto('/create-new');
    await page.waitForSelector('[role="list"]');

    // Test at different viewport sizes
    for (const size of [
      { width: 640, height: 480 },  // Small
      { width: 1024, height: 768 }, // Medium
      { width: 1280, height: 800 }, // Large
    ]) {
      await page.setViewportSize(size);
      const slidesList = await page.locator('[role="list"]');
      await expect(slidesList).toHaveScreenshot(`slides-list-${size.width}x${size.height}.png`);
    }
  });

  test('shows scroll behavior with many slides', async ({ page }) => {
    await page.goto('/create-new');
    await page.waitForSelector('[role="list"]');

    // Set a fixed height to ensure scrolling
    await page.evaluate(() => {
      const container = document.querySelector('[role="list"]')?.parentElement;
      if (container) {
        container.style.height = '300px';
      }
    });

    // Take screenshot of initial view
    const slidesList = await page.locator('[role="list"]').first();
    await expect(slidesList).toHaveScreenshot('slides-list-before-scroll.png');

    // Scroll to bottom
    await page.evaluate(() => {
      const container = document.querySelector('[role="list"]')?.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });

    // Take screenshot after scrolling
    await expect(slidesList).toHaveScreenshot('slides-list-after-scroll.png');
  });
});