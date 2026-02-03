import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DialogProps } from '@/components/product-list/product-card/dialog/dialog.types.ts'

const Dialog = ({ trigger, title, children, open, onOpenChange }: DialogProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 z-10">
          <span className="text-xl">✕</span>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>

        <div className="flex flex-col overflow-hidden">
          <div className="p-6 pb-4">
            <DialogPrimitive.Title className="text-lg font-semibold">{title}</DialogPrimitive.Title>
          </div>
          <div className="px-6 pb-6 overflow-y-auto">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)

export default Dialog
