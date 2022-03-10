import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import type {
  MetaFunction,
  LinksFunction,
  ShouldReloadFunction,
  LoaderFunction,
} from 'remix'
import tailwind from './tailwind.css'
import darkTheme from './dark.css'
import clsx from 'clsx'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './utils/theme.server'
import { ActionType } from './routes'

import * as Toast from '@radix-ui/react-toast'
import { ReactNode } from 'react'

export const meta: MetaFunction = () => {
  return { title: 'Jody Geraldo | Personal Site' }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    {
      rel: 'stylesheet',
      href: darkTheme,
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
    {
      rel: 'preload',
      href: '/assets/fonts/raleway-v26-latin-700italic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ]
}

interface loaderData {
  theme: 'dark' | 'light'
}
export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getTheme(request)
  return json<loaderData>({ theme })
}

export default function App() {
  const { theme } = useLoaderData<loaderData>()

  const optimisticTheme = useTheme(theme)

  return (
    <html
      lang="en"
      className={clsx(
        optimisticTheme === 'dark' && 'dark-theme',
        'h-full scroll-smooth',
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-1">
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider>
      {children}

      <Toast.Viewport className="fixed top-0 right-0 z-50 m-0 flex w-96 max-w-[100vw] list-none flex-col gap-10 p-6" />
    </Toast.Provider>
  )
}

// only reload if the theme has changed
export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return (
    !!submission && submission.formData.get('action') === ActionType.SET_THEME
  )
}
