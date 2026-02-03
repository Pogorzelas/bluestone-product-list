import type { FieldPath, FieldValues } from 'react-hook-form'
import type { TextareaInputProps } from '@/components/product-list/product-card/edit-product-form/textarea-input-controller/textarea-input'

type TextareaInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  label: string
} & Omit<TextareaInputProps, 'name'>

export type { TextareaInputControllerProps }
