import type { ErrorMessageProps } from './error-message.types'

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null

  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
      <p className="font-medium">Error</p>
      <p className="mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage
