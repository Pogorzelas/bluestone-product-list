import { useState } from 'react'
import type { Product } from '../product-list.types.ts'
import Dialog from './dialog'
import EditProductForm from './edit-product-form'
import type { ProductCardProps } from './product-card.types.ts'

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const image = product.images[0]

  const handleSubmit = (newProduct: Product) => {
    onEdit(newProduct)
    setIsOpen(false)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
      {image && <img src={image.url} alt={image.name} className="w-full h-48 rounded-t-lg" />}
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-2xl font-semibold leading-none tracking-tight">{product.number}</div>
        <div className="text-sm text-muted-foreground">{product.name}</div>
      </div>
      <div className="p-6 pt-0 flex-grow">
        <p className="text-gray-700">{product.description}</p>
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
          <EditProductForm defaultValues={product} onSubmit={handleSubmit} />
        </Dialog>
      </div>
    </div>
  )
}

export default ProductCard
