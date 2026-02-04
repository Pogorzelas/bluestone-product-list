import { z } from 'zod'

const productImageSchema = z.object({
  url: z.url({ message: 'Please enter a valid URL' }),
  name: z.string(),
})

const productSchema = z.object({
  name: z.string(),
  number: z.string(),
  description: z.string(),
  images: z.array(productImageSchema),
})

export { productSchema }
