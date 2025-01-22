import { useAuthStore } from '@/stores/auth'
import { Link } from 'react-router-dom'

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">
          Logo
        </Link>
        {isAuthenticated ? (
          <button onClick={logout} className="text-gray-600 hover:text-gray-900">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
} 