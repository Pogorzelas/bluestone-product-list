import { expect, test } from '@playwright/test'

test.describe('Product Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should display the product list with default products', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    const productCards = page.getByTestId('product-card')
    await expect(productCards).toHaveCount(3)
  })

  test('should open edit dialog when clicking a product card', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    const firstProduct = page.getByTestId('product-card').first()
    await firstProduct.getByTestId('product-edit-button').click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await expect(dialog.getByLabel('Product Name')).toBeVisible()
    await expect(dialog.getByLabel('Product Number')).toBeVisible()
    await expect(dialog.getByLabel('Product Description')).toBeVisible()
  })

  test('should update product and reflect changes in the list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    const firstProduct = page.getByTestId('product-card').first()
    const originalNumber = await firstProduct.getByTestId('product-number').textContent()

    await firstProduct.getByTestId('product-edit-button').click()

    const dialog = page.getByRole('dialog')
    const nameInput = dialog.getByLabel('Product Name')
    await nameInput.clear()
    await nameInput.fill('Updated Product Name')

    await dialog.getByTestId('product-form-submit').click()

    await expect(dialog).not.toBeVisible()

    const updatedProduct = page.getByTestId('product-card').first()
    await expect(updatedProduct.getByTestId('product-number')).toHaveText(originalNumber || '')
    await expect(updatedProduct).toContainText('Updated Product Name')
  })
})
