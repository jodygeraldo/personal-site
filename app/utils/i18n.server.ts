export type Language = 'en' | 'id'

export function isValidLanguage(language: unknown): language is Language {
  return language === 'en' || language === 'id'
}

export function getTranslations<
  RequestedTranslations extends keyof Translations,
>(lang: Language, requestedTranslations: Array<RequestedTranslations>) {
  let results: Record<RequestedTranslations, string> = {} as any
  for (let translation of requestedTranslations) {
    // @ts-ignore
    results[translation] = translations[translation][lang]
  }

  return results
}

type Translations = typeof translations
export type PickTranslations<TranslationKeys extends keyof Translations> =
  Record<TranslationKeys, string>

let translations = {
  All: {
    en: 'All',
    es: 'Todo',
  },
  'Intro Title 1': {
    en: 'Hi, I am Jody Geraldo,',
    id: 'Halo, saya Jody Geraldo,',
  },
  'Intro Title 2': {
    en: 'I am a web developer based in Indonesia',
    id: 'Saya adalah seorang developer web yang berasal dari Indonesia',
  },
  'Intro Subtitle 1': {
    en: 'I spent most of my time',
    id: 'Saya sehari-hari menghabiskan waktu',
  },
  'Intro Subtitle 2': {
    en: 'crushing bugs',
    id: 'membersihkan bug',
  },
  'Intro Subtitle 3': {
    en: 'while listening to music',
    id: 'sambil mendengarkan musik',
  },
  'Intro Cta': {
    en: 'Get to know me',
    id: 'Kenal lebih jauh',
  },
}
