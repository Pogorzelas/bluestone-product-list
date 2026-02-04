import { useState } from 'react'
import { PRODUCT_LIST } from '@/components/product-list/product-list.constant.ts'
import type { Product } from '@/components/product-list/product-list.types.ts'

const STORAGE_KEY = 'product-list'

const useProductList = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY)
      return item ? JSON.parse(item) : PRODUCT_LIST
    } catch (error) {
      console.error(`Error reading localStorage key "${STORAGE_KEY}":`, error)
      return PRODUCT_LIST
    }
  })

  const setProduct = (index: number) => (product: Product) => {
    const updatedProducts = [...products]
    updatedProducts[index] = product

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
    } catch (error) {
      const isMaximumSizeExceeded =
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' ||
          // Safari / iOS
          error.name === 'NS_ERROR_DOM_QUOTA_REACHED')

      if (isMaximumSizeExceeded) {
        throw new Error(
          'Unable to save. Please reduce the amount of data or clear existing storage.',
        )
      }

      throw new Error('Unexpected error occurred.')
    }
  }

  return [products, setProduct] as const
}

export { useProductList }
