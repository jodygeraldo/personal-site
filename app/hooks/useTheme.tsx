import { useTransition } from '@remix-run/react'

function checkTheme(theme?: string) {
  if (theme === 'dark' || theme === 'light') return theme
  return 'system'
}

export function useTheme(theme: string = 'system') {
  const transition = useTransition()

  const themeFormData = transition.submission?.formData.get('theme')

  if (typeof themeFormData === 'string') {
    return checkTheme(themeFormData)
  }

  return checkTheme(theme)
}
