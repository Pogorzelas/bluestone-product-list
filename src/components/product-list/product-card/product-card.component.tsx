import type { ProductCardProps } from '@/components/product-card/product-card.types.ts'

const ProductCard = ({ images, number, name, description }: ProductCardProps) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
    {images.length > 0 && (
      <img src={images[0].url} alt={images[0].name} className="w-full h-48 rounded-t-lg" />
    )}
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="text-2xl font-semibold leading-none tracking-tight">{number}</div>
      <div className="text-sm text-muted-foreground">{name}</div>
    </div>
    <div className="p-6 pt-0 flex-grow">
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
)

export default ProductCard
