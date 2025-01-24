import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'

  if (isLoginPage) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
    </div>
  )
} 