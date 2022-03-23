import { json } from 'remix'
import type { LoaderFunction } from 'remix'
import { getRandomFact } from '~/utils/get-fact.server'
import { getLanguage } from '~/utils/i18n.server'

interface LoaderData {
  fact: string
  isLastFact: boolean
}

export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const searchParams = new URL(request.url).searchParams
  console.log(searchParams.get('ignore'))

  new Promise(function (resolve) {
    setTimeout(resolve, 3000)
  })

  if (searchParams.get('ignore')) {
    const ignore = searchParams.get('ignore') ?? undefined
    const { fact, isLastFact } = getRandomFact(language, ignore)

    return json<LoaderData>({ fact, isLastFact }, { status: 200 })
  }

  return json(null, {
    status: 400,
  })
}
