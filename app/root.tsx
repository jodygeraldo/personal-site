import {
  json,
  Link,
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
    <Document theme={optimisticTheme}>
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
    <Document theme={caught.data?.theme}>
      <main className="mx-auto flex min-h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-grow flex-col">
          <div className="flex-shrink-0 pt-10 sm:pt-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-medium tracking-tight text-primary-9">
                Jody Geraldo
              </h1>
            </Link>
          </div>
          <div className="my-auto flex-shrink-0 py-16 sm:py-32">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-9 lg:hidden">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-12 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-2 text-base text-gray-11">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium text-primary-9 hover:text-primary-10"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        <svg
          className="hidden self-center lg:block"
          width="860.13137"
          height="571.14799"
          viewBox="0 0 860.13137 571.14799"
        >
          <use href="/assets/images/undraw_page_not_found.svg#page-not-found" />
        </svg>
      </main>
    </Document>
  )
}

function Document({
  children,
  theme = 'dark',
}: {
  children: ReactNode
  theme?: 'dark' | 'light'
}) {
  return (
    <html
      lang="en"
      className={clsx(theme === 'dark' && 'dark-theme', 'h-full scroll-smooth')}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
