import { createCookieSessionStorage, Session } from 'remix'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__notification',
      domain:
        process.env.NODE_ENV === 'production' ? 'jodygeraldo.com' : undefined,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['SECRET'],
      secure: process.env.NODE_ENV === 'production',
    },
  })

export interface Notification {
  type: 'SUCCESS' | 'ERROR'
  message: string
  extendedMessage?: string
}

async function getNotification(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const notification: Notification | undefined = session.get('notification')
  return notification
}

async function setNotification(
  request: Request,
  data: Notification,
): Promise<Session> {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('notification', data)
  return session
}

export { getNotification, setNotification, commitSession, destroySession }
