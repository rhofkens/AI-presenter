import { test, expect } from '@playwright/test';

test.describe('Health Check Integration', () => {
  test('health endpoint integration', async ({ page }) => {
    // Visit the homepage
    await page.goto('/');
    
    // Wait for the health check component to appear
    await page.waitForSelector('text="System Status"');
    
    // Check the backend health endpoint directly
    const response = await page.request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const health = await response.json();
    expect(health.status).toBe('UP');
    
    // Verify the UI shows the correct status
    await expect(page.locator('text="✅ Backend Status: UP"')).toBeVisible();
  });

  test('handles backend connection failure', async ({ page }) => {
    // Mock the health endpoint to return a failure
    await page.route('/api/health', route => route.abort());
    
    // Visit the homepage
    await page.goto('/');
    
    // Wait for the health check component to appear
    await page.waitForSelector('text="System Status"');
    
    // Wait for the error state to appear (component makes the request on mount)
    await expect(page.locator('text="❌ Backend connection failed"')).toBeVisible({
      timeout: 10000 // Increase timeout to allow for retry attempts
    });
  });
});