import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextareaInput from './textarea-input.component'

describe('TextareaInput', () => {
  it('should associate label with textarea using name prop', () => {
    render(<TextareaInput name="test-textarea" label="Test Label" />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('id', 'test-textarea')
    expect(textarea).toHaveAttribute('name', 'test-textarea')
  })

  it('should display error message when provided', () => {
    render(
      <TextareaInput
        name="description"
        label="Description"
        errorMessage="This field is required"
      />,
    )

    expect(screen.getByText('This field is required')).toBeVisible()
  })

  it('should apply error styling when error message is provided', () => {
    render(<TextareaInput name="description" label="Description" errorMessage="Error" />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('border-red-500')
  })

  it('should not display error message when not provided', () => {
    const { container } = render(<TextareaInput name="description" label="Description" />)

    const errorElement = container.querySelector('#description-error')
    expect(errorElement).toHaveClass('invisible')
  })
})
