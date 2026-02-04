import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mockProduct } from '@/components/product-list/product-list.fixtures.ts'
import EditProductForm from './edit-product-form.component'

describe('EditProductForm', () => {
  it('should render form with default values', () => {
    const onSubmit = vi.fn()

    render(<EditProductForm defaultValues={mockProduct} onSubmit={onSubmit} />)

    expect(screen.getByLabelText(/product name/i)).toHaveValue(mockProduct.name)
    expect(screen.getByLabelText(/product number/i)).toHaveValue(mockProduct.number)
    expect(screen.getByLabelText(/product description/i)).toHaveValue(mockProduct.description)

    const imageUrlInputs = screen.getAllByLabelText(/image url/i)
    expect(imageUrlInputs).toHaveLength(2)
    expect(imageUrlInputs[0]).toHaveValue(mockProduct.images[0].url)
    expect(imageUrlInputs[1]).toHaveValue(mockProduct.images[1].url)
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<EditProductForm defaultValues={mockProduct} onSubmit={onSubmit} />)

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Product')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Updated Product',
          number: mockProduct.number,
          description: mockProduct.description,
        }),
        expect.anything(),
      )
    })
  })

  it('should display validation error for invalid image URL', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<EditProductForm defaultValues={mockProduct} onSubmit={onSubmit} />)

    const imageUrlInputs = screen.getAllByLabelText(/image url/i)
    await user.clear(imageUrlInputs[0])
    await user.type(imageUrlInputs[0], 'not-a-valid-url')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeVisible()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should handle empty images array', () => {
    const onSubmit = vi.fn()
    const productWithoutImages = { ...mockProduct, images: [] }

    render(<EditProductForm defaultValues={productWithoutImages} onSubmit={onSubmit} />)

    expect(screen.queryByLabelText(/image url/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add image/i })).toBeVisible()
  })

  it('should add new image field when add button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<EditProductForm defaultValues={mockProduct} onSubmit={onSubmit} />)

    const initialImageUrlInputs = screen.getAllByLabelText(/image url/i)
    expect(initialImageUrlInputs).toHaveLength(2)

    const addButton = screen.getByRole('button', { name: /add image/i })
    await user.click(addButton)

    const updatedImageUrlInputs = screen.getAllByLabelText(/image url/i)
    expect(updatedImageUrlInputs).toHaveLength(3)
  })

  it('should remove image field when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<EditProductForm defaultValues={mockProduct} onSubmit={onSubmit} />)

    const initialImageUrlInputs = screen.getAllByLabelText(/image url/i)
    expect(initialImageUrlInputs).toHaveLength(2)

    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await user.click(removeButtons[0])

    const updatedImageUrlInputs = screen.getAllByLabelText(/image url/i)
    expect(updatedImageUrlInputs).toHaveLength(1)
  })
})
