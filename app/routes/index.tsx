import { json, redirect, useLoaderData } from 'remix'
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
import { commitThemeSession, setTheme } from '~/utils/theme.server'
import { sendMail, validateMailRequest } from '~/utils/mail.server'
import { getRandomFact } from '~/utils/get-fact.server'
import {
  commitLanguageSession,
  getLanguage,
  getTranslations,
  setLanguage,
} from '~/utils/i18n.server'
import type { Language, Translations } from '~/utils/i18n.server'

export enum ActionType {
  SET_THEME = 'SET_THEME',
  SET_LANGUAGE = 'SET_LANGUAGE',
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
          'Set-Cookie': await commitThemeSession(themeSession),
        },
      })
    case ActionType.SET_LANGUAGE:
      const language = formData.get('language')
      invariant(typeof language === 'string', 'Invalid language type')
      invariant(language === 'en' || language === 'id', 'Invalid language')

      const languageSession = await setLanguage(request, language)

      const redirectTo = request.headers.get('Referer') ?? '/'

      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await commitLanguageSession(languageSession),
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
        const { message, type, extra } = await sendMail(apiKey, mail)
        if (type === 'SUCCESS') {
          return json<ActionData>(
            { statusMessage: message, type },
            {
              status: 200,
            },
          )
        }

        if (extra) {
          return json<ActionData>(
            {
              statusMessage: message,
              extendedMessage: extra,
              type,
            },
            {
              status: 400,
            },
          )
        }
      } catch (error) {
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

interface LoaderData {
  translation: {
    hero: {
      heroHeader: Translations['heroHeader'][Language]
      intro: Translations['intro'][Language]
      getFact: Translations['getFact'][Language]
    }
    tool: Translations['tool'][Language]
    project: Translations['project'][Language]
    contact: Translations['contact'][Language]
  }
  language: Language
  fact: string
  isLastFact: boolean
}
export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const translation = {
    hero: {
      heroHeader: getTranslations(language, 'heroHeader'),
      intro: getTranslations(language, 'intro'),
      getFact: getTranslations(language, 'getFact'),
    },
    tool: getTranslations(language, 'tool'),
    project: getTranslations(language, 'project'),
    contact: getTranslations(language, 'contact'),
  }

  const searchParams = new URL(request.url).searchParams
  if (searchParams.get('require') === 'fact') {
    const ignore = searchParams.get('ignore') ?? undefined
    const { fact, isLastFact } = getRandomFact(language, ignore)

    return json<LoaderData>(
      { translation, language, fact, isLastFact },
      { status: 200 },
    )
  }

  const { fact, isLastFact } = getRandomFact(language)

  return json<LoaderData>(
    { translation, language, fact, isLastFact },
    { status: 200 },
  )
}

export default function Index() {
  const { translation, language, fact } = useLoaderData<LoaderData>()

  return (
    <>
      <Hero translation={translation.hero} language={language} fact={fact} />
      <main>
        <Tool translation={translation.tool} />
        <Project translation={translation.project} />
        <Contact translation={translation.contact} />
      </main>
      <Footer />
    </>
  )
}

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return (
    !!submission &&
    submission.formData.get('action') === ActionType.SET_LANGUAGE
  )
}
