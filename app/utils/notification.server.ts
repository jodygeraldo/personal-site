import { createCookieSessionStorage } from '@remix-run/cloudflare'

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

export type NotificationType = 'SUCCESS' | 'ERROR' | 'INFO'

export interface Notification {
  type: NotificationType
  message: string
  extendedMessage?: string
}

async function getFlashNotification(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const notification: Notification | undefined = session.get('notification')
  return { notification, notificationSession: session }
}

async function setFlashNotification(
  request: Request,
  notification: Notification,
) {
  const session = await getSession(request.headers.get('Cookie'))
  session.flash('notification', notification)
  return session
}

export {
  getFlashNotification,
  setFlashNotification,
  commitSession as commitNotificationSession,
  destroySession as destroyNotificationSession,
}
