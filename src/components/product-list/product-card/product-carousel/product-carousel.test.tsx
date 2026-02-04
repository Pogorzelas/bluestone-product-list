import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductCarousel from './product-carousel.component'

describe('ProductCarousel', () => {
  it('should render single image without navigation dots', () => {
    const images = [{ name: 'Image 1', url: 'https://example.com/image1.jpg' }]

    render(<ProductCarousel images={images} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
    expect(image).toHaveAttribute('alt', 'Image 1')

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render multiple images with navigation dots', () => {
    const images = [
      { name: 'Image 1', url: 'https://example.com/image1.jpg' },
      { name: 'Image 2', url: 'https://example.com/image2.jpg' },
      { name: 'Image 3', url: 'https://example.com/image3.jpg' },
    ]

    render(<ProductCarousel images={images} />)

    const allImages = screen.getAllByRole('img')
    expect(allImages).toHaveLength(3)

    // Navigation dots should be present
    const dots = screen.getAllByRole('button')
    expect(dots).toHaveLength(3)
  })
})
