import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import Footer from '~/components/Footer'
import Header from '~/components/Header/Header'
import Icon from '~/components/Icon'
import PageContainer from '~/components/PageContainer'
import { getResumeData } from '~/models/resume'
import type { Language, Translations } from '~/utils/i18n.server'
import { getLanguage, getTranslations } from '~/utils/i18n.server'

export const meta: MetaFunction = () => ({
  title: 'Resume | Jody Geraldo',
})

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
    <PageContainer>
      <Header language={language} translation={translation.heroHeader} />

      <main className="py-16">
        <section
          className="mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl"
          aria-labelledby="page-title"
        >
          <h1 className="sr-only" id="page-title">
            Resume
          </h1>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <Link
              to="/"
              className="focus-ring-1 inline-flex max-w-fit items-center justify-center rounded-md bg-gray-3 py-3 px-6 font-medium text-gray-11 shadow-sm hover:bg-gray-4 active:bg-gray-5"
            >
              <Icon id="arrowLeft" className="mr-2 h-5 w-5" />
              <span>Back</span>
            </Link>

            <a
              download
              href="/assets/jody-geraldo-resume-id.pdf"
              className="focus-ring-1 rounded-md bg-gray-3 py-3 px-6 text-center font-medium text-gray-11 shadow-sm hover:bg-gray-4 active:bg-gray-5"
            >
              Download PDF
              <span className="text-sm text-primary-11">&nbsp;(ID)</span>
            </a>
          </div>

          <div className="mt-8 rounded bg-gray-3 px-4 py-5 sm:px-6">
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
                  <div className="item-start flex flex-col justify-between text-gray-9 sm:flex-row">
                    <p className="-mt-1 sm:order-2 sm:mt-0">Batam, ID</p>
                    <p className="sm:order-1">
                      September 2018 (
                      {language === 'en'
                        ? 'Completed 115 of total 145 credits'
                        : 'Menyelesaikan 115 dari 145 SKS'}
                      )
                    </p>
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
        </section>
      </main>

      <Footer />
    </PageContainer>
  )
}
