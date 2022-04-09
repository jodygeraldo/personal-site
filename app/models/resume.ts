import type { IconIdType } from '~/components/Icon'
import type { Language } from '~/utils/i18n.server'

const infos: {
  id: string
  icon?: IconIdType
  value: string
  link?: string
}[] = [
  { id: 'email', icon: 'envelope-closed', value: 'jody.geraldo.jg@gmail.com' },
  { id: 'phone', value: '+62 812 7318 6021' },
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

const projects = [
  {
    name: 'Portfolio Website',
    current: true,
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
    current: true,
    deployedTo: 'Cloudflare Pages',
    link: 'https://ui-design-daily-tailwind.pages.dev/',
    list: [
      'Implement pagination',
      'Translate uidesigndaily.com component(figma design) to HTML and Tailwind CSS',
    ],
  },
  {
    name: 'Notes app',
    current: false,
    deployedTo: 'Vercel',
    link: 'https://for-tomorrow-you.vercel.app/',
    list: [
      'Utilized Supabase auth to implement authentication system with email magic link and persisted in session cookie',
      'Utilized Supabase database to implement CRUD',
    ],
  },
  {
    name: 'Game companion',
    current: false,
    deployedTo: 'Fly.io',
    link: 'https://traveler-main.fly.dev/',
    list: [
      'Built authentication system with email and password persisted in session cookie',
      'Implement read and update data on PostgreSQL database through Prisma',
    ],
  },
]

function getResumeData(language: Language) {
  return {
    infos,
    projects,
  }
}

export { getResumeData }
