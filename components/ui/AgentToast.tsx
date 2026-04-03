'use client'

interface Props {
  message: string
}

export default function AgentToast({ message }: Props) {
  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 animate-slide-up">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="text-sm flex-1">{message}</div>
      </div>
    </div>
  )
}
