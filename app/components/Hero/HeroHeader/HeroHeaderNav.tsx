import { Link } from 'remix'
import Icon from '~/components/Icon'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import type { Language, Translations } from '~/utils/i18n.server'
import ThemeSwitcher from '~/components/ThemeSwitcher'

interface Props {
  translation: Translations['heroHeader'][Language]
  language: Language
}

export default function HeroHeaderNav({ translation, language }: Props) {
  return (
    <>
      <nav
        aria-label="Global"
        className="hidden lg:flex lg:items-center lg:gap-x-8"
      >
        <Link
          className="text-xl font-medium text-gray-11 transition-colors hover:text-gray-12"
          to="#section-contact"
        >
          {translation['contact']}
        </Link>
        <Link
          className="text-xl font-medium text-gray-11 transition-colors hover:text-gray-12"
          to="#"
        >
          Resume
        </Link>
      </nav>
      <div className="hidden lg:flex lg:items-center lg:gap-x-6">
        <a
          className="group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1"
          href="https://github.com/jodygeraldo/personal-site"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon
            id="github"
            className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
          />
          <span className="sr-only">{translation['source-code']}</span>
        </a>
        <ThemeSwitcher translation={translation} />
        <LanguageSwitcher translation={translation} language={language} />
      </div>
    </>
  )
}
