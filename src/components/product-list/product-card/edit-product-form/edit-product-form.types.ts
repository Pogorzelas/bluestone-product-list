type ProductFormData = {
  name: string
  number: string
  description: string
  images: {
    url: string
    name: string
  }[]
}

type EditProductFormProps = {
  defaultValues: ProductFormData
  onSubmit: (data: ProductFormData) => void
}

export type { ProductFormData, EditProductFormProps }
