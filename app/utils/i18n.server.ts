export type Language = 'en' | 'id'

// setup session later

export function getLanguage(request: Request) {
  let language: Language = 'en'

  const checkLanguage = /(.*?)(?:[;|,](?:q=.*?[,|;])?)/g

  const acceptLanguageHeader = request.headers
    .get('Accept-Language')
    ?.match(checkLanguage)

  if (
    acceptLanguageHeader &&
    (acceptLanguageHeader as string[])[0].includes('id')
  ) {
    language = 'id'
  }

  return language
}

export function isValidLanguage(language: unknown): language is Language {
  return language === 'en' || language === 'id'
}

export function getTranslations<Namespace extends keyof Translations>(
  lang: Language,
  namespace: Namespace,
) {
  const result: Translations[Namespace][Language] =
    translations[namespace][lang]

  return result
}

export type Translations = typeof translations
const translations = {
  error: {
    en: {
      'title-404': 'Page not found',
      'title-500': 'Internal server error',
      'message-404': 'Sorry, we couldn’t find the page you’re looking for.',
      'message-500': 'Sorry, something went wrong.',
      button: 'Back to home',
    },
    id: {
      'title-404': 'Halaman tidak ditemukan',
      'title-500': 'Terjadi kesalahan pada server',
      'message-404': 'Maaf, kami tidak dapat menemukan halaman yang Anda cari.',
      'message-500': 'Maaf, terjadi kesalahan pada sistem.',
      button: 'Kembali ke beranda',
    },
  },
  heroHeader: {
    en: {
      'open-menu': 'Open main menu',
      'close-menu': 'Close main menu',
      contact: 'Contact',
      'source-code': 'Website source code on github',
    },
    id: {
      'open-menu': 'Buka menu utama',
      'close-menu': 'Tutup menu utama',
      contact: 'Kontak',
      'source-code': 'Source code website di github',
    },
  },
  intro: {
    en: {
      'title-1': 'Hi, I am Jody Geraldo,',
      'title-2': 'I am a web developer based in Indonesia',
      'subtitle-1': 'I spent most of my time',
      'subtitle-2': 'crushing bugs',
      'subtitle-3': 'while listening to music',
      button: 'Get to know me',
    },
    id: {
      'title-1': 'Halo, saya Jody Geraldo,',
      'title-2': 'Saya adalah seorang developer web',
      'subtitle-1': 'Sehari-hari menghabiskan waktu',
      'subtitle-2': 'membersihkan bug',
      'subtitle-3': 'sambil mendengarkan musik',
      button: 'Kenal lebih jauh',
    },
  },
  getFact: {
    en: {
      button: 'Generate',
    },
    id: {
      button: 'Generate',
    },
  },
  tool: {
    en: {
      title: 'Development Tools',
      subtitle: 'Web development tools that push me productive',
      'current-tools': 'Current Stack',
      'familiar-tools': 'Familiar',
      other: 'Other',
    },
    id: {
      title: 'Development Tools',
      subtitle: 'Tools development yang mendorong saya produktif',
      'current-tools': 'Aktif digunakan',
      'familiar-tools': 'Familiar',
      other: 'Lainnya',
    },
  },
}
