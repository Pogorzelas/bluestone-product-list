import { useLocalStorage } from '@uidotdev/usehooks'
import ProductCard from './product-card'
import { PRODUCT_LIST } from './product-list.constant.ts'
import type { Product } from './product-list.types.ts'

const ProductList = () => {
  const [products, setProducts] = useLocalStorage('product-list', PRODUCT_LIST)

  const handleEdit = (index: number) => (product: Product) => {
    setProducts((previousProducts) => {
      const updatedProducts = [...previousProducts]

      updatedProducts[index] = product

      return updatedProducts
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex flex-col gap-6">
        {products.map((product, index) => (
          <ProductCard
            // biome-ignore lint/suspicious/noArrayIndexKey: the list is static and items are never added, removed, or reordered. If this ever changes, generate a stable id for each item.
            key={index}
            product={product}
            onEdit={handleEdit(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
