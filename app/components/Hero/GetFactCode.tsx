import { useEffect, useState } from 'react'
import { useFetcher, useMatches } from 'remix'
import Icon from '~/components/Icon'

export default function GetFactCode() {
  const matches = useMatches().find((match) => match.id === 'routes/index')

  const initialFact =
    matches?.data?.fact ?? 'Jody Geraldo loves UI/UX and accessibility'

  const fetcher = useFetcher()

  const [ignoreArray, setIgnoreArray] = useState<string[]>([initialFact])
  useEffect(() => {
    if (fetcher.data?.fact) {
      if (fetcher.data?.isLastFact) {
        setIgnoreArray([])
      }
      setIgnoreArray((prev) => [...prev, fetcher.data.fact])
    }
  }, [fetcher.data])

  const fetchedFact = fetcher.data?.fact ?? initialFact

  return (
    <code className="break-all text-sm 2xl:text-base max-320:text-xs">
      <div className="rounded-lg bg-gray-3 p-4 shadow-md sm:p-6">
        <div>
          <div>
            <span className="text-keyword">async function</span>
            <span className="text-method"> getFact</span>() {'{'}
          </div>
          <div className="ml-2 sm:ml-4">
            <span className="text-keyword">const</span>
            <span className="text-variable"> url</span> = &lsquo;
            <span className="text-string">
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
            <span className="text-keyword">const </span>
            <span className="text-variable">apiKey </span> =
            <span className="text-gray-12"> process.env.</span>
            <span className="text-variable">GET_FACT_API_KEY</span>
          </div>
          <br />
          <div className="ml-2 sm:ml-4">
            <span className="text-keyword">const </span>
            <span className="text-variable">res </span> ={' '}
            <span className="text-intruction">await </span>
            <span className="text-method">fetch</span>(
          </div>
          <div className="ml-4 sm:ml-8">
            <span className="text-intruction">`</span>
            <span className="text-string">
              <span className="text-intruction">${'{'}</span>
              <span className="text-gray-12">url</span>
              <span className="text-intruction">{'}'}</span>
              /api/v1/fact?api_key=
              <span className="text-intruction">${'{'}</span>
              <span className="text-gray-12">apiKey</span>
              <span className="text-intruction">{'}'}</span>
              <span className="text-intruction">`</span>
            </span>
          </div>
          <div className="ml-2 sm:ml-4">
            )
            <br />
            <br />
            <div>
              <span className="text-keyword">const </span>
              {'{ '}
              <span className="text-variable">fact</span>
              {' }'} = res.
              <span className="text-method">json</span>().data
            </div>
            <span className="text-intruction">return </span>fact
          </div>
          <div>{'}'}</div>
          <br />
          <div>
            <span className="text-intruction">await </span>
            <span className="text-method">getFact</span>()
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
          <fetcher.Form
            method="get"
            replace={true}
            className="relative flex justify-center"
          >
            <input type="hidden" name="ignore" value={ignoreArray} />
            <button
              type="submit"
              name="require"
              value="fact"
              className="inline-flex items-center rounded-full border border-gray-7 bg-gray-3 px-4 py-1.5 text-sm font-medium text-gray-12 shadow-sm hover:border-gray-8 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-6"
            >
              <Icon
                id="play"
                className="-ml-1.5 mr-1 h-5 w-5"
                aria-hidden="true"
              />
              <span>Generate</span>
            </button>
          </fetcher.Form>
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
