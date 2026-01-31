type ProductImage = {
  url: string
  name: string
}

type ProductCardProps = {
  name: string
  number: string
  description: string
  images: ProductImage[]
}

export type { ProductCardProps }
