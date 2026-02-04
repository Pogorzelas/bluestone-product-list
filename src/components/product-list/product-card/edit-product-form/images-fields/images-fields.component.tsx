import { useFieldArray } from 'react-hook-form'
import type { Product } from '@/components/product-list/product-list.types.ts'
import TextInputController from '../text-input-controller'

const ImagesFields = () => {
  const { fields, append, remove } = useFieldArray<Product, 'images'>({
    name: 'images',
  })

  return (
    <div className="flex flex-col">
      <span className="block text-xs uppercase tracking-wider text-gray-600 mb-3">
        Product Images
      </span>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 p-5 border border-gray-200 rounded-lg bg-gray-50/30"
          >
            <div className="flex-1 space-y-4">
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
              className="self-start w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-all flex-shrink-0"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ name: '', url: '' })}
        className="mt-4 self-start px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
      >
        + Add Image
      </button>
    </div>
  )
}

export default ImagesFields
