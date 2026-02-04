import { useState } from 'react'
import type { CarouselImageProps } from './carousel-image.types'
import CarouselImagePlaceholder from './carousel-image-placeholder'

const CarouselImage = ({ url, alt }: CarouselImageProps) => {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex-[0_0_100%] min-w-0">
      {hasError ? (
        <CarouselImagePlaceholder />
      ) : (
        <img
          src={url}
          alt={alt}
          className="w-full h-64 object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

export default CarouselImage
