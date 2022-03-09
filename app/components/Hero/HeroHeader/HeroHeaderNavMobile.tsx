import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'remix'
import Icon from '~/components/Icon'
// import ThemeSwitcher from '~/components/ThemeSwitcher'

interface Props {
  setClose: () => void
}

export default function HeroHeaderNavMobile({ setClose }: Props) {
  return (
    <Transition.Root as={Fragment}>
      <div className="lg:hidden">
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus={true}
            className="absolute top-0 right-0 z-30 w-full max-w-none origin-top transform p-2 transition"
          >
            <div className="divide-y divide-gray-6 rounded-lg bg-gray-2 shadow-lg ring-1 ring-gray-7 ring-opacity-5">
              <div className="pt-3 pb-2">
                <div className="flex items-center justify-between px-4">
                  <Link to="/">
                    <h2 className="text-3xl font-medium tracking-tight text-primary-9">
                      Jody Geraldo
                    </h2>
                  </Link>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-11 hover:bg-gray-3 hover:text-gray-12 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7">
                      <span className="sr-only">Close menu</span>
                      <Icon
                        id="cross"
                        className="block h-6 w-6 text-gray-11 group-hover:text-gray-12"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                    to="#section-contact"
                    onClick={setClose}
                  >
                    Contact
                  </Link>
                  <Link
                    className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                    to="#"
                    onClick={setClose}
                  >
                    Resume
                  </Link>
                  <a
                    className="block w-full rounded-md py-2 px-3 text-lg font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12"
                    href="https://github.com/jodygeraldo"
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={setClose}
                  >
                    Website source code on github
                  </a>
                </div>
              </div>
              {/* <div className="px-2 pt-4 pb-2">
                <ThemeSwitcher isMobile={true} />
              </div> */}
            </div>
          </Popover.Panel>
        </Transition.Child>
      </div>
    </Transition.Root>
  )
}
