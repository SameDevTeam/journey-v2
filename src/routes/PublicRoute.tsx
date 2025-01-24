import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useUser } from '@/hooks/auth'

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
} 