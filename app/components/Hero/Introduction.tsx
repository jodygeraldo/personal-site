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
        {translation['subtitle']}
      </p>
    </>
  )
}
