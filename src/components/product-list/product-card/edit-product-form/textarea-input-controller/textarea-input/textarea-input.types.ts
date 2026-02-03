import type { TextareaHTMLAttributes } from 'react'

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label: string
  errorMessage?: string
}

export type { TextareaInputProps }
