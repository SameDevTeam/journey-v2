import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
} 