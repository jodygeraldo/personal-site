import {
  Arrow,
  Content,
  RadioGroup,
  RadioItem,
  Root,
  Trigger,
  TriggerItem,
} from '@radix-ui/react-dropdown-menu'
import { useFetcher, useMatches } from '@remix-run/react'
import Icon from '~/components/Icon'
import { useTheme } from '~/hooks/useTheme'
import { ActionType } from '~/routes'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function DropdownMenu({ translation, language }: Props) {
  const { submit: submitTheme } = useFetcher()
  const { submit: submitLanguage } = useFetcher()
  const { theme } = useMatches()[0].data

  const optimisticTheme = useTheme(theme)

  function handleSubmitTheme(theme: string) {
    submitTheme(
      { action: ActionType.SET_THEME, theme },
      { method: 'post', replace: true, action: '/?index' },
    )
  }

  function handleSubmitLanguage(language: string) {
    submitLanguage(
      { action: ActionType.SET_LANGUAGE, language },
      { method: 'post', replace: true, action: '/?index' },
    )
  }

  return (
    <Root>
      <Trigger
        className="focus-ring-1 group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8"
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
              id="chevronRight"
              className="h-5 w-5 text-gray-11 group-focus:text-gray-12"
            />
          </TriggerItem>
          <Content className="w-56 rounded-md bg-gray-2 p-2 shadow shadow-gray-1">
            <RadioGroup
              value={optimisticTheme}
              className="space-y-1"
              onValueChange={handleSubmitTheme}
            >
              <RadioItem
                value="system"
                disabled={optimisticTheme === 'system'}
                className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              >
                {translation.system}
              </RadioItem>
              <RadioItem
                value="light"
                disabled={optimisticTheme === 'light'}
                className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              >
                {translation.light}
              </RadioItem>
              <RadioItem
                value="dark"
                disabled={optimisticTheme === 'dark'}
                className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              >
                {translation.dark}
              </RadioItem>
            </RadioGroup>
          </Content>
        </Root>

        <Root>
          <TriggerItem className="group mt-1 flex select-none items-center justify-between rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5">
            <span>{translation.translation}</span>
            <Icon
              id="chevronRight"
              className="h-5 w-5 text-gray-11 group-focus:text-gray-12"
            />
          </TriggerItem>
          <Content className="w-56 rounded-md bg-gray-2 p-2 shadow shadow-gray-1">
            <RadioGroup
              value={language}
              className="space-y-1"
              onValueChange={handleSubmitLanguage}
            >
              <RadioItem
                value="en"
                disabled={language === 'en'}
                className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              >
                {translation.english}
              </RadioItem>
              <RadioItem
                value="id"
                disabled={language === 'id'}
                className="flex w-full select-none items-center rounded-md p-4 text-lg text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none state-open:bg-gray-5 focus:state-open:bg-gray-4 data-disabled:bg-gray-5"
              >
                {translation.indonesia}
              </RadioItem>
            </RadioGroup>
          </Content>
        </Root>

        <Arrow className="fill-gray-3" />
      </Content>
    </Root>
  )
}
