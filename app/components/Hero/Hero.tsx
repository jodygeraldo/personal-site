import type { Language, Translations } from '~/utils/i18n.server'
import Header from '../Header/Header'
import GetFactCode from './GetFactCode'
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
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header translation={translation.heroHeader} language={language} />

      <div className="mx-auto grid place-items-center gap-16 pb-16 sm:max-w-3xl lg:min-h-[calc(100vh-128px)] lg:max-w-7xl lg:grid-cols-2">
        <Introduction translation={translation.intro} />
        <GetFactCode translation={translation.getFact} />
      </div>
    </header>
  )
}
