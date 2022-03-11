import { Link } from 'remix'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = () => {
  throw new Response('Not Found', { status: 404 })
}

export function CatchBoundary() {
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
            404 error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-12 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-2 text-base text-gray-11">
            Sorry, we couldn’t find the page you’re looking for.
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
      <svg
        className="hidden self-center lg:block"
        width="860.13137"
        height="571.14799"
        viewBox="0 0 860.13137 571.14799"
      >
        <use href="/assets/images/undraw_page_not_found.svg#page-not-found" />
      </svg>
    </main>
  )
}

export default function NotFoundPage() {
  return <h1>You just land to no way land.</h1>
}
