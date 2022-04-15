import type { EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { renderToReadableStream } from 'react-dom/server'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let didError = false

  try {
    let stream = await renderToReadableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onError(error) {
          didError = true
          console.error(error)
        },
      },
    )

    if (isbot(request.headers.get('user-agent'))) {
      await stream.allReady
    }

    responseHeaders.set('Content-Type', 'text/html')

    return new Response(stream, {
      status: didError ? 500 : responseStatusCode,
      headers: responseHeaders,
    })
  } catch (error) {
    return new Response('<!DOCTYPE html><p>Loading...</p>', {
      status: responseStatusCode,
      headers: responseHeaders,
    })
  }
}
