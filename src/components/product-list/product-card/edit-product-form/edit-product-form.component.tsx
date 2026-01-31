import { FormProvider, useForm } from 'react-hook-form'
import type { EditProductFormProps, ProductFormData } from './edit-product-form.types.ts'

const EditProductForm = ({ defaultValues, onSubmit }: EditProductFormProps) => {
  const formMethods = useForm<ProductFormData>({
    defaultValues,
  })
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}></form>
    </FormProvider>
  )
}

export default EditProductForm
