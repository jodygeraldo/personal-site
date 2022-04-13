import Icon from '~/components/Icon'
import type { IconId } from '~/models/icons'

const socials: { name: string; href: string; iconId: IconId }[] = [
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/321585722182205440',
    iconId: 'discord',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/jodygeraldo_',
    iconId: 'twitter',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/jodygeraldo',
    iconId: 'github',
  },
]

export default function Footer() {
  return (
    <footer className="pb-12 lg:flex lg:items-center lg:justify-between">
      <div className="flex justify-center space-x-6 lg:order-2">
        {socials.map((social) => (
          <a
            href={social.href}
            key={social.name}
            className="text-gray-11 transition hover:text-gray-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">{social.name}</span>
            <Icon id={social.iconId} className="h-6 w-6" aria-hidden={true} />
          </a>
        ))}
      </div>
      <div className="mt-8 lg:order-1 lg:mt-0">
        <p className="text-center text-gray-11">
          All rights reserved &copy; Jody Geraldo {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  )
}
