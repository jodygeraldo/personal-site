import { useFetcher } from '@remix-run/react'
import { PreferenceAction } from '~/models/global'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function LanguageSwitcher({ translation, language }: Props) {
  const { submit } = useFetcher()

  function handleSubmit(language: string) {
    submit(
      {
        action: PreferenceAction.SET_LANGUAGE,
        language,
      },
      { method: 'post', action: '/api/preference', replace: true },
    )
  }

  return (
    <button
      type="button"
      onClick={() => handleSubmit(language === 'en' ? 'id' : 'en')}
      className="w-full rounded-md py-2 px-3 text-left text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
    >
      {language === 'en'
        ? translation['switch-indonesia']
        : translation['switch-english']}
    </button>
  )
}
