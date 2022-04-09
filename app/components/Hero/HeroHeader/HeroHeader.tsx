import { Popover } from '@headlessui/react'
import { Link } from '@remix-run/react'
import Icon from '~/components/Icon'
import type { Language, Translations } from '~/utils/i18n.server'
import HeroHeaderNav from './HeroHeaderNav'
import HeroHeaderNavMobile from './HeroHeaderNavMobile'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function HeroHeader({ translation, language }: Props) {
  return (
    <Popover className="flex h-16 justify-between py-16">
      {({ close }) => (
        <>
          <div className="flex w-full items-center justify-between px-2 lg:px-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-medium tracking-tight text-primary-9">
                Jody Geraldo
              </h1>
            </Link>
            <HeroHeaderNav translation={translation} language={language} />
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-11 hover:bg-gray-2 hover:text-gray-12 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7">
              <span className="sr-only">{translation['open-menu']}</span>
              <Icon
                id="hamburger-menu"
                className="block h-6 w-6 text-gray-11 group-hover:text-gray-12"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>

          <HeroHeaderNavMobile
            translation={translation}
            setClose={close}
            language={language}
          />
        </>
      )}
    </Popover>
  )
}
