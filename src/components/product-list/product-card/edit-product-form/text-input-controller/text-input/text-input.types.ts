import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  errorMessage?: string
}

export type { TextInputProps }
