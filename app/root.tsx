import * as Toast from '@radix-ui/react-toast'
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'
import clsx from 'clsx'
import ErrorPage from '~/components/ErrorPage'
import NotificationToast from '~/components/NotificationToast'
import { useTheme } from './hooks/useTheme'
import tailwindStylesUrl from './styles/build/tailwind.css'
import type { Notification } from './utils/notification.server'
import {
  commitNotificationSession,
  getFlashNotification,
} from './utils/notification.server'
import { getTheme } from './utils/theme.server'

export const meta: MetaFunction = () => {
  return { description: 'Get to know Jody Geraldo' }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesUrl }]
}

interface loaderData {
  theme?: 'dark' | 'light'
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
  children: React.ReactNode
  notification?: Notification
}) {
  return (
    <Toast.Provider swipeThreshold={75}>
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
  theme,
  title,
}: {
  children: React.ReactNode
  theme?: 'dark' | 'light' | 'system'
  title?: string
}) {
  return (
    <html
      lang="en"
      className={clsx(
        theme === 'dark' && 'dark',
        theme === 'light' && 'light',
        'h-full scroll-smooth',
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
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
