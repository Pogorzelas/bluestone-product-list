import ProductCard from './product-card'
import { useProductList } from './product-list.hooks'

const ProductList = () => {
  const [products, setProduct] = useProductList()

  return (
    <div className="container mx-auto p-6 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex flex-col gap-6">
        {products.map((product, index) => (
          <ProductCard
            // biome-ignore lint/suspicious/noArrayIndexKey: the list is static and items are never added, removed, or reordered. If this ever changes, generate a stable id for each item.
            key={index}
            product={product}
            onEdit={setProduct(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
