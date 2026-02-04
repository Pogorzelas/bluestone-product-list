import useEmblaCarousel from 'embla-carousel-react'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CarouselImage from './carousel-image'
import type { ProductCarouselProps } from './product-carousel.types'

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const imagesWithIds = useMemo(
    () =>
      images.map((image) => ({
        ...image,
        id: nanoid(),
      })),
    [images],
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return
    }

    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative overflow-hidden rounded-t-xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {imagesWithIds.map((image) => (
            <CarouselImage key={image.id} url={image.url} name={image.name} />
          ))}
        </div>
      </div>
      {imagesWithIds.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {imagesWithIds.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCarousel
