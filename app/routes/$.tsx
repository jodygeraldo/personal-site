import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { getLanguage, getTranslations } from '~/utils/i18n.server'
import { getTheme } from '~/utils/theme.server'

export const meta: MetaFunction = () => ({
  title: 'Whoops...',
})

export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const translation = getTranslations(language, 'error')

  const theme = await getTheme(request)

  throw json({ theme, translation }, { status: 404 })
}

export default function NotFoundPage() {
  return <h1>You just land to no way land.</h1>
}
