import Section from '~/components/Section'
import ToolTabs, { TabTriggerType, TabContentType } from './ToolTabs'

const tabsTrigger: TabTriggerType[] = [
  { id: 'regular', name: 'Current Stack' },
  { id: 'familiar', name: 'Familiar' },
]

const tabsContent: TabContentType[] = [
  {
    id: 'regular',
    category: [
      { name: 'Library / Framework', content: ['React', 'Remix'] },
      {
        name: 'Style',
        content: ['Tailwind CSS', 'TailwindUI & HeadlessUI', 'Radix'],
      },
      {
        name: 'Other',
        content: ['Typescript', 'Git & Github', 'Prettier', 'Eslint'],
      },
    ],
  },
  {
    id: 'familiar',
    category: [
      { name: 'Library / Framework', content: ['Next', 'Vue', 'Svelte'] },
      {
        name: 'Database',
        content: ['PostgreSQL', 'Supabase'],
      },
      {
        name: 'Deployment',
        content: ['Vercel', 'Fly.io', 'Deno Deploy', 'Cloudflare Pages'],
      },
    ],
  },
]

export default function Tool() {
  return (
    <Section
      scaleUpColor={true}
      id="tools"
      title="Development Tools"
      description="Web development tools that push me productive"
    >
      <ToolTabs tabsTrigger={tabsTrigger} tabsContent={tabsContent} />
    </Section>
  )
}
