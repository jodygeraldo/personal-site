import { Link } from 'remix'

interface Props {
  page: 404 | 500
  message?: string
}

export default function ErrorPage({ page, message }: Props) {
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
            {page === 404 ? 'Page not found' : 'Internal server error'}
          </h1>
          <p className="mt-2 text-base text-gray-11">
            {message
              ? message
              : page === 404
              ? 'Sorry, we couldn’t find the page you’re looking for.'
              : 'Sorry, something went wrong.'}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-base font-medium text-primary-9 hover:text-primary-10"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
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
          <use href="/assets/images/undraw_page_not_found.svg#page-not-found" />
        </svg>
      ) : (
        <svg
          className="hidden max-h-96 self-center lg:block"
          width="885.20079"
          height="708.31655"
          viewBox="0 0 885.20079 708.31655"
        >
          <use href="/assets/images/undraw_lost.svg#lost" />
        </svg>
      )}
    </main>
  )
}