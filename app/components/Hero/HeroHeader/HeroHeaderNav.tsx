import { Link } from 'remix'
import Icon from '~/components/Icon'
import ThemeSwitcher from '~/components/ThemeSwitcher'

export default function HeroHeaderNav() {
  return (
    <nav
      aria-label="Global"
      className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
    >
      <Link
        className="text-xl font-medium text-gray-11 transition-colors hover:text-gray-12"
        to="#section-contact"
      >
        Contact
      </Link>
      <Link
        className="text-xl font-medium text-gray-11 transition-colors hover:text-gray-12"
        to="#"
      >
        Resume
      </Link>
      <a
        className="group rounded-full border-2 border-gray-7 p-3 transition-colors hover:border-gray-8"
        // this should link to website source code repository on github not to the account
        href="https://github.com/jodygeraldo"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon
          id="github"
          className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
        />
        <span className="sr-only">Website source code on github</span>
      </a>
      <ThemeSwitcher />
    </nav>
  )
}
