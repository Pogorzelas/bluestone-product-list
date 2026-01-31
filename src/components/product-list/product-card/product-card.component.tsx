import { useState } from 'react'
import Dialog from '@/components/product-list/product-card/dialog'
import EditProductForm from '@/components/product-list/product-card/edit-product-form'
import type { ProductCardProps } from '@/components/product-list/product-card/product-card.types.ts'

const ProductCard = ({ images, number, name, description }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
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
      <div className="flex items-center p-6 pt-0">
        <Dialog
          trigger={
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          }
          title="Edit Product"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <EditProductForm
            defaultValues={{
              name,
              description,
              number,
              images,
            }}
            onSubmit={() => {}}
          />
        </Dialog>
      </div>
    </div>
  )
}

export default ProductCard
