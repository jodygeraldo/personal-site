import Icon from '~/components/Icon'
import type { Language, Translations } from '~/utils/i18n.server'
import ContactForm from './ContactForm'

interface Props {
  translation: Translations['contact'][Language]
}

export default function Contact({ translation }: Props) {
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
            <ContactForm translation={translation} />
          </div>
        </div>
      </div>
    </section>
  )
}
