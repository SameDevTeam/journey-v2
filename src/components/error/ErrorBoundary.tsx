import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{error.status}</h1>
          <p className="text-xl">{error.statusText}</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-xl">Something went wrong</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  )
} 