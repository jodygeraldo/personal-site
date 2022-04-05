import { Link } from '@remix-run/react'
import Error500ImageUrl from '~/assets/images/undraw_lost.svg'
import Error404ImageUrl from '~/assets/images/undraw_page_not_found.svg'
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
            <h1 className="text-3xl font-medium tracking-tight text-primary-9">
              Jody Geraldo
            </h1>
          </Link>
        </div>
        <div className="my-auto flex-shrink-0 py-16 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-9 lg:hidden">
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
          <p className="mt-2 text-base text-gray-11">
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
              className="text-base font-medium text-primary-9 hover:text-primary-10"
            >
              {translation ? translation['button'] : 'Back to home'}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      {page === 404 ? (
        <svg
          className="hidden self-center lg:block"
          width="860.13137"
          height="571.14799"
          viewBox="0 0 860.13137 571.14799"
        >
          <use href={`${Error404ImageUrl}#page-not-found`} />
        </svg>
      ) : (
        <svg
          className="hidden max-h-96 self-center lg:block"
          width="885.20079"
          height="708.31655"
          viewBox="0 0 885.20079 708.31655"
        >
          <use href={`${Error500ImageUrl}#lost`} />
        </svg>
      )}
    </main>
  )
}
