import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
} 