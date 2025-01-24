import AppRouter from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { GlobalErrorBoundary } from '@/components/error/GlobalErrorBoundary'
import { ThemeProvider } from '@/contexts/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <Toaster position="top-right" richColors theme="system" />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  )
}

export default App
