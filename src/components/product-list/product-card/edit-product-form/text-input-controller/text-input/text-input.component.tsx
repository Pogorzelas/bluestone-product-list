import { forwardRef } from 'react'
import type { TextInputProps } from './text-input.types.ts'

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, errorMessage, name, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errorMessage
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      <span
        id={`${name}-error`}
        className={`text-sm text-red-600 ${errorMessage ? 'visible' : 'invisible'}`}
      >
        {errorMessage || '\u00A0'}
      </span>
    </div>
  ),
)

export default TextInput
