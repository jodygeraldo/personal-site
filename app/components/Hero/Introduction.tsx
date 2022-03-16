import { Link } from 'remix'
import Icon from '~/components/Icon'
import type { Language, Translations } from '~/utils/i18n.server'

interface Props {
  translation: Translations['intro'][Language]
}

export default function Introduction({ translation }: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold leading-8 tracking-tight text-primary-12 md:text-4xl">
        {translation['title-1']}
        <br /> {translation['title-2']}
      </h2>
      <p className="mt-2 text-2xl font-bold leading-6 text-primary-11 md:text-3xl">
        {translation['subtitle-1']}{' '}
        <span className="italic">{translation['subtitle-2']}</span>
        &nbsp;{translation['subtitle-3']}
      </p>
      <Link
        to="#section-tools"
        className="mt-20 hidden max-w-max items-center gap-4 rounded-full border border-primary-7 bg-primary-4 px-4 py-2 text-xl font-medium text-primary-12 shadow-sm transition hover:translate-y-2 hover:border-primary-8 hover:bg-primary-5 active:translate-y-3 active:bg-primary-6 lg:inline-flex"
      >
        <Icon id="arrow-down" className="h-5 w-5" aria-hidden="true" />
        {translation['button']}
      </Link>
    </>
  )
}
