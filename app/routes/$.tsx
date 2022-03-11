import { json } from 'remix'
import type { LoaderFunction } from 'remix'
import { getTheme } from '~/utils/theme.server'

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getTheme(request)

  throw json({ theme }, { status: 404 })
}

export default function NotFoundPage() {
  return <h1>You just land to no way land.</h1>
}
