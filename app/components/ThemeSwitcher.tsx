import clsx from 'clsx'
import { useMatches, useSubmit } from 'remix'
import { useTheme } from '~/hooks/useTheme'
import { ActionType } from '~/routes'
import * as Select from '@radix-ui/react-select'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['heroHeader'][Language]
}

export default function ThemeSwitcher({ translation }: Props) {
  const submit = useSubmit()
  const { theme } = useMatches()[0].data

  const optimisticTheme = useTheme(theme)

  function handleSubmit(theme: string) {
    submit(
      {
        action: ActionType.SET_THEME,
        theme,
      },
      { method: 'post', action: '?index', replace: true },
    )
  }

  return (
    <Select.Root
      name="language"
      value={optimisticTheme}
      onValueChange={handleSubmit}
    >
      <Select.Trigger
        className="flex items-center text-lg font-medium text-gray-11 hover:text-gray-12"
        aria-label={translation.mode}
      >
        <Select.Value>
          {optimisticTheme
            ? optimisticTheme === 'dark'
              ? translation.dark
              : translation.light
            : translation.system}
        </Select.Value>
        <Select.Icon className="ml-4" />
      </Select.Trigger>

      <Select.Content className="m-2 rounded-md border border-gray-6 bg-gray-3 p-2 shadow-lg shadow-gray-1">
        <Select.Viewport>
          <Select.Item
            disabled={optimisticTheme === 'system'}
            value={'system'}
            className={clsx(
              'select-none rounded-lg p-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none active:bg-gray-5',
              optimisticTheme === 'system'
                ? 'cursor-not-allowed bg-gray-5 text-gray-12'
                : 'cursor-pointer',
            )}
          >
            <Select.ItemText>{translation.system}</Select.ItemText>
          </Select.Item>

          <Select.Separator className="mx-1 my-2 h-px bg-gray-6" />

          <Select.Item
            disabled={optimisticTheme === 'light'}
            value="light"
            className={clsx(
              'select-none rounded-lg p-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none active:bg-gray-5',
              optimisticTheme === 'light'
                ? 'cursor-not-allowed bg-gray-5 text-gray-12'
                : 'cursor-pointer',
            )}
          >
            <Select.ItemText>{translation.light}</Select.ItemText>
          </Select.Item>

          <Select.Separator className="mx-1 my-2 h-px bg-gray-6" />

          <Select.Item
            disabled={optimisticTheme === 'dark'}
            value="dark"
            className={clsx(
              'select-none rounded-lg p-4 text-gray-11 focus:bg-gray-4 focus:text-gray-12 focus:outline-none active:bg-gray-5',
              optimisticTheme === 'dark'
                ? 'cursor-not-allowed bg-gray-5 text-gray-12'
                : 'cursor-pointer',
            )}
          >
            <Select.ItemText>{translation.dark}</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
