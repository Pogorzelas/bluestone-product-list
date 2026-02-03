import { Controller, type FieldValues } from 'react-hook-form'
import TextInput from './text-input'
import type { TextInputControllerProps } from './text-input-controller.types.ts'

const TextInputController = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  ...inputProps
}: TextInputControllerProps<TFieldValues>) => (
  <Controller
    name={name}
    render={({ field, fieldState }) => (
      <TextInput
        {...field}
        {...inputProps}
        label={label}
        errorMessage={fieldState.error?.message}
      />
    )}
  />
)

export default TextInputController
