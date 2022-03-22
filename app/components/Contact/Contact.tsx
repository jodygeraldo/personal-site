import { useEffect, useRef } from 'react'
import { useFetcher } from 'remix'
import { ActionType } from '~/routes'
import type { ActionData as IndexActionData } from '~/routes'
import Icon from '~/components/Icon'
import NotificationToast from '~/components/NotificationToast'
import type { Language, Translations } from '~/utils/i18n.server'
import { useHydrated } from '~/hooks/useHydrated'
import clsx from 'clsx'

interface Props {
  translation: Translations['contact'][Language]
}

export default function Contact({ translation }: Props) {
  const isHydrated = useHydrated()
  const fetcher = useFetcher<IndexActionData>()

  const ref = useRef<HTMLFormElement>(null)

  const fetcherSubmiting =
    fetcher.submission?.formData.get('action') === ActionType.SUBMIT_MESSSAGE

  useEffect(() => {
    if (fetcher.submission && fetcherSubmiting) {
      ref.current?.reset()
    }
  }, [fetcher.submission, fetcherSubmiting])

  const messages = fetcher.data?.fieldErrors
    ? Object.entries(fetcher.data.fieldErrors).map(([_, value]) => value)
    : fetcher.data?.extendedMessage
    ? fetcher.data.extendedMessage
    : undefined

  return (
    <section aria-labelledby="section-contact" className="relative bg-gray-1">
      {fetcher.data && fetcher.data.statusMessage && messages ? (
        <NotificationToast
          title={fetcher.data.statusMessage}
          variant={fetcher.data.type}
          messages={messages}
        />
      ) : null}
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
              {translation.title}
            </h2>
            <p className="mt-3 text-xl text-primary-11">
              {translation.subtitle}
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
            <fetcher.Form
              ref={ref}
              method="post"
              replace={true}
              className="grid grid-cols-1 gap-y-6"
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  {translation.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  aria-invalid={
                    fetcher.data?.fieldErrors?.name ? true : undefined
                  }
                  aria-describedby={
                    fetcher.data?.fieldErrors?.name && 'name-error'
                  }
                  autoComplete="name"
                  className={clsx(
                    fetcher.data?.fieldErrors?.name &&
                      'invalid:border-variable',
                    'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7',
                  )}
                  placeholder="Name"
                  required={true}
                  minLength={3}
                  defaultValue={fetcher.data?.fields?.name}
                />
                {fetcher.data?.fieldErrors?.name ? (
                  <p className="mt-2 text-sm text-variable" id="name-error">
                    {fetcher.data.fieldErrors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  aria-invalid={
                    fetcher.data?.fieldErrors?.email ? true : undefined
                  }
                  aria-describedby={
                    fetcher.data?.fieldErrors?.email && 'email-error'
                  }
                  autoComplete="email"
                  className={clsx(
                    fetcher.data?.fieldErrors?.email &&
                      'invalid:border-variable',
                    'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7',
                  )}
                  placeholder="Email"
                  required={true}
                  defaultValue={fetcher.data?.fields?.email}
                />
                {fetcher.data?.fieldErrors?.email ? (
                  <p className="mt-2 text-sm text-variable" id="email-error">
                    {fetcher.data.fieldErrors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  {translation.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  aria-invalid={
                    fetcher.data?.fieldErrors?.message ? true : undefined
                  }
                  aria-describedby={
                    fetcher.data?.fieldErrors?.message && 'message-error'
                  }
                  rows={4}
                  className={clsx(
                    fetcher.data?.fieldErrors?.message &&
                      'invalid:border-variable',
                    'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:border-gray-7 focus:ring-gray-7',
                  )}
                  placeholder="Message"
                  required={true}
                  minLength={20}
                  defaultValue={fetcher.data?.fields?.message}
                />
                {fetcher.data?.fieldErrors?.message ? (
                  <p className="mt-2 text-sm text-variable" id="message-error">
                    {fetcher.data.fieldErrors.message}
                  </p>
                ) : null}
              </div>
              <div>
                <button
                  name="action"
                  value={ActionType.SUBMIT_MESSSAGE}
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-3 py-3 px-6 text-base font-medium text-gray-11 shadow-sm hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1 active:bg-gray-5 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isHydrated || fetcherSubmiting}
                >
                  {fetcherSubmiting
                    ? translation.buttonSubmitting
                    : translation.button}
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </section>
  )
}
