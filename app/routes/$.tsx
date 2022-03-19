import { json } from 'remix'
import type { LoaderFunction } from 'remix'
import { getTheme } from '~/utils/theme.server'
import { getLanguage, getTranslations } from '~/utils/i18n.server'

export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const translation = getTranslations(language, 'error')

  const theme = await getTheme(request)

  throw json({ theme, translation }, { status: 404 })
}

export default function NotFoundPage() {
  return <h1>You just land to no way land.</h1>
}
