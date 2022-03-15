import { RemixI18Next } from 'remix-i18next'
import type { Backend, Language } from 'remix-i18next'
import invariant from 'tiny-invariant'

const translations: {
  en: {}
  id: {}
} = {
  en: {
    common: {
      'welcome-msg': 'Welcome to a translated remix app !',
      'generated-date-msg': 'This page was rendered at {{date}}',
    },
    hero: {},
    tool: {},
    project: {},
    contact: {},
    error: {
      'title-404': 'Page not found',
      'title-500': 'Internal server error',
      'message-404': 'The page you are looking for does not exist.',
      'message-500': 'An internal server error occurred.',
      cta: 'Go back home',
    },
  },
  id: {
    common: {
      'welcome-msg': 'Bienvenue sur une app Remix traduite !',
      'generated-date-msg': 'Cette page a été générée à {{date}}',
    },
    hero: {},
    tool: {},
    project: {},
    contact: {},
    error: {
      'title-404': 'Halaman tidak ditemukan',
      'title-500': 'Internal server error',
      'message-404': 'Halaman yang anda cari tidak ditemukan.',
      'message-500': 'Terjadi kesalahan pada server.',
      cta: 'Kembali ke beranda',
    },
  },
}

const backend: Backend = {
  async getTranslations(namespace, locale): Promise<Language> {
    console.log('slowly getting translations for', namespace, locale)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log('done')

    invariant(
      locale === 'en' || locale === 'id',
      'the supported languages are only en and id',
    )
    // @ts-ignore
    return translations[locale][namespace]
  },
}

export let i18n = new RemixI18Next(backend, {
  fallbackLng: 'en', // here configure your default (fallback) language
  supportedLanguages: ['id', 'en'], // here configure your supported languages
})
