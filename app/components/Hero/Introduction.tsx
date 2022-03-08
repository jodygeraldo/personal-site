import { useState } from 'react'
import { Link } from 'remix'
import { getRandomVerb } from '~/models/verbs'
import Icon from '~/components/Icon'

export default function Introduction() {
  // This is to prevent getRandomWork called after the first render
  const [verb] = useState(getRandomVerb())

  return (
    <>
      <h2 className="text-3xl font-bold leading-8 tracking-tight text-primary-12 md:text-4xl">
        Hi, I am Jody Geraldo,
        <br /> I am a web developer based in Indonesia.
      </h2>
      <p className="mt-2 text-2xl font-bold leading-6 text-primary-11 md:text-3xl">
        I spent most of my time <span className="italic">{verb}</span> while
        listening to music.
      </p>
      <Link
        to="#section-tools"
        className="mt-20 hidden max-w-max items-center gap-4 rounded-full border border-primary-7 bg-primary-4 px-4 py-2 text-xl font-medium text-primary-12 shadow-sm transition hover:translate-y-2 hover:border-primary-8 hover:bg-primary-5 active:translate-y-3 active:bg-primary-6 lg:inline-flex"
      >
        <Icon id="arrow-down" className="h-5 w-5" aria-hidden="true" />
        Get to know me
      </Link>
    </>
  )
}
