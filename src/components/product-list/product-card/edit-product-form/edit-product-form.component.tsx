import { FormProvider, useForm } from 'react-hook-form'
import TextareaInputController from '@/components/product-list/product-card/edit-product-form/textarea-input-controller'
import type { Product } from '../../product-list.types.ts'
import type { EditProductFormProps } from './edit-product-form.types.ts'
import TextInputController from './text-input-controller'

const EditProductForm = ({ defaultValues, onSubmit }: EditProductFormProps) => {
  const formMethods = useForm<Product>({
    defaultValues,
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-1">
        <TextInputController<Product>
          name="name"
          label="Product Name"
          placeholder="Enter product name"
        />
        <TextInputController<Product>
          name="number"
          label="Product Number"
          placeholder="Enter product number"
        />
        <TextareaInputController<Product> name="description" label="Product Description" />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Save
        </button>
      </form>
    </FormProvider>
  )
}

export default EditProductForm
