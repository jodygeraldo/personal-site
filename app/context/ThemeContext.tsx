import type { ReactNode } from 'react'
import { createContext, useState } from 'react'
import type { Theme } from '~/utils/theme.server'

function parseTheme(theme: string): Theme {
  if (theme === 'dark' || theme === 'light' || theme === 'system') {
    return theme
  }

  return 'system'
}

interface ThemeContextType {
  theme: Theme
  updateTheme: (newTheme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  updateTheme: () => {},
})

function ThemeProvider({
  currentTheme,
  children,
}: {
  currentTheme: Theme
  children: ReactNode
}) {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  function updateTheme(newTheme: string) {
    const parsedTheme = parseTheme(newTheme)

    setTheme(parsedTheme)
  }

  const value = {
    theme,
    updateTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
