import type { Session } from '@remix-run/cloudflare'
import { createCookieSessionStorage } from '@remix-run/cloudflare'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__theme',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['SECRET'],
      secure: process.env.NODE_ENV === 'production',
    },
  })

type Theme = 'dark' | 'light' | undefined

async function getTheme(request: Request): Promise<Theme> {
  const session = await getSession(request.headers.get('Cookie'))

  const theme: Theme = session.get('theme')

  return theme
}

async function setTheme(request: Request, setTo: Theme): Promise<Session> {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('theme', setTo)

  return session
}

export {
  getTheme,
  setTheme,
  commitSession as commitThemeSession,
  destroySession as destroyThemeSession,
}
