import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import type { MetaFunction, LoaderFunction } from 'remix'
import tailwind from './tailwind.css'
import clsx from 'clsx'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './utils/theme.server'

export const meta: MetaFunction = () => {
  return { title: 'Jody Geraldo | Personal Site' }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
