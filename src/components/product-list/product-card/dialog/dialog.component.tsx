import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DialogProps } from '@/components/product-list/product-card/dialog/dialog.types.ts'

const Dialog = ({ trigger, title, children, isOpen, onOpenChange }: DialogProps) => (
  <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
    <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col">
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-start justify-between p-10 pb-4">
            <DialogPrimitive.Title className="text-2xl font-light text-gray-900 flex-1">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-all flex-shrink-0 ml-4 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2">
              <span className="text-xl">✕</span>
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="sr-only">
            Form to edit product information
          </DialogPrimitive.Description>
          <div className="px-10 pb-10 overflow-y-auto">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)

export default Dialog
