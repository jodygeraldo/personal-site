import {
  Arrow,
  Content,
  ItemIndicator,
  Label,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Trigger,
} from '@radix-ui/react-dropdown-menu'
import { useFetcher } from '@remix-run/react'
import { useContext } from 'react'
import Icon from '~/components/Icon'
import { ThemeContext } from '~/context/ThemeContext'
import { PreferenceAction } from '~/models/global'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function DropdownMenu({ translation, language }: Props) {
  const { submit: submitTheme } = useFetcher()
  const { submit: submitLanguage } = useFetcher()

  const { theme, updateTheme } = useContext(ThemeContext)

  function handleSubmitTheme(theme: string) {
    updateTheme(theme)
    submitTheme(
      { action: PreferenceAction.SET_THEME, theme },
      { method: 'post', replace: true, action: '/api/preference' },
    )
  }

  function handleSubmitLanguage(language: string) {
    submitLanguage(
      { action: PreferenceAction.SET_LANGUAGE, language },
      { method: 'post', replace: true, action: '/api/preference' },
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

      <Content className="min-w-max rounded-md bg-gray-3 p-2 shadow shadow-gray-2">
        <Label className="py-2 pl-8 text-sm text-gray-10">
          {translation.mode}
        </Label>
        <RadioGroup
          value={theme}
          className="space-y-1"
          onValueChange={handleSubmitTheme}
        >
          <RadioItem
            value="system"
            className="relative flex select-none items-center rounded-md py-2 pl-8 pr-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none"
          >
            <ItemIndicator className="absolute left-0 inline-flex items-center justify-center pl-2">
              <Icon id="dotFilled" className="h-5 w-5 fill-current" />
            </ItemIndicator>
            {translation.system}
          </RadioItem>
          <RadioItem
            value="light"
            className="relative flex select-none items-center rounded-md py-2 pl-8 pr-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none"
          >
            <ItemIndicator className="absolute left-0 inline-flex items-center justify-center pl-2">
              <Icon id="dotFilled" className="h-5 w-5 fill-current" />
            </ItemIndicator>
            {translation.light}
          </RadioItem>
          <RadioItem
            value="dark"
            className="relative flex select-none items-center rounded-md py-2 pl-8 pr-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none"
          >
            <ItemIndicator className="absolute left-0 inline-flex items-center justify-center pl-2">
              <Icon id="dotFilled" className="h-5 w-5 fill-current" />
            </ItemIndicator>
            {translation.dark}
          </RadioItem>
        </RadioGroup>

        <Separator className="my-2 h-0.5 bg-gray-6" />

        <Label className="py-2 pl-8 text-sm text-gray-10">
          {translation.translation}
        </Label>
        <RadioGroup
          value={language}
          className="space-y-1"
          onValueChange={handleSubmitLanguage}
        >
          <RadioItem
            value="en"
            className="relative flex select-none items-center rounded-md py-2 pl-8 pr-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none"
          >
            <ItemIndicator className="absolute left-0 inline-flex items-center justify-center pl-2">
              <Icon id="dotFilled" className="h-5 w-5 fill-current" />
            </ItemIndicator>
            {translation.english}
          </RadioItem>
          <RadioItem
            value="id"
            className="relative flex select-none items-center rounded-md py-2 pl-8 pr-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none"
          >
            <ItemIndicator className="absolute left-0 inline-flex items-center justify-center pl-2">
              <Icon id="dotFilled" className="h-5 w-5 fill-current" />
            </ItemIndicator>
            {translation.indonesia}
          </RadioItem>
        </RadioGroup>

        <Arrow className="fill-gray-3" />
      </Content>
    </Root>
  )
}
