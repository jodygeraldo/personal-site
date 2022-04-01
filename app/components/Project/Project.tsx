import type { Language, Translations } from '~/utils/i18n.server'
import Section from '../Section'
import ProjectItem, { ProjectItemProps } from './ProjectItem'
interface Props {
  translation: Translations['project'][Language]
}

export default function Project({ translation }: Props) {
  const projects: ProjectItemProps[] = [
    {
      name: 'UI Design Daily with Tailwind',
      description: translation['description-1'],
      imageUrl: {
        default: '/assets/images/ui-design-daily-tailwind/384x216.png',
        dark: true,
        sources: [
          {
            url: '/assets/images/ui-design-daily-tailwind/384x216.avif',
            media: '(max-width: 639px)',
            type: 'avif',
          },
          {
            url: '/assets/images/ui-design-daily-tailwind/384x216.webp',
            media: '(max-width: 639px)',
            type: 'webp',
          },
          {
            url: '/assets/images/ui-design-daily-tailwind/640x360.avif',
            media: '(min-width: 640px)',
            type: 'avif',
          },
          {
            url: '/assets/images/ui-design-daily-tailwind/640x360.webp',
            media: '(min-width: 640px)',
            type: 'webp',
          },
          {
            url: '/assets/images/ui-design-daily-tailwind/640x360.png',
            media: '(min-width: 640px)',
            type: 'png',
          },
        ],
      },
      sourceCodeUrl: 'https://github.com/jodygeraldo/ui-design-daily-tailwind',
      demoUrl: 'https://ui-design-daily-tailwind.pages.dev/',
      tags: ['Design', 'UIDesignDaily.com', 'Tailwind CSS', 'Cloudflare Pages'],
    },
    {
      name: 'For Tomorrow You',
      description: translation['description-2'],
      imageUrl: {
        default: '/assets/images/for-tomorrow-you/384x216.png',
        dark: true,
        sources: [
          {
            url: '/assets/images/for-tomorrow-you/384x216.avif',
            media: '(max-width: 639px)',
            type: 'avif',
          },
          {
            url: '/assets/images/for-tomorrow-you/384x216.webp',
            media: '(max-width: 639px)',
            type: 'webp',
          },
          {
            url: '/assets/images/for-tomorrow-you/640x360.avif',
            media: '(min-width: 640px)',
            type: 'avif',
          },
          {
            url: '/assets/images/for-tomorrow-you/640x360.webp',
            media: '(min-width: 640px)',
            type: 'webp',
          },
          {
            url: '/assets/images/for-tomorrow-you/640x360.png',
            media: '(min-width: 640px)',
            type: 'png',
          },
        ],
      },
      sourceCodeUrl: 'https://github.com/jodygeraldo/for-tomorrow-you',
      demoUrl: 'https://for-tomorrow-you.vercel.app/',
      tags: ['React', 'Remix', 'Tailwind CSS', 'Supabase', 'Vercel'],
    },
    {
      name: 'Traveler Main',
      description: translation['description-3'],
      imageUrl: {
        default: '/assets/images/traveler-main/384x216.png',
        sources: [
          {
            url: '/assets/images/traveler-main/384x216.avif',
            media: '(max-width: 639px)',
            type: 'avif',
          },
          {
            url: '/assets/images/traveler-main/384x216.webp',
            media: '(max-width: 639px)',
            type: 'webp',
          },
          {
            url: '/assets/images/traveler-main/640x360.avif',
            media: '(min-width: 640px)',
            type: 'avif',
          },
          {
            url: '/assets/images/traveler-main/640x360.webp',
            media: '(min-width: 640px)',
            type: 'webp',
          },
          {
            url: '/assets/images/traveler-main/640x360.png',
            media: '(min-width: 640px)',
            type: 'png',
          },
        ],
      },
      sourceCodeUrl: 'https://github.com/jodygeraldo/traveler-main',
      demoUrl: 'https://traveler-main.fly.dev/',
      tags: ['React', 'Remix', 'Tailwind CSS', 'ProsgreSQL', 'Fly.io'],
    },
    {
      name: 'Get Fact API',
      description: translation['description-4'],
      imageUrl: {
        default: '/assets/images/get-fact/384x216.png',
        sources: [
          {
            url: '/assets/images/get-fact/384x216.avif',
            media: '(max-width: 639px)',
            type: 'avif',
          },
          {
            url: '/assets/images/get-fact/384x216.webp',
            media: '(max-width: 639px)',
            type: 'webp',
          },
          {
            url: '/assets/images/get-fact/640x360.avif',
            media: '(min-width: 640px)',
            type: 'avif',
          },
          {
            url: '/assets/images/get-fact/640x360.webp',
            media: '(min-width: 640px)',
            type: 'webp',
          },
          {
            url: '/assets/images/get-fact/640x360.png',
            media: '(min-width: 640px)',
            type: 'png',
          },
        ],
      },
      sourceCodeUrl: 'https://github.com/jodygeraldo/get-fact',
      demoUrl: 'https://get-fact.deno.dev/',
      tags: ['Deno', 'Oak', 'Supabase', 'Deno Deploy'],
    },
  ]

  return (
    <Section
      id="projects"
      title={translation.title}
      description={translation.subtitle}
    >
      <ul className="space-y-12 sm:space-y-16">
        {projects.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </ul>
    </Section>
  )
}
