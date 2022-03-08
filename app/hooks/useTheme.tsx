import { useTransition } from 'remix'

function checkOrParseTheme(theme: string) {
  if (theme === 'dark' || theme === 'light') return theme

  const defaultTheme = 'dark'

  return defaultTheme
}

export function useTheme(theme: string) {
  const transition = useTransition()

  const themeFormData = transition.submission?.formData.get('theme')

  if (typeof themeFormData === 'string') {
    return checkOrParseTheme(themeFormData)
  }

  return checkOrParseTheme(theme)
}
