import { useContext } from 'react'
import { ThemeProviderContext } from '@/contexts/theme/theme-context'

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  const toggleTheme = () => {
    context.setTheme(context.theme === 'dark' ? 'light' : 'dark')
  }

  return { theme: context.theme, toggleTheme }
} 