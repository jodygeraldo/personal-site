import Section from '~/components/Section'
import { getProjects } from '~/models/projects'
import type { Language, Translations } from '~/utils/i18n.server'
import ProjectItem from './ProjectItem'
interface Props {
  translation: Translations['project'][Language]
}

export default function Project({ translation }: Props) {
  const projects = getProjects(translation)

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
