import Section from '~/components/Section'
import type { Language, Translations } from '~/utils/i18n.server'
import ToolTabs, { TabTriggerType, TabContentType } from './ToolTabs'

interface Props {
  translation: Translations['tool'][Language]
}

export default function Tool({ translation }: Props) {
  const tabsTrigger: TabTriggerType[] = [
    { id: 'regular', name: translation['current-tools'] },
    { id: 'familiar', name: translation['familiar-tools'] },
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
          name: translation.other,
          content: ['TypeScript', 'Git & GitHub', 'Prettier', 'ESLint'],
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

  return (
    <Section
      scaleUpColor={true}
      id="tools"
      title={translation.title}
      description={translation.subtitle}
    >
      <ToolTabs tabsTrigger={tabsTrigger} tabsContent={tabsContent} />
    </Section>
  )
}
