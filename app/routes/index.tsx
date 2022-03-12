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
import { getRandomFact } from '~/utils/get-fact.server'

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

export interface ActionData {
  type?: 'SUCCESS' | 'ERROR'
  statusMessage?: string
  extendedMessage?: string
  fieldErrors?: {
    name?: string
    email?: string
    message?: string
  }
  fields?: {
    name: string
    email: string
    message: string
  }
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

      const { fieldErrors, formError } = validateMailRequest(mail)

      if (formError) {
        return json<ActionData>(
          {
            statusMessage: formError,
            fieldErrors,
            fields: mail,
            type: 'ERROR',
          },
          {
            status: 400,
          },
        )
      }

      try {
        const response = await sendMail(apiKey, mail)
        if (response.ok) {
          return json<ActionData>(
            { statusMessage: 'Message sent successfully', type: 'SUCCESS' },
            {
              status: 200,
            },
          )
        } else {
          return json<ActionData>(
            {
              statusMessage: "Couldn't send the message",
              extendedMessage:
                'Please try again later or contact me through email',
              type: 'ERROR',
            },
            {
              status: response.status,
            },
          )
        }
      } catch (error) {
        // Todo: setup error boundary
        console.log(error)
      }
      return null
    default:
      return json<ActionData>(
        {
          statusMessage: `Can't process action with name: ${actions}`,
          type: 'ERROR',
        },
        {
          status: 400,
        },
      )
  }
}

export const loader: LoaderFunction = ({ request }) => {
  const searchParams = new URL(request.url).searchParams

  if (searchParams.get('require') === 'fact') {
    const ignore = searchParams.get('ignore') ?? undefined
    const { fact, isLastFact } = getRandomFact(ignore)

    return json({ fact, isLastFact }, { status: 200 })
  }
  const { fact, isLastFact } = getRandomFact()

  return json({ fact, isLastFact }, { status: 200 })
}

export default function Index() {
  return (
    <>
      <Hero />
      <main>
        <Tool />
        <Project />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export const unstable_shouldReload: ShouldReloadFunction = () => false
