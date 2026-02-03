import type { FieldPath, FieldValues } from 'react-hook-form'
import type { TextInputProps } from '@/components/product-list/product-card/edit-product-form/text-input-controller/text-input'

type TextInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  label: string
} & Omit<TextInputProps, 'name'>

export type { TextInputControllerProps }
