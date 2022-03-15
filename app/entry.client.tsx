import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

i18next
  .use(initReactI18next)
  .init({
    supportedLngs: ['id', 'en'],
    defaultNS: 'common',
    fallbackLng: 'en',
    react: { useSuspense: false },
  })
  .then(() => {
    return hydrate(
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
      document,
    )
  })
