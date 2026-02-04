import type { ReactNode } from 'react'

type DialogProps = {
  trigger: ReactNode
  title: string
  children: ReactNode
  isOpen?: boolean
  onOpenChange?: (newOpenState: boolean) => void
}

export type { DialogProps }
