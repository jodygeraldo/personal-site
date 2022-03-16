import { Link, useMatches } from 'remix'
import Icon from '~/components/Icon'

export default function Introduction() {
  const match = useMatches().find((match) => match.id === 'routes/index')
  const locale = match?.data.locale

  console.log(locale)

  return (
    <>
      <h2 className="text-3xl font-bold leading-8 tracking-tight text-primary-12 md:text-4xl">
        {locale['Intro Title 1']}
        <br /> {locale['Intro Title 2']}
        {/* Hi, I am Jody Geraldo,
        <br /> I am a web developer based in Indonesia. */}
      </h2>
      <p className="mt-2 text-2xl font-bold leading-6 text-primary-11 md:text-3xl">
        {locale['Intro Subtitle 1']}{' '}
        <span className="italic">{locale['Intro Subtitle 2']}</span>
        &nbsp;{locale['Intro Subtitle 3']}
        {/* I spent most of my time <span className="italic">crushing bugs</span>
        &nbsp;while listening to music. */}
      </p>
      <Link
        to="#section-tools"
        className="mt-20 hidden max-w-max items-center gap-4 rounded-full border border-primary-7 bg-primary-4 px-4 py-2 text-xl font-medium text-primary-12 shadow-sm transition hover:translate-y-2 hover:border-primary-8 hover:bg-primary-5 active:translate-y-3 active:bg-primary-6 lg:inline-flex"
      >
        <Icon id="arrow-down" className="h-5 w-5" aria-hidden="true" />
        {locale['Intro Cta']}
        {/* Get to know me */}
      </Link>
    </>
  )
}
