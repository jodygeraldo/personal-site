import * as Popover from '@radix-ui/react-popover'
import { Link } from '@remix-run/react'
import Icon from '~/components/Icon'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import type { Language, Translations } from '~/utils/i18n.server'
import HeaderNavigation from './HeaderNavigation'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function Header({ translation, language }: Props) {
  return (
    <Popover.Root>
      <div className="flex h-16 justify-between py-16">
        <div className="flex w-full items-center justify-between">
          <Link to="/" className="flex items-center">
            <p className="text-3xl font-medium tracking-tight text-primary-11">
              Jody Geraldo
            </p>
          </Link>
          <HeaderNavigation translation={translation} language={language} />
        </div>

        <div className="flex items-center lg:hidden">
          <Popover.Trigger className="focus-ring-1 inline-flex items-center justify-center rounded-md p-1 text-gray-11 hover:bg-gray-2 hover:text-gray-12 state-open:hidden">
            <span className="sr-only">{translation['open-menu']}</span>
            <Icon
              id="hamburgerMenu"
              className="block h-6 w-6 text-gray-11 group-hover:text-gray-12"
              aria-hidden={true}
            />
          </Popover.Trigger>
        </div>
      </div>

      <Popover.Anchor className="absolute top-0 left-0 right-0" />
      <Popover.Content>
        <div className="relative mt-2 min-w-[95vw] divide-y divide-gray-6 rounded-lg bg-gray-2 shadow-lg ring-1 ring-gray-7 ring-opacity-5 sm:min-w-[97.5vw]">
          <Popover.Close className="focus-ring-1 absolute right-2 top-2 inline-flex items-center justify-center rounded-md p-1 text-gray-11 hover:bg-gray-3 hover:text-gray-12">
            <span className="sr-only">{translation['close-menu']}</span>
            <Icon
              id="cross"
              className="block h-6 w-6 text-gray-11 group-hover:text-gray-12"
              aria-hidden="true"
            />
          </Popover.Close>

          <div className="pt-3 pb-2">
            <div className="flex items-center justify-between px-4">
              <Link to="/">
                <p className="text-3xl font-medium tracking-tight text-primary-11">
                  Jody Geraldo
                </p>
              </Link>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link
                className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                to="/#section-contact"
              >
                {translation['contact']}
              </Link>
              <Link
                prefetch="intent"
                className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                to="/resume"
              >
                Resume
              </Link>
              <Link
                prefetch="intent"
                className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                to="/blog"
              >
                Blog
              </Link>
              <a
                className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                href="https://github.com/jodygeraldo/personal-site"
                target="_blank"
                rel="noreferrer noopener"
              >
                {translation['source-code']}
              </a>
            </div>
          </div>
          <div className="space-y-1 p-2">
            <LanguageSwitcher translation={translation} language={language} />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
