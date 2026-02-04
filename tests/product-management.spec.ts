import { expect, test } from '@playwright/test'

test.describe('Product Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should display the product list with default products', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    // Count product cards
    const productCards = page.getByTestId('product-card')
    await expect(productCards).toHaveCount(3)
  })
})
