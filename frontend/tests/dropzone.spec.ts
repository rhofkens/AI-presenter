import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('DropZone Component', () => {
  const testFilesDir = path.join(__dirname, 'fixtures');
  const testPptxPath = path.join(testFilesDir, 'test.pptx');
  const testPdfPath = path.join(testFilesDir, 'test.pdf');

  test.beforeAll(async () => {
    // Create test files directory if it doesn't exist
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir, { recursive: true });
    }

    // Create a dummy PPTX file
    const pptxBuffer = Buffer.from([
      0x50, 0x4B, 0x03, 0x04, // PPTX file signature
      0x14, 0x00, 0x06, 0x00,
    ]);
    fs.writeFileSync(testPptxPath, pptxBuffer);

    // Create a dummy PDF file
    const pdfBuffer = Buffer.from([
      0x25, 0x50, 0x44, 0x46, // PDF file signature
    ]);
    fs.writeFileSync(testPdfPath, pdfBuffer);
  });

  test.afterAll(async () => {
    // Clean up test files
    if (fs.existsSync(testFilesDir)) {
      fs.rmSync(testFilesDir, { recursive: true, force: true });
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/create');
  });

  test('displays initial state correctly', async ({ page }) => {
    const dropzone = page.getByTestId('dropzone');
    await expect(dropzone).toBeVisible();
    await expect(page.getByText(/Drag and drop your PowerPoint presentation here/)).toBeVisible();
    await expect(page.getByText(/PPT or PPTX files up to 50MB/)).toBeVisible();
  });

  test('shows error for invalid file type', async ({ page }) => {
    // Set up file input for the drop zone
    await page.setInputFiles('input[type="file"]', testPdfPath);

    // Check error message
    await expect(page.getByText(/Only PowerPoint files \(PPT\/PPTX\) are allowed/)).toBeVisible();
  });

  test('accepts valid PPTX file', async ({ page }) => {
    // Set up file input for the drop zone
    await page.setInputFiles('input[type="file"]', testPptxPath);

    // Check that no error message is shown
    await expect(page.getByText(/Only PowerPoint files \(PPT\/PPTX\) are allowed/)).not.toBeVisible();
  });

  test('shows loading state', async ({ page }) => {
    // Trigger loading state
    await page.evaluate(() => {
      const dropzone = document.querySelector('[data-testid="dropzone"]');
      if (dropzone) {
        dropzone.setAttribute('data-loading', 'true');
      }
    });

    await expect(page.getByText(/Uploading.../)).toBeVisible();
  });

  test('handles drag events', async ({ page }) => {
    const dropzone = page.getByTestId('dropzone');

    // Test dragenter
    await dropzone.dispatchEvent('dragenter', {});
    await expect(dropzone).toHaveClass(/border-primary/);

    // Test dragleave
    await dropzone.dispatchEvent('dragleave', {});
    await expect(dropzone).not.toHaveClass(/border-primary/);
  });
});