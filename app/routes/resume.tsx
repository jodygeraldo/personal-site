import type { LoaderFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import HeroHeader from '~/components/Hero/HeroHeader/HeroHeader'
import Icon from '~/components/Icon'
import { getResumeData } from '~/models/resume'
import type { Language, Translations } from '~/utils/i18n.server'
import { getLanguage, getTranslations } from '~/utils/i18n.server'

interface LoaderData {
  translation: {
    heroHeader: Translations['heroHeader'][Language]
  }
  language: Language
}
export const loader: LoaderFunction = async ({ request }) => {
  const language = await getLanguage(request)
  const translation = {
    heroHeader: getTranslations(language, 'heroHeader'),
  }

  return json<LoaderData>({ translation, language }, { status: 200 })
}

export default function ResumePage() {
  const { translation, language } = useLoaderData<LoaderData>()
  const { infos, projects } = getResumeData(language)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroHeader language={language} translation={translation.heroHeader} />
      </div>

      <main className="pb-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-16 justify-between sm:flex">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-3 py-3 px-6 text-base font-medium text-gray-11 shadow-sm hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1 active:bg-gray-5"
            >
              <Icon id="arrowLeft" className="h-5 w-5" />
              <span>Back</span>
            </Link>

            <a
              download
              href="/assets/jody-geraldo-resume-id.pdf"
              className="mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-gray-3 py-3 px-6 text-base font-medium text-gray-11 shadow-sm hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1 active:bg-gray-5 sm:mt-0 sm:w-auto"
            >
              Download PDF
              <span className="text-sm text-primary-11">&nbsp;(ID)</span>
            </a>
          </div>

          <div className="mt-8 rounded bg-gray-3 px-8 py-12 font-resume">
            <div className="justify-between sm:flex">
              <div>
                <h2 className="text-3xl font-bold text-gray-12 md:text-4xl lg:text-5xl">
                  Jody Geraldo
                </h2>
                <p className="mt-2 text-xl font-bold text-gray-12 sm:text-2xl">
                  Software Enginner
                </p>
              </div>

              <div className="mt-4 flex flex-col space-y-2 sm:mt-0 sm:items-end">
                {infos.map((info) => (
                  <div
                    key={info.id}
                    className="flex items-center gap-4 text-gray-11"
                  >
                    {info.link ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={info.link}
                        className="order-2 text-sm underline underline-offset-1 hover:text-gray-9 sm:order-1"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="order-2 text-sm sm:order-1">{info.value}</p>
                    )}

                    {info.id === 'location' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 sm:order-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657 13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                        />
                      </svg>
                    ) : null}
                    {info.icon ? (
                      <Icon
                        id={info.icon}
                        className="h-5 w-5 shrink-0 sm:order-2"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 space-y-12">
              <section aria-labelledby="section-project">
                <h3
                  id="section-project"
                  className="text-lg font-bold text-primary-9 sm:text-xl"
                >
                  Projects
                </h3>

                <div className="mt-4 space-y-4">
                  {projects.map((project) => (
                    <div key={project.name}>
                      <h4 className="text-lg font-bold text-gray-12">
                        {project.name}
                      </h4>

                      <ul className="mt-2 max-w-2xl space-y-1">
                        {project.list.map((item, idx) => (
                          <li
                            key={idx}
                            className="ml-8 list-disc text-gray-11 sm:ml-12"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-2 text-gray-9">
                        {language === 'en' ? 'Deployed to' : 'Publish di'}{' '}
                        {project.deployedTo}{' '}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-1 hover:text-gray-11"
                        >
                          ({new URL(project.link).hostname})
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="section-education">
                <h3
                  id="section-education"
                  className="text-lg font-bold text-primary-9 sm:text-xl"
                >
                  Education
                </h3>

                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-12">
                    {language === 'en'
                      ? 'Universal University'
                      : 'Universitas Universal'}{' '}
                    <span className="text-gray-11">
                      {'- '}
                      {language === 'en'
                        ? 'B.S., Computer Science'
                        : 'S1 Teknik Informatika'}
                    </span>
                  </h4>
                  <div className="item-start flex justify-between text-gray-9">
                    <p>
                      September 2018 (
                      {language === 'en'
                        ? 'Completed 115 of total 145 credits'
                        : 'Menyelesaikan 115 dari 145 SKS'}
                      )
                    </p>
                    <p>Batam, ID</p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="section-education">
                <h3
                  id="section-education"
                  className="text-lg font-bold text-primary-9 sm:text-xl"
                >
                  Skills
                </h3>

                <div className="mt-4 space-y-1">
                  <p className="text-gray-9">
                    <span className="text-gray-11">Languages:</span> JavaScript,
                    TypeScript
                  </p>
                  <p className="text-gray-9">
                    <span className="text-gray-11">Frameworks:</span> React,
                    Remix
                  </p>
                  <p className="text-gray-9">
                    <span className="text-gray-11">Tools:</span> Git, GitHub,
                    Prettier, ESLint
                  </p>
                  <p className="text-gray-9">
                    <span className="text-gray-11">Databases:</span> PostgreSQL,
                    Supabase
                  </p>
                  <p className="text-gray-9">
                    <span className="text-gray-11">Styling Frameworks:</span>{' '}
                    Tailwind CSS, HeadlessUI, Radix
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
