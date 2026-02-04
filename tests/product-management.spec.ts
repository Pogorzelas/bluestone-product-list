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

  test('should open edit dialog when clicking a product card', async ({ page }) => {
    // Wait for products to load
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    // Click the edit button on first product
    const firstProduct = page.getByTestId('product-card').first()
    await firstProduct.getByTestId('product-edit-button').click()

    // Verify dialog is open
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Verify dialog has form fields
    await expect(dialog.getByLabel('Product Name')).toBeVisible()
    await expect(dialog.getByLabel('Product Number')).toBeVisible()
    await expect(dialog.getByLabel('Product Description')).toBeVisible()
  })

  test('should update product and reflect changes in the list', async ({ page }) => {
    // Wait for products to load
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    // Get the first product's original number
    const firstProduct = page.getByTestId('product-card').first()
    const originalNumber = await firstProduct.getByTestId('product-number').textContent()

    // Open edit dialog
    await firstProduct.getByTestId('product-edit-button').click()

    // Fill in new product name
    const dialog = page.getByRole('dialog')
    const nameInput = dialog.getByLabel('Product Name')
    await nameInput.clear()
    await nameInput.fill('Updated Product Name')

    // Submit form
    await dialog.getByTestId('product-form-submit').click()

    // Wait for dialog to close
    await expect(dialog).not.toBeVisible()

    // Verify the product name was updated (number should stay same)
    const updatedProduct = page.getByTestId('product-card').first()
    await expect(updatedProduct.getByTestId('product-number')).toHaveText(originalNumber || '')
    await expect(updatedProduct).toContainText('Updated Product Name')
  })
})
