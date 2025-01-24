import { useUser } from '@/hooks/auth'

export function AuthCheck({ children }: { children: React.ReactNode }) {
  useUser() // Single instance of useUser at the root level
  return <>{children}</>
} 