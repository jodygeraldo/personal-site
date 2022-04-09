import type { Language, Translations } from '~/utils/i18n.server'

export interface ProjectItem {
  name: string
  description: string
  image: {
    url: string
    dark?: boolean
  }
  sourceCodeUrl: string
  demoUrl: string
  tags: string[]
}

const projects: Pick<
  ProjectItem,
  'name' | 'demoUrl' | 'image' | 'sourceCodeUrl' | 'tags'
>[] = [
  {
    name: 'UI Design Daily with Tailwind',
    image: {
      url: '/assets/images/ui-design-daily-tailwind.pages.dev.png',
      dark: true,
    },
    sourceCodeUrl: 'https://github.com/jodygeraldo/ui-design-daily-tailwind',
    demoUrl: 'https://ui-design-daily-tailwind.pages.dev/',
    tags: ['Design', 'UIDesignDaily.com', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    name: 'For Tomorrow You',
    image: {
      url: '/assets/images/for-tomorrow-you.vercel.app.png',
      dark: true,
    },
    sourceCodeUrl: 'https://github.com/jodygeraldo/for-tomorrow-you',
    demoUrl: 'https://for-tomorrow-you.vercel.app/',
    tags: ['React', 'Remix', 'Tailwind CSS', 'Supabase', 'Vercel'],
  },
  {
    name: 'Traveler Main',
    image: {
      url: '/assets/images/traveler-main.fly.dev.png',
    },
    sourceCodeUrl: 'https://github.com/jodygeraldo/traveler-main',
    demoUrl: 'https://traveler-main.fly.dev/',
    tags: ['React', 'Remix', 'Tailwind CSS', 'ProsgreSQL', 'Fly.io'],
  },
  {
    name: 'Get Fact API',
    image: {
      url: '/assets/images/get-fact.deno.dev.png',
    },
    sourceCodeUrl: 'https://github.com/jodygeraldo/get-fact',
    demoUrl: 'https://get-fact.deno.dev/',
    tags: ['Deno', 'Oak', 'Supabase', 'Deno Deploy'],
  },
]

function getProjects(
  translation: Translations['project'][Language],
): ProjectItem[] {
  return projects.map((project, idx) => ({
    ...project,
    // @ts-ignore
    description: translation[`description-${idx + 1}`],
  }))
}

export { getProjects }
