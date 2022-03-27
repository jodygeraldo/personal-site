import type { Language, Translations } from '~/utils/i18n.server'
import * as Select from '@radix-ui/react-select'
import { useSubmit } from 'remix'
import { ActionType } from '~/routes'
import clsx from 'clsx'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
  isMobile?: boolean
}

export default function LanguageSwitcher({
  translation,
  language,
  isMobile,
}: Props) {
  const submit = useSubmit()

  function handleSubmit(language: string) {
    submit(
      {
        action: ActionType.SET_LANGUAGE,
        language,
      },
      { method: 'post', action: '?index', replace: true },
    )
  }

  if (isMobile) {
    return (
      <button
        onClick={() => handleSubmit(language === 'en' ? 'id' : 'en')}
        className="w-full rounded-md py-2 px-3 text-left text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
      >
        {language === 'en'
          ? translation['switch-indonesia']
          : translation['switch-english']}
      </button>
    )
  }

  return (
    <Select.Root name="language" value={language} onValueChange={handleSubmit}>
      <Select.Trigger
        className="flex items-center text-lg font-medium text-gray-11 hover:text-gray-12"
        aria-label={translation.translation}
      >
        <Select.Value>
          {language === 'en' ? translation.english : translation.indonesia}
        </Select.Value>
        <Select.Icon className="ml-4" />
      </Select.Trigger>

      <Select.Content className="m-2 rounded-md border border-gray-6 bg-gray-3 p-2 shadow-lg shadow-gray-1">
        <Select.Viewport>
          <Select.Item
            disabled={language === 'en'}
            value="en"
            className={clsx(
              'rounded-lg p-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none active:bg-gray-5',
              language === 'en'
                ? 'cursor-not-allowed bg-gray-5 text-gray-12'
                : 'cursor-pointer',
            )}
          >
            <Select.ItemText>{translation.english}</Select.ItemText>
          </Select.Item>

          <Select.Separator className="mx-1 my-2 h-px bg-gray-6" />

          <Select.Item
            disabled={language === 'id'}
            value="id"
            className={clsx(
              'rounded-lg p-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none active:bg-gray-5',
              language === 'id'
                ? 'cursor-not-allowed bg-gray-5 text-gray-12'
                : 'cursor-pointer',
            )}
          >
            <Select.ItemText>{translation.indonesia}</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
