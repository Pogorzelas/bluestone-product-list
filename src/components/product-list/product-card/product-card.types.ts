import type { Product } from '../product-list.types.ts'

type ProductCardProps = {
  product: Product
  onEdit: (data: Product) => void
}

export type { ProductCardProps }
