import { Controller, type FieldValues } from 'react-hook-form'
import TextareaInput from './textarea-input'
import type { TextareaInputControllerProps } from './textarea-input-controller.types.ts'

const TextareaInputController = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  ...inputProps
}: TextareaInputControllerProps<TFieldValues>) => (
  <Controller
    name={name}
    render={({ field, fieldState }) => (
      <TextareaInput
        {...field}
        {...inputProps}
        label={label}
        errorMessage={fieldState.error?.message}
      />
    )}
  />
)

export default TextareaInputController
