import type { ReactNode } from 'react'

type DialogProps = {
  trigger: ReactNode
  title: string
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type { DialogProps }
