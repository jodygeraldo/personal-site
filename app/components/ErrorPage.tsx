import { Link } from '@remix-run/react'
import error500ImageUrl from '~/assets/images/undraw_lost.svg'
import error404ImageUrl from '~/assets/images/undraw_page_not_found.svg'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  page: 404 | 500
  message?: string
  translation?: Translations['error'][Language]
}

export default function ErrorPage({ translation, page, message }: Props) {
  return (
    <main className="mx-auto flex min-h-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex w-full flex-grow flex-col">
        <div className="flex-shrink-0 pt-10 sm:pt-16">
          <Link to="/" className="flex items-center">
            <p className="text-3xl font-medium tracking-tight text-primary-11">
              Jody Geraldo
            </p>
          </Link>
        </div>
        <div className="my-auto flex-shrink-0 py-16 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-11 lg:hidden">
            {page === 404 ? '404 error' : '500 error'}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-12 sm:text-5xl">
            {page === 404
              ? translation
                ? translation['title-404']
                : 'Page not found'
              : translation
              ? translation['title-500']
              : 'Internal server error'}
          </h1>
          <p className="mt-2 text-gray-11">
            {message
              ? message
              : page === 404
              ? translation
                ? translation['message-404']
                : 'Sorry, we couldn’t find the page you’re looking for.'
              : translation
              ? translation['message-500']
              : 'Sorry, something went wrong.'}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="font-medium text-primary-11 hover:text-primary-10"
            >
              {translation ? translation['button'] : 'Back to home'}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      {page === 404 ? (
        <img
          src={error404ImageUrl}
          alt=""
          aria-hidden={true}
          className="hidden max-h-96 self-center lg:block"
          width="860.13137"
          height="571.14799"
        />
      ) : (
        <img
          src={error500ImageUrl}
          alt=""
          aria-hidden={true}
          className="hidden max-h-96 self-center lg:block"
          width="860.13137"
          height="571.14799"
        />
      )}
    </main>
  )
}
