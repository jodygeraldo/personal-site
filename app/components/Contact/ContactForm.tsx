import { useFetcher } from '@remix-run/react'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useHydrated } from '~/hooks/useHydrated'
import type { ActionData as IndexActionData } from '~/routes'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['contact'][Language]
}

export default function ContactForm({ translation }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const isHydrated = useHydrated()
  const [busy, setBusy] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher<IndexActionData>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!executeRecaptcha) return

    setBusy(true)
    const formData = new FormData(e.currentTarget)

    const token = await executeRecaptcha('submit')
    formData.append('token', token)

    fetcher.submit(formData, {
      method: 'post',
      action: '/?index',
      replace: true,
    })
    ref.current?.reset()

    setBusy(false)
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
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
          aria-invalid={fetcher.data?.fieldErrors?.name ? true : undefined}
          aria-describedby={fetcher.data?.fieldErrors?.name && 'name-error'}
          autoComplete="name"
          className={clsx(
            fetcher.data?.fieldErrors?.email
              ? 'invalid:border-red'
              : 'focus:border-gray-7',
            'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:ring-gray-7 focus:valid:border-gray-7',
          )}
          placeholder="Name"
          required={true}
          minLength={3}
          defaultValue={fetcher.data?.fields?.name}
        />
        {fetcher.data?.fieldErrors?.name ? (
          <p className="mt-2 text-sm text-red" id="name-error">
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
          aria-invalid={fetcher.data?.fieldErrors?.email ? true : undefined}
          aria-describedby={fetcher.data?.fieldErrors?.email && 'email-error'}
          autoComplete="email"
          className={clsx(
            fetcher.data?.fieldErrors?.email
              ? 'invalid:border-red'
              : 'focus:border-gray-7',
            'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:ring-gray-7 focus:valid:border-gray-7',
          )}
          placeholder="Email"
          required={true}
          defaultValue={fetcher.data?.fields?.email}
        />
        {fetcher.data?.fieldErrors?.email ? (
          <p className="mt-2 text-sm text-red" id="email-error">
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
          aria-invalid={fetcher.data?.fieldErrors?.message ? true : undefined}
          aria-describedby={
            fetcher.data?.fieldErrors?.message && 'message-error'
          }
          rows={4}
          className={clsx(
            fetcher.data?.fieldErrors?.email
              ? 'invalid:border-red'
              : 'focus:border-gray-7',
            'block w-full rounded-md border-gray-6 bg-gray-3 py-3 px-4 text-gray-12 placeholder-gray-9 shadow-sm focus:ring-gray-7 focus:valid:border-gray-7',
          )}
          placeholder="Message"
          required={true}
          minLength={20}
          defaultValue={fetcher.data?.fields?.message}
        />
        {fetcher.data?.fieldErrors?.message ? (
          <p className="mt-2 text-sm text-red" id="message-error">
            {fetcher.data.fieldErrors.message}
          </p>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className={clsx(
            !isHydrated || busy
              ? 'disabled:cursor-not-allowed disabled:opacity-50'
              : 'hover:bg-gray-4 active:bg-gray-5',
            'focus-ring-1 inline-flex justify-center rounded-md bg-gray-3 py-3 px-6 text-base font-medium text-gray-11 shadow-sm',
          )}
          disabled={!isHydrated || busy}
        >
          {busy ? translation.buttonSubmitting : translation.button}
        </button>
      </div>
    </form>
  )
}
