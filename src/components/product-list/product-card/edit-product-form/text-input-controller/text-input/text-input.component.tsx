import { forwardRef } from 'react'
import type { TextInputProps } from './text-input.types.ts'

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, errorMessage, name, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors text-base text-gray-700 ${
          errorMessage
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-black'
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
