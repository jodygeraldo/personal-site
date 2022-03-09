import { json } from 'remix'
import type {
  ActionFunction,
  LoaderFunction,
  ShouldReloadFunction,
} from 'remix'
import invariant from 'tiny-invariant'
import Contact from '~/components/Contact/Contact'
import Footer from '~/components/Footer/Footer'
import Hero from '~/components/Hero/Hero'
import Project from '~/components/Project/Project'
import Tool from '~/components/Tool/Tool'
import { getFact } from '~/utils/get-fact.server'
import { commitSession, setTheme } from '~/utils/theme.server'

export enum ActionType {
  SET_THEME = 'SET_THEME',
  SUBMIT_MESSSAGE = 'SUBMIT_MESSSAGE',
}

function isValidActionType(value: any): value is ActionType {
  return (
    typeof value === 'string' &&
    Object.values<string>(ActionType).includes(value)
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const actions = formData.get('action')
  invariant(isValidActionType(actions), 'Invalid action type')

  switch (actions) {
    case ActionType.SET_THEME:
      const setTo = formData.get('theme')
      invariant(typeof setTo === 'string', 'Invalid theme type')
      invariant(setTo === 'dark' || setTo === 'light', 'Invalid theme')

      const themeSession = await setTheme(request, setTo)

      return new Response(null, {
        status: 204,
        headers: {
          'Set-Cookie': await commitSession(themeSession),
        },
      })
    case ActionType.SUBMIT_MESSSAGE:
      return null
    default:
      return json(`Can't process action with name: ${actions}`, {
        status: 400,
      })
  }
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const searchParams = new URL(request.url).searchParams
  const ignore = searchParams.get('ignore') ?? ''

  const getFactApiKey = context.GET_FACT_API_KEY
  invariant(getFactApiKey, 'GET_FACT_API_KEY is not defined')

  const fact = await getFact(getFactApiKey, ignore)

  return json({ fact }, 200)
}

export default function Index() {
  return (
    <>
      <Hero />
      <Tool />
      <Project />
      <Contact />
      <Footer />
    </>
  )
}

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  const isSubmitting = !!submission

  const isContactSubmission =
    isSubmitting &&
    submission.method === 'POST' &&
    submission.formData.get('action') === ActionType.SUBMIT_MESSSAGE

  const isGetFactSubmission =
    isSubmitting &&
    submission.method === 'GET' &&
    typeof submission.formData.get('ignore') === 'string'

  return isContactSubmission || isGetFactSubmission
}
