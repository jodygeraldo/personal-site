import { createCookieSessionStorage, Session } from 'remix'

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
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export {
  getTheme,
  setTheme,
  commitSession as commitThemeSession,
  destroySession as destroyThemeSession,
}
