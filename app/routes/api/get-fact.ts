import type { LoaderFunction } from '@remix-run/cloudflare'
import { json, redirect } from '@remix-run/cloudflare'
import { getRandomFact } from '~/utils/get-fact.server'
import { getLanguage } from '~/utils/i18n.server'

interface LoaderData {
  fact: string
  isLastFact: boolean
}

export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const searchParams = new URL(request.url).searchParams

  if (searchParams.get('ignore')) {
    const ignore = searchParams.get('ignore') ?? undefined
    const { fact, isLastFact } = getRandomFact(language, ignore)

    return json<LoaderData>({ fact, isLastFact }, { status: 200 })
  }

  return redirect('/404')
}
