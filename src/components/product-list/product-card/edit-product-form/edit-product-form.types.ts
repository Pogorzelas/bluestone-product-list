import type { Product } from '../../product-list.types'

type EditProductFormProps = {
  defaultValues: Product
  onSubmit: (data: Product) => void
}

export type { EditProductFormProps }
