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
  project: {
    en: {
      title: 'Personal Project',
      subtitle: 'Things that I made and experiment',
      'name-1': 'Traveler Main',
      'description-1':
        'Traveler Main is companion app for Genshin Impact where you can check daily things to do, and listing your items and character progression',
      'name-2': 'Get Fact API',
      'description-2':
        'Get a random or all fact from the database that you store',
    },
    id: {
      title: 'Project Pribadi',
      subtitle: 'Project yang saya buat dan experimen',
      'name-1': 'Traveler Main',
      'description-1':
        'Traveler Main adalah aplikasi companion untuk Genshin Impact',
      'name-2': 'Get Fact API',
      'description-2':
        'Simpel API untuk mengambil data dari database yang anda simpan dengan api key yang berkaitan',
    },
  },
  contact: {
    en: {
      title: 'Contact',
      subtitle: 'Here where you can find me',
      name: 'Name',
      message: 'Message',
      button: 'Send',
    },
    id: {
      title: 'Kontak',
      subtitle: 'Disini anda dapat menghubungi saya',
      name: 'Nama',
      message: 'Pesan',
      button: 'Kirim',
    },
  },
}
