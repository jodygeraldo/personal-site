import { Form, useMatches } from 'remix'
import { useTheme } from '~/hooks/useTheme'
import { ActionType } from '~/routes'
import Icon from './Icon'

interface Props {
  isMobile?: boolean
}

export default function ThemeSwitcher({ isMobile }: Props) {
  const { theme } = useMatches()[0].data

  const optimisticTheme = useTheme(theme)

  return (
    <Form method="post" replace={true}>
      <button
        className="group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8"
        name="action"
        value={ActionType.SET_THEME}
      >
        <input
          type="hidden"
          name="theme"
          value={optimisticTheme === 'dark' ? 'light' : 'dark'}
        />
        {isMobile ? (
          optimisticTheme === 'dark' ? (
            'Switch to light theme'
          ) : (
            'Switch to dark theme'
          )
        ) : (
          <>
            <span className="sr-only">
              {optimisticTheme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'}
            </span>
            <Icon
              id={optimisticTheme === 'dark' ? 'moon' : 'sun'}
              className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
            />
          </>
        )}
      </button>
    </Form>
  )
}
