import { useEffect, useRef } from 'react'
import { Form, useTransition } from 'remix'
import { ActionType } from '~/routes'
import Icon from '../Icon'

export default function Contact() {
  const { submission } = useTransition()

  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (
      submission?.method === 'POST' &&
      submission.formData.get('action') === ActionType.SUBMIT_MESSSAGE
    ) {
      ref.current?.reset()
    }
  }, [submission])

  return (
    <section aria-labelledby="section-contact" className="relative bg-gray-1">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-2" />
      </div>
      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="bg-gray-2 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2
              id="section-contact"
              className="text-3xl font-extrabold tracking-tight text-gray-12 sm:text-4xl"
            >
              Contact
            </h2>
            <p className="mt-3 text-lg leading-6 text-primary-11">
              Get in touch with me.
            </p>
            <dl className="mt-8 text-base text-gray-11">
              <div>
                <dt className="sr-only">Email</dt>
                <dd className="flex">
                  <Icon
                    id="envelope-closed"
                    className="h-6 w-6 flex-shrink-0 text-gray-11"
                    aria-hidden={true}
                  />
                  <span className="ml-3">jody.geraldo.jg@gmail.com</span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Discord</dt>
                <dd className="flex">
                  <Icon
                    id="discord"
                    className="h-6 w-6 flex-shrink-0 text-gray-11"
                    aria-hidden={true}
                  />
                  <a
                    href="https://discordapp.com/users/321585722182205440"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-gray-11 hover:text-gray-12 hover:underline"
                  >
                    Odlareg#7899
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-gray-1 py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <Form
              ref={ref}
              method="post"
              replace={true}
              className="grid grid-cols-1 gap-y-6"
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7"
                  placeholder="Name"
                  required={true}
                  minLength={3}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7"
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7"
                  placeholder="Message"
                  required={true}
                  minLength={20}
                />
              </div>
              <div>
                <button
                  name="action"
                  value={ActionType.SUBMIT_MESSSAGE}
                  className="border-transparent inline-flex justify-center rounded-md border bg-gray-3 py-3 px-6 text-base font-medium text-gray-11 shadow-sm hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-6 active:bg-gray-5"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
