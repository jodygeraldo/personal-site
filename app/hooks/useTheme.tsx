import { useTransition } from 'remix'

function checkTheme(theme?: string) {
  if (theme === 'dark' || theme === 'light') return theme
  return undefined
}

export function useTheme(theme?: string) {
  const transition = useTransition()

  const themeFormData = transition.submission?.formData.get('theme')

  if (typeof themeFormData === 'string') {
    return checkTheme(themeFormData)
  }

  return checkTheme(theme)
}
