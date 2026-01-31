type ProductImage = {
  url: string
  name: string
}

type Product = {
  name: string
  number: string
  description: string
  images: ProductImage[]
}

export type { Product }
