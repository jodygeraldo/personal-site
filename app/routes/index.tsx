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
import { commitSession, setTheme } from '~/utils/theme.server'
import { sendMail, validateMailRequest } from '~/utils/mail.server'

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

interface ActionData {
  statusMessage?: string
  errors?: { field: string; message: string }[]
}
export const action: ActionFunction = async ({ request, context }) => {
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
      const apiKey = context.ELASTIC_EMAIL_API_KEY
      const name = formData.get('name')
      const email = formData.get('email')
      const message = formData.get('message')
      invariant(typeof name === 'string', 'Invalid name type')
      invariant(typeof email === 'string', 'Invalid email type')
      invariant(typeof message === 'string', 'Invalid message type')

      const mail = {
        name,
        email,
        message,
      }

      const errors = validateMailRequest(mail)

      if (errors.length > 0) {
        return json<ActionData>(
          { errors },
          {
            status: 400,
          },
        )
      }

      const response = await sendMail(apiKey, mail)
      if (response.ok) {
        return json<ActionData>(
          { statusMessage: 'Message sent successfully' },
          {
            status: 200,
          },
        )
      } else {
        return json<ActionData>(
          { statusMessage: "Couldn't send the message" },
          {
            status: response.status,
          },
        )
      }
    default:
      return json<ActionData>(
        { statusMessage: `Can't process action with name: ${actions}` },
        {
          status: 400,
        },
      )
  }
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
