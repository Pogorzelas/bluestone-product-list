import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mockProduct, mockProducts } from '@/components/product-list/product-list.fixtures.ts'
import ProductCard from './product-card.component'

describe('ProductCard', () => {
  it('should display image when product has images', () => {
    const onEdit = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    const image = screen.getByRole('img')
    expect(image).toBeVisible()
  })

  it('should not display image when product has no images', () => {
    const onEdit = vi.fn()
    const productWithoutImages = mockProducts[1]

    render(<ProductCard product={productWithoutImages} onEdit={onEdit} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should open dialog when edit button is clicked', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    const editButton = screen.getByRole('button', { name: /edit/i })
    await user.click(editButton)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })
  })

  it('should close dialog when close button is clicked', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const closeButton = screen.getByRole('button', { name: /close/i })

    await user.click(closeButton)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should call onEdit and close dialog when form is submitted', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })

    await user.click(saveButton)

    expect(onEdit).toHaveBeenCalled()

    const submittedData = onEdit.mock.calls[0][0]

    expect(submittedData.name).toBe('Modified Name')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should not call onEdit when dialog is closed without submitting', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const closeButton = screen.getByRole('button', { name: /close/i })

    await user.click(closeButton)

    expect(onEdit).not.toHaveBeenCalled()
  })

  it('should display error message when onEdit throws an error', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn(() => {
      throw new Error('Unable to save. Please reduce the amount of data or clear existing storage.')
    })

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    expect(onEdit).toHaveBeenCalled()
    expect(screen.getByText(/error/i)).toBeVisible()
    expect(
      screen.getByText(
        /unable to save\. please reduce the amount of data or clear existing storage\./i,
      ),
    ).toBeVisible()
  })

  it('should keep dialog open when error occurs', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn(() => {
      throw new Error('Test error')
    })

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })
  })

  it('should clear error message when dialog is closed', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn(() => {
      throw new Error('Test error')
    })

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    expect(screen.getByText(/test error/i)).toBeVisible()

    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    expect(screen.queryByText(/test error/i)).not.toBeInTheDocument()
  })

  it('should clear error message on successful submit after previous error', async () => {
    const user = userEvent.setup()
    let shouldFail = true
    const onEdit = vi.fn(() => {
      if (shouldFail) {
        throw new Error('Test error')
      }
    })

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    expect(screen.getByText(/test error/i)).toBeVisible()

    shouldFail = false
    await user.clear(nameInput)
    await user.type(nameInput, 'Another Name')
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should display generic error message for non-Error exceptions', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn(() => {
      throw 'String error'
    })

    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')

    const saveButton = screen.getByRole('button', { name: /save/i })
    await user.click(saveButton)

    expect(screen.getByText(/an unexpected error occurred/i)).toBeVisible()
  })
})
