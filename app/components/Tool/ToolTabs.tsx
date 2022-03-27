import * as Tabs from '@radix-ui/react-tabs'

export type TabTriggerType = {
  id: string
  name: string
}

export type TabContentType = {
  id: string
  category: {
    name: string
    content: string[]
  }[]
}

interface Props {
  tabsTrigger: TabTriggerType[]
  tabsContent: TabContentType[]
}

export default function ToolTabs({ tabsTrigger, tabsContent }: Props) {
  return (
    <Tabs.Root defaultValue="regular">
      <Tabs.List aria-label="Tool tabs" className="flex">
        {tabsTrigger.map(({ id, name }) => (
          <Tabs.Trigger
            key={id}
            value={id}
            className="flex-1 items-start border-b border-gray-7 py-3 px-5 text-xl font-semibold text-gray-11 hover:border-gray-8 hover:text-gray-12 state-active:border-primary-12 state-active:text-gray-12"
          >
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabsContent.map(({ id, category }) => (
        <Tabs.Content
          key={id}
          value={id}
          className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
        >
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.map(({ name, content }) => (
              <li key={name} className="col-span-1 text-left">
                <h3 className="text-xl font-medium text-primary-9">{name}</h3>
                <ul className="mt-4 space-y-2">
                  {content.map((item) => (
                    <li className="text-gray-11" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
