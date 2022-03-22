import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix'
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix'
import tailwindStylesUrl from './styles/build/tailwind.css'
import darkThemeStylesUrl from './styles/build/dark.css'
import clsx from 'clsx'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './utils/theme.server'

import * as Toast from '@radix-ui/react-toast'
import { ReactNode } from 'react'
import ErrorPage from '~/components/ErrorPage'

import {
  commitNotificationSession,
  getFlashNotification,
  Notification,
} from './utils/notification.server'
import NotificationToast from '~/components/NotificationToast'

export const meta: MetaFunction = () => {
  return { descrption: 'Get to know Jody Geraldo' }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesUrl },
    {
      rel: 'stylesheet',
      href: darkThemeStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'preload',
      href: '/assets/fonts/raleway-v26-latin-500.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/assets/fonts/raleway-v26-latin-700.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ]
}

interface loaderData {
  theme: 'dark' | 'light'
  notification?: Notification
}
export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getTheme(request)
  const { notification, notificationSession } = await getFlashNotification(
    request,
  )

  return json<loaderData>(
    { theme, notification },
    {
      headers: {
        'Set-Cookie': await commitNotificationSession(notificationSession),
      },
    },
  )
}

export default function App() {
  const { theme, notification } = useLoaderData<loaderData>()

  const optimisticTheme = useTheme(theme)

  return (
    <Document theme={optimisticTheme} title="Jody Geraldo | Personal Site">
      <NotificationProvider notification={notification}>
        <Outlet />
      </NotificationProvider>
    </Document>
  )
}

function NotificationProvider({
  children,
  notification,
}: {
  children: ReactNode
  notification?: Notification
}) {
  return (
    <Toast.Provider>
      {children}

      {notification ? <NotificationToast notification={notification} /> : null}

      <Toast.Viewport className="fixed top-0 right-0 z-50 m-0 flex w-96 max-w-[100vw] list-none flex-col gap-10 p-6" />
    </Toast.Provider>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Document theme={caught.data?.theme} title="Whoops...">
      <ErrorPage page={404} translation={caught.data?.translation} />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document theme="dark" title="Whoops...">
      <ErrorPage page={500} message={error.message} />
    </Document>
  )
}

function Document({
  children,
  theme = 'dark',
  title,
}: {
  children: ReactNode
  theme?: 'dark' | 'light'
  title?: string
}) {
  return (
    <html
      lang="en"
      className={clsx(theme === 'dark' && 'dark-theme', 'h-full scroll-smooth')}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-1">
        {children}
        {/* Cloudflare Web Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "3519ed47081940f2b04fa12b014444ac"}'
          ></script>
        )}
        {/* End Cloudflare Web Analytics  */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
