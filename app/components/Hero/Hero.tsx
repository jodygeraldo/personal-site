import type { Language, Translations } from '~/utils/i18n.server'
import GetFactCode from './GetFactCode'
import HeroHeader from './HeroHeader/HeroHeader'
import Introduction from './Introduction'

interface Props {
  translation: {
    heroHeader: Translations['heroHeader'][Language]
    intro: Translations['intro'][Language]
    getFact: Translations['getFact'][Language]
  }
  language: Language
}

export default function Hero({ translation, language }: Props) {
  return (
    <header className="mx-auto max-w-7xl items-center px-4 sm:px-6 lg:min-h-screen lg:px-8">
      <HeroHeader translation={translation.heroHeader} language={language} />

      <div className="mx-auto grid items-center  justify-center gap-16 pb-16 sm:max-w-3xl lg:min-h-[calc(100vh-128px)] lg:max-w-7xl lg:grid-cols-2">
        <div className="max-w-md">
          <Introduction translation={translation.intro} />
        </div>
        <div className="max-w-md text-gray-12">
          <GetFactCode translation={translation.getFact} />
        </div>
      </div>
    </header>
  )
}
