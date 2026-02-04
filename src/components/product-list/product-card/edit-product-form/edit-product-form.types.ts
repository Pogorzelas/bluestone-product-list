import type { ReactNode } from 'react'
import type { Product } from '../../product-list.types'

type EditProductFormProps = {
  defaultValues: Product
  onSubmit: (data: Product) => void
  children?: ReactNode
}

export type { EditProductFormProps }
