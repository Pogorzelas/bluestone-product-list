import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockProducts } from '@/components/product-list/product-list.fixtures.ts'
import { setupLocalStorageMock } from '@/test/utils/setupLocalStorageMock.ts'
import ProductList from './product-list.component'

describe('ProductList', () => {
  beforeEach(() => {
    const localStorageMock = setupLocalStorageMock()
    vi.stubGlobal('localStorage', localStorageMock)

    localStorage.setItem('product-list', JSON.stringify(mockProducts))
  })

  it('should render all products from localStorage', () => {
    render(<ProductList />)

    expect(screen.getByText(mockProducts[0].name)).toBeVisible()
    expect(screen.getByText(mockProducts[1].name)).toBeVisible()
  })

  it('should update product in list when form is submitted', async () => {
    const user = userEvent.setup()

    render(<ProductList />)

    const editButtons = screen.getAllByRole('button', { name: /edit/i })

    await user.click(editButtons[0])
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    const nameInput = screen.getByLabelText(/product name/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Laptop Name')
    await user.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => {
      expect(screen.getByText('Updated Laptop Name')).toBeVisible()
      expect(screen.queryByText(mockProducts[0].name)).not.toBeInTheDocument()
      expect(screen.getByText(mockProducts[1].name)).toBeVisible()
    })
  })
})
