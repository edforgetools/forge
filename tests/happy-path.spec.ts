import { test, expect } from '@playwright/test'
test('landing renders', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page.getByText('Forge')).toBeVisible()
})
