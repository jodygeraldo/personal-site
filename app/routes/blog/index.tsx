import { Link } from '@remix-run/react'
import arrowTopRightSvg from '~/assets/icons/arrow-top-right.svg'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export default function BlogPage() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((data) => (
        <li key={data} className="relative col-span-1 rounded bg-gray-3 p-4">
          <Link
            to={'/blog/1'}
            className="group absolute inset-0 rounded ring-gray-7 ring-offset-2 ring-offset-gray-1 transition hover:ring-2 focus:outline-none focus:ring-2"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className="absolute top-2 right-2 h-5 w-5 text-gray-11 group-hover:text-gray-12 group-focus:text-gray-12"
              aria-hidden={true}
            >
              <use href={`${arrowTopRightSvg}#id`} />
            </svg>
            <span className="sr-only">Link to blog</span>
          </Link>

          <div>
            <h3 className="pr-8 text-primary-12">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h3>

            <time
              dateTime="2022-04-12T07:57:16.734Z"
              className="mt-1 inline-block min-w-fit rounded-sm bg-gray-2 px-4 py-2 text-primary-11"
            >
              12 July 2022
            </time>
          </div>
        </li>
      ))}
    </ul>
  )
}
