import { createCookieSessionStorage } from 'remix'
import { isValidTheme, Theme } from './theme-provider'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: '__theme',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['SECRET'],
    secure: process.env.NODE_ENV === 'production',
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => {
      const theme = session.get('theme')
      return isValidTheme(theme) ? theme : Theme.DARK
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export { getThemeSession }
