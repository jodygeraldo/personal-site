import { Link } from 'remix'
import Icon from '~/components/Icon'
import type { Language, Translations } from '~/utils/i18n.server'
// import ThemeSwitcher from '~/components/ThemeSwitcher'

interface Props {
  translation: Translations['heroHeader'][Language]
}

export default function HeroHeaderNav({ translation }: Props) {
  return (
    <nav
      aria-label="Global"
      className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-6"
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
      <a
        className="group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8"
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
      {/* <ThemeSwitcher /> */}
    </nav>
  )
}
