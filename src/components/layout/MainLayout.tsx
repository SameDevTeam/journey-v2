import { Outlet, useLocation } from 'react-router-dom'
// import { Navbar } from '@/components/layout/Navbar'
import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
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
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 px-8 py-4">
        <SidebarTrigger />
        {children || <Outlet />}
      </main>
    </SidebarProvider>
  )
} 