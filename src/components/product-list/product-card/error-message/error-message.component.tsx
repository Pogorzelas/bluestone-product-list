import type { ErrorMessageProps } from './error-message.types'

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null

  return (
    <div className="border-l-2 border-red-600 bg-red-50/50 text-red-600 px-4 py-3 rounded text-sm">
      <p className="font-medium">Error</p>
      <p className="mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage
