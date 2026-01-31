import ProductCard from '@/components/product-list/product-card'
import { PRODUCT_LIST } from '@/components/product-list/product-list.constant.ts'

const ProductList = () => {
  return (
    <div className="container mx-auto p-6 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex flex-col gap-6">
        {PRODUCT_LIST.map((product) => (
          <ProductCard
            key={product.name}
            images={product.images}
            name={product.name}
            description={product.description}
            number={product.number}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
