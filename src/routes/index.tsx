import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { PublicRoute } from './PublicRoute.tsx'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { useUser } from '@/hooks/auth'

const Login = lazy(() => import('@/components/auth/page'))
const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'))
const NotFound = lazy(() => import('@/components/error/NotFound'))
const FileManagement = lazy(() => import('@/components/file-management/page'))

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return children
}

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    element: <AuthCheck>
      <Outlet />
    </AuthCheck>,
    children: [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <Dashboard />
              },
              {
                path: 'file-management',
                element: <FileManagement />,
              },
              {
                path: 'file-management/*',
                element: <FileManagement />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
} 