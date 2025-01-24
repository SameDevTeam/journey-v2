import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { useUser } from '@/hooks/auth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
} 