import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import type { ShouldReloadFunction } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import Contact from '~/components/Contact/Contact'
import Footer from '~/components/Footer'
import Hero from '~/components/Hero/Hero'
import PageContainer from '~/components/PageContainer'
import Project from '~/components/Project/Project'
import Tool from '~/components/Tool/Tool'
import type { Language, Translations } from '~/utils/i18n.server'
import { getLanguage, getTranslations } from '~/utils/i18n.server'
import { sendMail, validateMailRequest } from '~/utils/mail.server'
import {
  commitNotificationSession,
  setFlashNotification,
} from '~/utils/notification.server'

export const meta: MetaFunction = ({ data }) => {
  const { translation } = data as LoaderData

  return {
    title: 'Portfolio | Jody Geraldo',
    description: `${translation.hero.intro['title-1']} ${translation.hero.intro['title-2']}. ${translation.hero.intro['subtitle']}`,
  }
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

  const apiKey = context.ELASTIC_EMAIL_API_KEY
  const rechaptchaSecret = context.RECAPTCHA_SECRET
  invariant(typeof apiKey === 'string', 'ELASTIC_EMAIL_API_KEY is not defined')
  invariant(
    typeof rechaptchaSecret === 'string',
    'RECAPTCHA_SECRET is not defined',
  )

  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')
  const token = formData.get('token')
  console.log(token)
  invariant(typeof name === 'string', 'Invalid name type')
  invariant(typeof email === 'string', 'Invalid email type')
  invariant(typeof message === 'string', 'Invalid message type')
  invariant(typeof token === 'string', 'Invalid token type')
  const mail = {
    name,
    email,
    message,
  }

  const {
    fieldErrors,
    formError,
    message: rechaptchaError,
  } = await validateMailRequest(mail, {
    token,
    secret: rechaptchaSecret,
  })

  if (formError || rechaptchaError) {
    const notificationSession = await setFlashNotification(request, {
      type: 'ERROR',
      message: formError ?? rechaptchaError ?? 'Unknown error',
    })

    return json<ActionData>(
      {
        fieldErrors,
        fields: mail,
      },
      {
        status: 400,
        headers: {
          'Set-Cookie': await commitNotificationSession(notificationSession),
        },
      },
    )
  }

  try {
    const response = await sendMail(apiKey, mail)
    const notificationSession = await setFlashNotification(request, response)
    if (response.type === 'SUCCESS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Set-Cookie': await commitNotificationSession(notificationSession),
        },
      })
    } else {
      return json<ActionData>(
        { fields: mail },
        {
          status: 400,
          headers: {
            'Set-Cookie': await commitNotificationSession(notificationSession),
          },
        },
      )
    }
  } catch (error) {
    console.log(error)
  }

  throw new Error(`Action failed on ${request.url}`)
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
    <div className="bg-gray-1">
      <Hero translation={translation.hero} language={language} />

      <main className="pb-16">
        <Tool translation={translation.tool} />
        <Project translation={translation.project} />
        <Contact translation={translation.contact} />
      </main>

      <PageContainer>
        <Footer />
      </PageContainer>
    </div>
  )
}

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return !!submission && submission.method !== 'GET'
}
