import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextInput from './text-input.component'

describe('TextInput', () => {
  it('should associate label with input using name prop', () => {
    render(<TextInput name="test-input" label="Test Label" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'test-input')
    expect(input).toHaveAttribute('name', 'test-input')
  })

  it('should display error message when provided', () => {
    render(
      <TextInput name="productName" label="Product Name" errorMessage="This field is required" />,
    )

    expect(screen.getByText('This field is required')).toBeVisible()
  })

  it('should apply error styling when error message is provided', () => {
    render(<TextInput name="productName" label="Product Name" errorMessage="Error" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
  })

  it('should not display error message when not provided', () => {
    const { container } = render(<TextInput name="productName" label="Product Name" />)

    const errorElement = container.querySelector('#productName-error')
    expect(errorElement).toHaveClass('invisible')
  })
})
