import { useAuthStore } from '@/stores/auth'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">
          Logo
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <button onClick={logout} className="text-muted-foreground hover:text-foreground">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-muted-foreground hover:text-foreground">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 