import { useFieldArray } from 'react-hook-form'
import type { Product } from '@/components/product-list/product-list.types.ts'
import TextInputController from '../text-input-controller'

const ImageArrayController = () => {
  const { fields, append, remove } = useFieldArray<Product, 'images'>({
    name: 'images',
  })

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">Product Images</span>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-2 p-3 border border-gray-200 rounded-md bg-gray-50"
          >
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
              className="self-start px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ name: '', url: '' })}
        className="self-start px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-300 rounded transition-colors"
      >
        + Add Image
      </button>
    </div>
  )
}

export default ImageArrayController
