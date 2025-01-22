import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
} 