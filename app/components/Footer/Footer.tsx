import Icon, { IconId } from '../Icon'

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
  const fullYear = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        {socials.map((social) => (
          <a
            href={social.href}
            key={social.name}
            className="text-gray-11 hover:text-gray-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">{social.name}</span>
            <Icon id={social.iconId} className="h-6 w-6" aria-hidden={true} />
          </a>
        ))}
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-center text-base text-gray-11">
          All rights reserved &copy; Jody Geraldo {fullYear}.
        </p>
      </div>
    </footer>
  )
}
