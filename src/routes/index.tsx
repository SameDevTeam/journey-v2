import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { PublicRoute } from './PublicRoute.tsx'

const Login = lazy(() => import('@/components/auth/LoginForm'))
const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'))
const NotFound = lazy(() => import('@/components/error/NotFound'))

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
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
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Dashboard />
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