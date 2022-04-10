import type { IconIdType } from '~/components/Icon'
import type { Language } from '~/utils/i18n.server'

const infos: {
  id: string
  icon?: IconIdType
  value: string
  link?: string
}[] = [
  {
    id: 'email',
    icon: 'envelope-closed',
    value: 'jody.geraldo.jg@gmail.com',
  },
  { id: 'location', value: 'Bangka Belitung, ID' },
  {
    id: 'website',
    icon: 'globe',
    value: 'jodygeraldo.com',
    link: 'https://jodygeraldo.com',
  },
  {
    id: 'github',
    icon: 'github',
    value: 'jodygeraldo',
    link: 'https://github.com/jodygeraldo',
  },
]

const projects: {
  [key in Language]: {
    name: string
    deployedTo: string
    link: string
    list: string[]
  }[]
} = {
  en: [
    {
      name: 'Portfolio Website',
      deployedTo: 'Cloudflare Pages',
      link: 'https://jodygeraldo.com/',
      list: [
        'Designed the overall website',
        'Implement i18n for English and Bahasa Indonesia',
        'Implement light theme and dark theme',
        'Utilized Elastic Email to implement contact form',
      ],
    },
    {
      name: 'UI Design Daily with Tailwind CSS',
      deployedTo: 'Cloudflare Pages',
      link: 'https://ui-design-daily-tailwind.pages.dev/',
      list: [
        'Implement pagination',
        'Translate uidesigndaily.com component(figma design) to HTML with Tailwind CSS',
      ],
    },
    {
      name: 'Notes app',
      deployedTo: 'Vercel',
      link: 'https://for-tomorrow-you.vercel.app/',
      list: [
        'Utilized Supabase auth to implement authentication system with email magic link and persisted in session cookie',
        'Utilized Supabase database to implement CRUD',
      ],
    },
    {
      name: 'Game companion',
      deployedTo: 'Fly.io',
      link: 'https://traveler-main.fly.dev/',
      list: [
        'Built authentication system with email and password persisted in session cookie',
        'Implement read and update data on PostgreSQL database through Prisma',
      ],
    },
  ],
  id: [
    {
      name: 'Website Portfolio',
      deployedTo: 'Cloudflare Pages',
      link: 'https://jodygeraldo.com/',
      list: [
        'Desain keseluruhan website',
        'Mengimplementasikan i18n(lokalisasi) untuk bahasa Inggris dan bahasa Indonesia',
        'Mengimplementasikan tema cerah dan gelap',
        'Menggunakan Elastic Email untuk mengimplementasikan form kontak',
      ],
    },
    {
      name: 'UI Design Daily with Tailwind CSS',

      deployedTo: 'Cloudflare Pages',
      link: 'https://ui-design-daily-tailwind.pages.dev/',
      list: [
        'Mengimplementasikan pagination',
        'Mengimplementasikan komponen uidesigndaily.com(desain figma) menjadi HTML dengan Tailwind CSS',
      ],
    },
    {
      name: 'Notes app',
      deployedTo: 'Vercel',
      link: 'https://for-tomorrow-you.vercel.app/',
      list: [
        'Menggunakan Supabase auth untuk mengimplementasikan sistem otentikasi dengan email magic link dan disimpan di session cookie',
        'Menggunakan Supabase database untuk mengimplementasikan CRUD',
      ],
    },
    {
      name: 'Game companion',
      deployedTo: 'Fly.io',
      link: 'https://traveler-main.fly.dev/',
      list: [
        'Membangun sistem otentikasi dengan email dan password disimpan di session cookie',
        'Mengimplementasikan read dan update pada database PostgreSQL melalui Prisma',
      ],
    },
  ],
}

function getResumeData(language: Language) {
  return {
    infos,
    projects: projects[language],
  }
}

export { getResumeData }
