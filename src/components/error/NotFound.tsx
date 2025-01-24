import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { useUser } from '@/hooks/auth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuthStore()
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const handleBack = () => {
    if (location.key === 'default') {
      // If there's no history, go to home or login based on auth state
      navigate(isAuthenticated ? '/' : '/login')
    } else {
      navigate(-1)
    }
  }

  const handleHome = () => {
    navigate(isAuthenticated ? '/' : '/login')
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={handleBack} variant="outline">
          Go back
        </Button>
        <Button onClick={handleHome}>
          {isAuthenticated ? 'Back to dashboard' : 'Back to login'}
        </Button>
      </div>
    </div>
  )
} 