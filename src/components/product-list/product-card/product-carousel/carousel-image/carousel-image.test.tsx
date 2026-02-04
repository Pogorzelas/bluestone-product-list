import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CarouselImage from './carousel-image.component'

describe('CarouselImage', () => {
  it('should render image when image is loaded successfully', () => {
    const image = { name: 'Test Image', url: 'https://example.com/test.jpg' }

    render(<CarouselImage {...image} />)

    const img = screen.getByRole('img')
    expect(img).toBeVisible()
  })

  it('should render placeholder when image fails to load', () => {
    const image = { name: 'Broken Image', url: 'https://example.com/broken.jpg' }

    render(<CarouselImage {...image} />)

    const img = screen.getByRole('img')

    fireEvent.error(img)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
