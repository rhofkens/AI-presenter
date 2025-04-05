import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Create New Video Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create');
  });

  test('shows initial disabled state', async ({ page }) => {
    // Check form elements are disabled initially
    await expect(page.getByLabel('Project Title')).toBeDisabled();
    await expect(page.getByLabel('Description')).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Upload a presentation first' })).toBeDisabled();
    
    // Check initial slides message
    await expect(page.getByText('Upload a presentation to see slides')).toBeVisible();
  });

  test('handles file upload and enables form', async ({ page }) => {
    // Create a test file path
    const testFile = path.join(__dirname, '../src/test/fixtures/test.pptx');

    // Upload file
    const dropzone = page.getByTestId('dropzone');
    await dropzone.setInputFiles(testFile);

    // Check loading state
    await expect(page.getByText('Uploading...')).toBeVisible();

    // Wait for upload success message
    await expect(page.getByText('File uploaded successfully')).toBeVisible();

    // Check form is enabled
    await expect(page.getByLabel('Project Title')).toBeEnabled();
    await expect(page.getByLabel('Description')).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();

    // Check slides are displayed
    await expect(page.getByText('Slide 1')).toBeVisible();
  });

  test('handles invalid file upload', async ({ page }) => {
    // Create an invalid test file
    const invalidFile = path.join(__dirname, '../src/test/fixtures/invalid.txt');

    // Try to upload invalid file
    const dropzone = page.getByTestId('dropzone');
    await dropzone.setInputFiles(invalidFile);

    // Check error message
    await expect(page.getByText('Only PowerPoint files (PPT/PPTX) are allowed')).toBeVisible();

    // Form should remain disabled
    await expect(page.getByLabel('Project Title')).toBeDisabled();
  });

  test('completes full form submission flow', async ({ page }) => {
    // Upload valid file
    const testFile = path.join(__dirname, '../src/test/fixtures/test.pptx');
    const dropzone = page.getByTestId('dropzone');
    await dropzone.setInputFiles(testFile);

    // Wait for upload success
    await expect(page.getByText('File uploaded successfully')).toBeVisible();

    // Fill form
    await page.getByLabel('Project Title').fill('Test Video Project');
    await page.getByLabel('Description').fill('This is a test video project');
    await page.getByText('Business').click();

    // Add tags
    const tagInput = page.getByPlaceholder('Type a tag and press Enter');
    await tagInput.fill('camera');
    await tagInput.press('Enter');
    await tagInput.fill('editing');
    await tagInput.press('Enter');

    // Submit form
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check success message
    await expect(page.getByText('Project created successfully')).toBeVisible();
  });

  test('handles form validation', async ({ page }) => {
    // Upload valid file first
    const testFile = path.join(__dirname, '../src/test/fixtures/test.pptx');
    const dropzone = page.getByTestId('dropzone');
    await dropzone.setInputFiles(testFile);

    // Wait for upload success
    await expect(page.getByText('File uploaded successfully')).toBeVisible();

    // Try to submit without required fields
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check validation messages
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Please select a template')).toBeVisible();

    // Fill required fields
    await page.getByLabel('Project Title').fill('Test Video');
    await page.getByText('Business').click();

    // Submit again
    await page.getByRole('button', { name: 'Continue' }).click();

    // Should succeed now
    await expect(page.getByText('Project created successfully')).toBeVisible();
  });

  test('handles responsive layout', async ({ page }) => {
    // Test desktop layout
    await expect(page.locator('.grid-cols-1.lg\\:grid-cols-2')).toBeVisible();

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.grid-cols-1')).toBeVisible();
  });
});