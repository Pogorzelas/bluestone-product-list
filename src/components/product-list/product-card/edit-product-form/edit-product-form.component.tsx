import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import TextareaInputController from '@/components/product-list/product-card/edit-product-form/textarea-input-controller'
import type { Product } from '../../product-list.types.ts'
import { productSchema } from './edit-product-form.schema.ts'
import type { EditProductFormProps } from './edit-product-form.types.ts'
import ImagesFields from './images-fields'
import TextInputController from './text-input-controller'

const EditProductForm = ({ defaultValues, onSubmit, children }: EditProductFormProps) => {
  const formMethods = useForm<Product>({
    defaultValues,
    resolver: zodResolver(productSchema),
    reValidateMode: 'onBlur',
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
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
        <TextareaInputController<Product>
          name="description"
          label="Product Description"
          placeholder="Enter product description"
        />
        <ImagesFields />
        {children}
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-lg transition-colors duration-200 tracking-wide"
          data-testid="product-form-submit"
        >
          Save
        </button>
      </form>
    </FormProvider>
  )
}

export default EditProductForm
