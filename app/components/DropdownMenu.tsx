import {
  Arrow,
  Content,
  Item,
  Root,
  Trigger,
  TriggerItem,
} from '@radix-ui/react-dropdown-menu'
import { useMatches, useSubmit } from '@remix-run/react'
import Icon from '~/components/Icon'
import { useTheme } from '~/hooks/useTheme'
import { ActionType } from '~/routes'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function DropdownMenu({ translation, language }: Props) {
  const submit = useSubmit()
  const { theme } = useMatches()[0].data

  const optimisticTheme = useTheme(theme)

  function handleSubmitTheme(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    submit(
      { action: ActionType.SET_THEME, theme: e.currentTarget.value },
      { method: 'post', replace: true, action: '?index' },
    )
  }

  function handleSubmitLanguage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    submit(
      { action: ActionType.SET_LANGUAGE, language: e.currentTarget.value },
      { method: 'post', replace: true, action: '?index' },
    )
  }

  return (
    <Root>
      <Trigger
        className="group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1"
        aria-label={translation.setting}
      >
        <Icon
          id="gear"
          className="flex h-5 w-5 items-center justify-center text-gray-11 group-hover:text-gray-12"
        />
      </Trigger>

      <Content className="w-56 rounded-md bg-gray-3 p-2 shadow shadow-gray-2">
        <Root>
          <TriggerItem className="group flex select-none items-center justify-between rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5">
            <span>{translation.mode}</span>
            <Icon
              id="chevron-right"
              className="h-5 w-5 text-gray-11 group-focus:text-gray-12"
            />
          </TriggerItem>
          <Content className="w-56 rounded-md bg-gray-2 p-2 shadow shadow-gray-1">
            <Item
              disabled={optimisticTheme === 'system'}
              className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              asChild={true}
            >
              <button onClick={handleSubmitTheme} value="system">
                {translation.system}
              </button>
            </Item>
            <Item
              disabled={optimisticTheme === 'light'}
              className="mt-1 flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              asChild={true}
            >
              <button onClick={handleSubmitTheme} value="light">
                {translation.light}
              </button>
            </Item>
            <Item
              disabled={optimisticTheme === 'dark'}
              className="mt-1 flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              asChild={true}
            >
              <button onClick={handleSubmitTheme} value="dark">
                {translation.dark}
              </button>
            </Item>
          </Content>
        </Root>

        <Root>
          <TriggerItem className="group mt-1 flex select-none items-center justify-between rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5">
            <span>{translation.translation}</span>
            <Icon
              id="chevron-right"
              className="h-5 w-5 text-gray-11 group-focus:text-gray-12"
            />
          </TriggerItem>
          <Content className="w-56 rounded-md bg-gray-2 p-2 shadow shadow-gray-1">
            <input
              type="hidden"
              name="action"
              value={ActionType.SET_LANGUAGE}
            />
            <Item
              disabled={language === 'en'}
              className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              asChild={true}
            >
              <button onClick={handleSubmitLanguage} value="en">
                {translation.english}
              </button>
            </Item>
            <Item
              disabled={language === 'id'}
              className="mt-1 flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              asChild={true}
            >
              <button onClick={handleSubmitLanguage} value="id">
                {translation.indonesia}
              </button>
            </Item>
          </Content>
        </Root>

        <Arrow className="fill-gray-3" />
      </Content>
    </Root>
  )
}
