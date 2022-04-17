import type { ActionFunction } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'
import { PreferenceAction } from '~/models/global'
import { commitLanguageSession, setLanguage } from '~/utils/i18n.server'
import {
  commitNotificationSession,
  setFlashNotification,
} from '~/utils/notification.server'
import { commitThemeSession, setTheme } from '~/utils/theme.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const actions = formData.get('action')
  invariant(typeof actions === 'string', 'actions must be a string')

  switch (actions) {
    case PreferenceAction.SET_THEME:
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
    case PreferenceAction.SET_LANGUAGE:
      const language = formData.get('language')
      invariant(typeof language === 'string', 'Invalid language type')
      invariant(language === 'en' || language === 'id', 'Invalid language')

      const languageSession = await setLanguage(request, language)

      return new Response(null, {
        status: 204,
        headers: {
          'Set-Cookie': await commitLanguageSession(languageSession),
        },
      })

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
