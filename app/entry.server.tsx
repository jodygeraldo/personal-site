import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import type { EntryContext } from 'remix'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const i18n = createInstance()
  await i18n.use(initReactI18next).init({
    supportedLngs: ['id', 'en'],
    defaultNS: 'common',
    fallbackLng: 'en',
    react: { useSuspense: false },
  })

  // Then you can render your app wrapped in the RemixI18NextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={i18n}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
