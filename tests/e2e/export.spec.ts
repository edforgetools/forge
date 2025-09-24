// @ts-check
import { test, expect } from '@playwright/test';

test('loads app and shows Export control', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Forge/i);
  const exportButton = page.getByRole('button', { name: /export/i });
  await expect(exportButton).toBeVisible();
});