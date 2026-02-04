import type { Product } from '@/components/product-list/product-list.types.ts'

export const mockProduct: Product = {
  name: 'Test Product',
  number: 'TEST-001',
  description: 'This is a test product description',
  images: [
    { name: 'Product Image 1', url: 'https://example.com/image1.jpg' },
    { name: 'Product Image 2', url: 'https://example.com/image2.jpg' },
  ],
}

export const mockProducts: Product[] = [
  {
    name: 'Laptop',
    number: 'TECH-001',
    description: 'High-performance laptop for developers',
    images: [{ name: 'Laptop Front', url: 'https://example.com/laptop.jpg' }],
  },
  {
    name: 'USB Cable',
    number: 'ACC-003',
    description: 'USB-C to USB-A cable',
    images: [],
  },
]
