import { createContext } from 'react'

type Theme = 'dark' | 'light'

export const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'light',
  setTheme: () => null,
}) 