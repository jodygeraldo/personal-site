import { createCookieSessionStorage, Session } from 'remix'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__language',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['SECRET'],
      secure: process.env.NODE_ENV === 'production',
    },
  })

export type Language = 'en' | 'id'

function extractAcceptLanguageHeader(request: Request) {
  let language: Language = 'en'

  const checkLanguage = /(.*?)(?:[;|,](?:q=.*?[,|;])?)/g

  const acceptLanguageHeader = request.headers
    .get('Accept-Language')
    ?.match(checkLanguage)

  if (acceptLanguageHeader && acceptLanguageHeader[0].includes('id')) {
    language = 'id'
  }

  return language
}

async function getLanguage(request: Request): Promise<Language> {
  const session = await getSession(request.headers.get('Cookie'))

  const language: Language = session.has('language')
    ? session.get('language')
    : extractAcceptLanguageHeader(request)

  return language
}

async function setLanguage(
  request: Request,
  setTo: Language,
): Promise<Session> {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('language', setTo)

  return session
}

function getTranslations<Namespace extends keyof Translations>(
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
      translation: 'Change language',
      'switch-indonesia': 'Change to Bahasa Indonesia',
      'switch-english': 'Change to English',
      english: 'English',
      indonesia: 'Bahasa Indonesia',
    },
    id: {
      'open-menu': 'Buka menu utama',
      'close-menu': 'Tutup menu utama',
      contact: 'Kontak',
      'source-code': 'Source code website di github',
      translation: 'Ganti bahasa',
      'switch-indonesia': 'Ganti ke Bahasa Indonesia',
      'switch-english': 'Ganti ke Bahasa Inggris',
      english: 'English',
      indonesia: 'Bahasa Indonesia',
    },
  },
  intro: {
    en: {
      'title-1': 'Hi, I am Jody Geraldo,',
      'title-2': 'I am a web developer based in Indonesia',
      subtitle:
        'I spent most of my time crushing bugs while listening to music',
      button: 'Get to know me',
    },
    id: {
      'title-1': 'Halo, saya Jody Geraldo,',
      'title-2': 'Saya adalah seorang developer web',
      subtitle:
        'Sehari-hari menghabiskan waktu membersihkan bug sambil mendengarkan musik',
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
      'name-3': 'UI Design Daily with Tailwind',
      'description-3':
        'Collection of UIDesignDaily component built with Tailwind CSS, powered by SvelteKit and deployed on Cloudflare pages.',
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
      'name-3': 'UI Design Daily with Tailwind',
      'description-3':
        'Kumpulan komponen dari UIDesignDaily yang dibuat dengan Tailwind CSS, SvelteKit dan dideploy ke Cloudflare pages.',
    },
  },
  contact: {
    en: {
      title: 'Contact',
      subtitle: 'Here where you can find me',
      name: 'Name',
      message: 'Message',
      button: 'Send',
      buttonSubmitting: 'Sending...',
    },
    id: {
      title: 'Kontak',
      subtitle: 'Disini anda dapat menghubungi saya',
      name: 'Nama',
      message: 'Pesan',
      button: 'Kirim',
      buttonSubmitting: 'Mengirim...',
    },
  },
}

export {
  getLanguage,
  setLanguage,
  commitSession as commitLanguageSession,
  destroySession as destroyLanguageSession,
  getTranslations,
}
