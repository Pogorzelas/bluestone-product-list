import { useState } from 'react'
import type { Product } from '../product-list.types.ts'
import Dialog from './dialog'
import EditProductForm from './edit-product-form'
import ErrorMessage from './error-message'
import type { ProductCardProps } from './product-card.types.ts'

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const image = product.images[0]

  const handleSubmit = (newProduct: Product) => {
    try {
      setErrorMessage('')
      onEdit(newProduct)
      setIsOpen(false)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  const handleOpenChange = (newOpenState: boolean) => {
    setIsOpen(newOpenState)

    if (!newOpenState) {
      setErrorMessage('')
    }
  }

  return (
    <div
      className="rounded-xl bg-white flex flex-col border border-gray-200 shadow-md"
      data-testid="product-card"
    >
      {image && (
        <img src={image.url} alt={image.name} className="w-full h-64 object-cover rounded-t-xl" />
      )}
      <div className="flex flex-col space-y-1.5 p-8">
        <div
          className="text-xl font-bold text-gray-900 mb-2 leading-none"
          data-testid="product-number"
        >
          {product.number}
        </div>
        <div className="text-base font-medium text-gray-700">{product.name}</div>
      </div>
      <div className="px-8 pb-6 pt-4 flex-grow">
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>
      <div className="flex items-center px-8 pb-8 pt-0">
        <Dialog
          trigger={
            <button
              type="button"
              className="px-6 py-2.5 border border-black text-black bg-transparent rounded-lg hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium uppercase tracking-wider"
              data-testid="product-edit-button"
            >
              Edit
            </button>
          }
          title="Edit Product"
          open={isOpen}
          onOpenChange={handleOpenChange}
        >
          <EditProductForm defaultValues={product} onSubmit={handleSubmit} />
          <ErrorMessage message={errorMessage} />
        </Dialog>
      </div>
    </div>
  )
}

export default ProductCard
