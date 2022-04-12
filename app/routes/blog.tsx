import type { MetaFunction } from '@remix-run/cloudflare'
import { Link, Outlet } from '@remix-run/react'
import discordSvg from '~/assets/icons/discord.svg'
import githubSvg from '~/assets/icons/github.svg'
import twitterSvg from '~/assets/icons/twitter.svg'

export const meta: MetaFunction = () => ({
  title: 'Blog | Jody Geraldo',
})

export default function BlogLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex h-16 items-center justify-between py-16">
        <Link
          to="/"
          className="flex items-center decoration-primary-9 decoration-wavy underline-offset-4 focus:underline focus:outline-none"
        >
          <h1 className="text-3xl font-medium tracking-tight text-primary-9">
            Jody Geraldo
          </h1>
        </Link>

        <a
          className="group rounded-full border-2 border-gray-7 p-3 transition hover:border-gray-8 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1"
          href="https://github.com/jodygeraldo/blog"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
            aria-hidden={true}
          >
            <use href={`${githubSvg}#id`} />
          </svg>

          <span className="sr-only">Source code on GitHub</span>
        </a>
      </header>

      <main className="py-16">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-7xl py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://discordapp.com/users/321585722182205440"
            className="text-gray-11 transition hover:text-gray-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Discord</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className="h-6 w-6"
              aria-hidden={true}
            >
              <use href={`${discordSvg}#id`} />
            </svg>
          </a>
          <a
            href="https://twitter.com/jodygeraldo_"
            className="text-gray-11 transition hover:text-gray-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Twitter</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className="h-6 w-6"
              aria-hidden={true}
            >
              <use href={`${twitterSvg}#id`} />
            </svg>
          </a>
          <a
            href="https://github.com/jodygeraldo"
            className="text-gray-11 transition hover:text-gray-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className="h-6 w-6"
              aria-hidden={true}
            >
              <use href={`${githubSvg}#id`} />
            </svg>
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-11">
            All rights reserved &copy; Jody Geraldo {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
    </div>
  )
}

export function handle() {
  return {
    noJs: true,
  }
}
