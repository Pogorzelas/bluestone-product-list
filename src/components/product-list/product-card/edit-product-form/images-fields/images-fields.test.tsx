import { zodResolver } from '@hookform/resolvers/zod'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { productSchema } from '@/components/product-list/product-card/edit-product-form/edit-product-form.schema.ts'
import type { Product } from '@/components/product-list/product-list.types.ts'
import ImagesFields from './images-fields.component'

const TestWrapper = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: Product
  onSubmit: () => void
}) => {
  const formMethods = useForm<Product>({
    defaultValues,
    resolver: zodResolver(productSchema),
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ImagesFields />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

describe('ImagesFields', () => {
  const mockProduct: Product = {
    name: 'Test Product',
    number: 'TEST-001',
    description: 'Test Description',
    images: [
      {
        name: 'Image 1',
        url: 'https://example.com/image1.jpg',
      },
    ],
  }

  it('should display validation error for invalid URL', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TestWrapper defaultValues={mockProduct} onSubmit={onSubmit} />)

    const urlInput = screen.getByLabelText(/image url/i)
    await user.clear(urlInput)
    await user.type(urlInput, 'not-a-valid-url')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeVisible()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should allow valid URL to be submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TestWrapper defaultValues={mockProduct} onSubmit={onSubmit} />)

    const urlInput = screen.getByLabelText(/image url/i)
    await user.clear(urlInput)
    await user.type(urlInput, 'https://example.com/new-image.jpg')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  it('should add new image field when add button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TestWrapper defaultValues={mockProduct} onSubmit={onSubmit} />)

    const addButton = screen.getByRole('button', { name: /add image/i })
    await user.click(addButton)

    const urlInputs = screen.getAllByLabelText(/image url/i)
    expect(urlInputs).toHaveLength(2)
  })

  it('should remove image field when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TestWrapper defaultValues={mockProduct} onSubmit={onSubmit} />)

    const removeButton = screen.getByRole('button', { name: /remove/i })
    await user.click(removeButton)

    expect(screen.queryByLabelText(/image url/i)).not.toBeInTheDocument()
  })

  it('should display validation error for empty URL when field is added', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TestWrapper defaultValues={mockProduct} onSubmit={onSubmit} />)

    const addButton = screen.getByRole('button', { name: /add image/i })
    await user.click(addButton)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeVisible()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
