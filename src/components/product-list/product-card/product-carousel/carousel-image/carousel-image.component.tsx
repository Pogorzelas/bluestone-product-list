import { useState } from 'react'
import type { ProductImage } from '@/components/product-list/product-list.types.ts'
import CarouselImagePlaceholder from './carousel-image-placeholder'

const CarouselImage = ({ url, name }: ProductImage) => {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex-[0_0_100%] min-w-0">
      {hasError ? (
        <CarouselImagePlaceholder />
      ) : (
        <img
          src={url}
          alt={name}
          className="w-full h-64 object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

export default CarouselImage
