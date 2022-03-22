import type { Language, Translations } from '~/utils/i18n.server'
import Section from '../Section'
import ProjectItem from './ProjectItem'
import travelerMainImageUrl from '~/assets/images/traveler-main.webp'
import getFactImageUrl from '~/assets/images/get-fact.webp'
interface Props {
  translation: Translations['project'][Language]
}

export default function Project({ translation }: Props) {
  const projects = [
    {
      name: translation['name-1'],
      description: translation['description-1'],
      imageUrl: travelerMainImageUrl,
      sourceCodeUrl: 'https://github.com/jodygeraldo/traveler-main',
      demoUrl: 'https://traveler-main.fly.dev/',
      builtWith: ['React', 'Remix', 'TailwindCSS', 'ProsgreSQL', 'Fly.io'],
    },
    {
      name: translation['name-2'],
      description: translation['description-2'],
      imageUrl: getFactImageUrl,
      sourceCodeUrl: 'https://github.com/jodygeraldo/get-fact',
      demoUrl: 'https://get-fact.deno.dev/',
      builtWith: ['Deno', 'Oak', 'Supabase', 'Deno Deploy'],
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
