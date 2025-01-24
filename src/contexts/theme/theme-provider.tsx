import { useEffect, useState } from 'react'
import { ThemeProviderContext, Theme, Color } from './theme-context'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light'
    }
    return 'light'
  })

  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('color') as Color) || 'zinc'
    }
    return 'zinc'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const colors: Color[] = ['zinc', 'red', 'rose', 'orange', 'green', 'blue', 'yellow', 'violet']
    colors.forEach(c => root.classList.remove(c))
    root.classList.add(color)
    localStorage.setItem('color', color)
  }, [color])

  return (
    <ThemeProviderContext.Provider value={{ theme, color, setTheme, setColor }}>
      {children}
    </ThemeProviderContext.Provider>
  )
} 