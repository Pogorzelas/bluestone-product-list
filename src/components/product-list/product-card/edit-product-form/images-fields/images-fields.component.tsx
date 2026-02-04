import { useFieldArray } from 'react-hook-form'
import type { Product } from '@/components/product-list/product-list.types.ts'
import TextInputController from '../text-input-controller'

const ImagesFields = () => {
  const { fields, append, remove } = useFieldArray<Product, 'images'>({
    name: 'images',
  })

  return (
    <div className="flex flex-col gap-2">
      <span className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
        Product Images
      </span>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 p-4 border border-gray-200 rounded-lg bg-white">
            <div className="flex-1 space-y-2">
              <TextInputController<Product>
                name={`images.${index}.name`}
                label="Image Name"
                placeholder="Enter image name"
              />
              <TextInputController<Product>
                name={`images.${index}.url`}
                label="Image URL"
                placeholder="Enter image URL"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="self-start px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ name: '', url: '' })}
        className="self-start px-4 py-2 text-sm text-black hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
      >
        + Add Image
      </button>
    </div>
  )
}

export default ImagesFields
