import Section from '../Section'
import ProjectItem from './ProjectItem'

const projects = [
  {
    name: 'Traveler Main',
    description:
      'Traveler Main is companion app for Genshin Impact where you can check daily things to do, and listing your items and character progression',
    imageUrl: 'test.jpeg',
    sourceCodeUrl: 'https://github.com/jodygeraldo/traveler-main',
    demoUrl: 'https://traveler-main.fly.dev/',
    builtWith: ['React', 'Remix', 'TailwindCSS', 'ProsgreSQL', 'Fly.io'],
  },
  {
    name: 'Get Fact API',
    description: 'Get a random or all fact from the database that you store',
    imageUrl: 'test.jpeg',
    sourceCodeUrl: 'https://github.com/jodygeraldo/get-fact',
    demoUrl: 'https://get-fact.deno.dev/',
    builtWith: ['Deno', 'Oak', 'Deno Deploy'],
  },
]

export default function Project() {
  return (
    <Section
      id="projects"
      title="Personal Project"
      description="Things that I made and experiment"
    >
      <ul className="space-y-12 sm:space-y-16">
        {projects.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </ul>
    </Section>
  )
}
