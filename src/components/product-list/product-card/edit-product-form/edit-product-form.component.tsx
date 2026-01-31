import { FormProvider, useForm } from 'react-hook-form'
import type { Product } from '../../product-list.types.ts'
import type { EditProductFormProps } from './edit-product-form.types.ts'

const EditProductForm = ({ defaultValues, onSubmit }: EditProductFormProps) => {
  const formMethods = useForm<Product>({
    defaultValues,
  })
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
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
