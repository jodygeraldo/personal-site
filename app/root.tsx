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
import type {
  // MetaFunction,
  LinksFunction,
  ShouldReloadFunction,
  LoaderFunction,
} from 'remix'
import { useSetupTranslations } from 'remix-i18next'
import tailwind from './tailwind.css'
import darkTheme from './dark.css'
import clsx from 'clsx'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './utils/theme.server'
import { ActionType } from './routes'

import * as Toast from '@radix-ui/react-toast'
import { ReactNode } from 'react'
import ErrorPage from '~/components/ErrorPage'
import { i18n } from './utils/i18n.server'

// export const meta: MetaFunction = () => {
//   return { title: 'Jody Geraldo | Personal Site' }
// }

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
  locale: string
  theme: 'dark' | 'light'
}
export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request)
  const theme = await getTheme(request)

  return json<loaderData>({ theme, locale })
}

export default function App() {
  const { locale, theme } = useLoaderData<loaderData>()
  useSetupTranslations(locale)

  const optimisticTheme = useTheme(theme)

  return (
    <Document theme={optimisticTheme} title="Jody Geraldo | Personal Site">
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </Document>
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

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Document theme={caught.data?.theme} title="Whoops...">
      <ErrorPage page={404} />
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// only reload if the theme has changed
export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return (
    !!submission && submission.formData.get('action') === ActionType.SET_THEME
  )
}
