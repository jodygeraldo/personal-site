import { useEffect, useState } from 'react'
import { useFetcher } from 'remix'
import Icon from '~/components/Icon'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['getFact'][Language]
}

export default function GetFactCode({ translation }: Props) {
  const fetcher = useFetcher<{ fact: string; isLastFact: boolean }>()

  const [ignoreArray, setIgnoreArray] = useState<string[]>(['empty'])
  useEffect(() => {
    if (fetcher.data?.fact) {
      if (fetcher.data?.isLastFact) {
        setIgnoreArray(['empty'])
      }

      const newFact = fetcher.data?.fact
      setIgnoreArray((prev) => [...prev, newFact])
    }
  }, [fetcher.data])

  function handleSubmit() {
    fetcher.load(`/api/get-fact?ignore=${ignoreArray}`)
  }

  const fetchedFact = fetcher.data?.fact ?? '...'

  return (
    <code className="break-all text-sm 2xl:text-base max-320:text-xs">
      <div className="rounded-lg bg-gray-neutral-3 p-4 shadow-md sm:p-6">
        <div>
          <div>
            <span className="text-plum">async function</span>
            <span className="text-indigo"> getFact</span>() {'{'}
          </div>
          <div className="ml-2 sm:ml-4">
            <span className="text-plum">const</span>
            <span className="text-red"> url</span> = &lsquo;
            <span className="text-grass">
              <a
                href="https://get-fact.deno.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://get-fact.deno.dev
              </a>
            </span>
            &rsquo;
          </div>
          <div className="ml-2 sm:ml-4">
            <span className="text-plum">const </span>
            <span className="text-red">apiKey </span> =
            <span className="text-gray-12"> process.env.</span>
            <span className="text-red">GET_FACT_API_KEY</span>
          </div>
          <br />
          <div className="ml-2 sm:ml-4">
            <span className="text-plum">const </span>
            <span className="text-red">res </span> ={' '}
            <span className="text-cyan">await </span>
            <span className="text-indigo">fetch</span>(
          </div>
          <div className="ml-4 sm:ml-8">
            <span className="text-cyan">`</span>
            <span className="text-grass">
              <span className="text-cyan">${'{'}</span>
              <span className="text-gray-12">url</span>
              <span className="text-cyan">{'}'}</span>
              /api/v1/fact?api_key=
              <span className="text-cyan">${'{'}</span>
              <span className="text-gray-12">apiKey</span>
              <span className="text-cyan">{'}'}</span>
              <span className="text-cyan">`</span>
            </span>
          </div>
          <div className="ml-2 sm:ml-4">
            )
            <br />
            <br />
            <div>
              <span className="text-plum">const </span>
              {'{ '}
              <span className="text-red">fact</span>
              {' }'} = res.
              <span className="text-indigo">json</span>().data
            </div>
            <span className="text-cyan">return </span>fact
          </div>
          <div>{'}'}</div>
          <br />
          <div>
            <span className="text-cyan">await </span>
            <span className="text-indigo">getFact</span>()
          </div>
        </div>

        {/* divider with generate button */}
        <div className="relative my-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-7" />
          </div>
          <form className="relative flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center rounded-full border border-gray-7 bg-gray-3 px-4 py-1.5 text-sm font-medium text-gray-12 shadow-sm hover:border-gray-8 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-3"
            >
              <Icon
                id="play"
                className="-ml-1.5 mr-1 h-5 w-5"
                aria-hidden="true"
              />
              <span>{translation.button}</span>
            </button>
          </form>
        </div>

        {/* generated code */}
        <div className="flex items-center gap-4">
          <Icon id="paper-plane" className="h-5 w-5" aria-hidden="true" />
          <span className="xl:text-base">{fetchedFact}</span>
        </div>
      </div>
    </code>
  )
}
