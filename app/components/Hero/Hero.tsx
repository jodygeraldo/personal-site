import type { Translations, Language } from '~/utils/i18n.server'
import GetFactCode from './GetFactCode'
import HeroHeader from './HeroHeader/HeroHeader'
import Introduction from './Introduction'

interface Props {
  translation: {
    heroHeader: Translations['heroHeader'][Language]
    intro: Translations['intro'][Language]
    getFact: Translations['getFact'][Language]
  }
  fact: string
}

export default function Hero({ translation, fact }: Props) {
  return (
    <header className="mx-auto grid min-h-screen max-w-7xl grid-rows-6 items-center px-4 sm:px-6 lg:px-8">
      <HeroHeader translation={translation.heroHeader} />

      <div className="row-span-5 mx-auto grid max-w-md items-center gap-8 pb-16 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="max-w-lg lg:max-w-md">
          <Introduction translation={translation.intro} />
        </div>
        <div className="text-gray-12 lg:max-w-md">
          <GetFactCode translation={translation.getFact} fact={fact} />
        </div>
      </div>
    </header>
  )
}
