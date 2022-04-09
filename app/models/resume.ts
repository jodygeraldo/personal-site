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
    list: [
      'Designed the overall website',
      'Implement i18n for English and Bahasa Indonesia',
      'Implement light theme and dark theme',
      'Utilized Elastic Email to implement contact form',
      'Deployed to Cloudflare Pages (jodygeraldo.com)',
    ],
  },
  {
    name: 'UI Design Daily with Tailwind CSS',
    current: true,
    list: [
      'Implement pagination',
      'Translate uidesigndaily.com component(figma design) to HTML and Tailwind CSS',
      'Deployed to Cloudflare Pages (ui-design-daily-tailwind.pages.dev)',
    ],
  },
  {
    name: 'Notes app',
    current: false,
    list: [
      'Utilized Supabase auth to implement authentication system with email magic link and persisted in session cookie',
      'Utilized Supabase database to implement CRUD',
      'Deployed to Vercel (for-tomorrow-you.vercel.app)',
    ],
  },
  {
    name: 'Game companion',
    current: false,
    list: [
      'Built authentication system with email and password persisted in session cookie',
      'Implement read and update data on PostgreSQL database through Prisma',
      'Deployed to Fly.io (traveler-main.fly.dev)',
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
