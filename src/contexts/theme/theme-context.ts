import { createContext } from 'react'

export type Theme = 'dark' | 'light'
export type Color = 'zinc'| 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'

export interface ThemeProviderState {
  theme: Theme
  color: Color
  setTheme: (theme: Theme) => void
  setColor: (color: Color) => void
}

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'light',
  color: 'zinc',
  setTheme: () => null,
  setColor: () => null,
}) 