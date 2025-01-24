import { UserMenu } from "@/components/theme/UserMenu"
import { useAuthStore } from "@/stores/auth"

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated && user && <UserMenu />}
        </div>
      </div>
    </div>
  )
} 