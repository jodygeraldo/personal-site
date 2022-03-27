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
import {
  commitLanguageSession,
  getLanguage,
  getTranslations,
  setLanguage,
} from '~/utils/i18n.server'
import type { Language, Translations } from '~/utils/i18n.server'
import {
  commitNotificationSession,
  setFlashNotification,
} from '~/utils/notification.server'

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
      invariant(
        setTo === 'dark' || setTo === 'light' || setTo === 'system',
        'Invalid theme',
      )

      const themeSession = await setTheme(
        request,
        setTo === 'system' ? undefined : setTo,
      )

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
        const notificationSession = await setFlashNotification(request, {
          type: 'ERROR',
          message: formError,
        })

        return json<ActionData>(
          {
            fieldErrors,
            fields: mail,
          },
          {
            status: 400,
            headers: {
              'Set-Cookie': await commitNotificationSession(
                notificationSession,
              ),
            },
          },
        )
      }

      try {
        const response = await sendMail(apiKey, mail)
        const notificationSession = await setFlashNotification(
          request,
          response,
        )
        if (response.type === 'SUCCESS') {
          return new Response(null, {
            status: 200,
            headers: {
              'Set-Cookie': await commitNotificationSession(
                notificationSession,
              ),
            },
          })
        } else {
          return json<ActionData>(
            { fields: mail },
            {
              status: 400,
              headers: {
                'Set-Cookie': await commitNotificationSession(
                  notificationSession,
                ),
              },
            },
          )
        }
      } catch (error) {
        console.log(error)
      }
      return null
    default:
      const notificationSession = await setFlashNotification(request, {
        type: 'ERROR',
        message: `Can't process action with name: ${actions}`,
      })

      return new Response(null, {
        status: 400,
        headers: {
          'Set-Cookie': await commitNotificationSession(notificationSession),
        },
      })
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

  return json<LoaderData>({ translation, language }, { status: 200 })
}

export default function Index() {
  const { translation, language } = useLoaderData<LoaderData>()

  return (
    <>
      <Hero translation={translation.hero} language={language} />
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
