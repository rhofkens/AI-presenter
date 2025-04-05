import { test, expect } from '@playwright/test';
import { TEMPLATE_TYPES } from '../src/constants/templates';

test.describe('Metadata Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the create new video page
    await page.goto('/create-new');
  });

  test('completes form submission successfully', async ({ page }) => {
    // Fill in the title
    await page.fill('input[id="title"]', 'Test Project Title');

    // Fill in the description
    await page.fill('input[id="description"]', 'This is a test project description');

    // Select a template
    await page.click(`text=${TEMPLATE_TYPES.BUSINESS}`);

    // Add tags
    const tagInput = page.getByPlaceholder('Type a tag and press Enter');
    await tagInput.fill('camera');
    await tagInput.press('Enter');
    await tagInput.fill('audio');
    await tagInput.press('Enter');

    // Verify tags were added
    await expect(page.getByText('camera')).toBeVisible();
    await expect(page.getByText('audio')).toBeVisible();

    // Submit the form
    await page.click('button:has-text("Continue")');

    // Verify form submission (this will need to be updated based on the actual behavior)
    // For now, we're just checking the form was submitted without validation errors
    await expect(page.getByText('Title is required')).not.toBeVisible();
    await expect(page.getByText('Please select a template')).not.toBeVisible();
  });

  test('displays validation errors', async ({ page }) => {
    // Try to submit without filling any fields
    await page.click('button:has-text("Continue")');

    // Verify validation errors
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Please select a template')).toBeVisible();
  });

  test('enforces title length limit', async ({ page }) => {
    // Fill in a title that's too long (101 characters)
    const longTitle = 'a'.repeat(101);
    await page.fill('input[id="title"]', longTitle);

    // Submit the form
    await page.click('button:has-text("Continue")');

    // Verify error message
    await expect(page.getByText('Title must be less than 100 characters')).toBeVisible();
  });

  test('enforces description length limit', async ({ page }) => {
    // Fill in a description that's too long (501 characters)
    const longDescription = 'a'.repeat(501);
    await page.fill('input[id="description"]', longDescription);

    // Submit the form
    await page.click('button:has-text("Continue")');

    // Verify error message
    await expect(page.getByText('Description must be less than 500 characters')).toBeVisible();
  });

  test('enforces maximum tag limit', async ({ page }) => {
    const tags = ['camera', 'audio', 'light', 'streaming', 'editing'];
    const tagInput = page.getByPlaceholder('Type a tag and press Enter');

    // Add maximum number of tags
    for (const tag of tags) {
      await tagInput.fill(tag);
      await tagInput.press('Enter');
    }

    // Verify tag input is no longer visible
    await expect(tagInput).not.toBeVisible();

    // Verify all tags are visible
    for (const tag of tags) {
      await expect(page.getByText(tag)).toBeVisible();
    }
  });

  test('allows tag removal', async ({ page }) => {
    const tagInput = page.getByPlaceholder('Type a tag and press Enter');

    // Add a tag
    await tagInput.fill('camera');
    await tagInput.press('Enter');

    // Verify tag was added
    await expect(page.getByText('camera')).toBeVisible();

    // Remove the tag
    await page.click('button[aria-label="Remove camera tag"]');

    // Verify tag was removed
    await expect(page.getByText('camera')).not.toBeVisible();
  });

  test('template selection updates visual state', async ({ page }) => {
    // Click on a template
    await page.click(`text=${TEMPLATE_TYPES.BUSINESS}`);

    // Verify the selected template has the correct styling
    const selectedButton = page.locator(`button:has-text("${TEMPLATE_TYPES.BUSINESS}")`);
    await expect(selectedButton).toHaveClass(/ring-2/);
    await expect(selectedButton).toHaveClass(/ring-primary/);
  });
});