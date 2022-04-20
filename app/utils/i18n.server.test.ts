import { getTranslations } from './i18n.server'

test('getTranslations should return right translations', () => {
  expect(getTranslations('en', 'intro')).toMatchSnapshot()
  expect(getTranslations('en', 'contact')).toMatchSnapshot()
  expect(getTranslations('en', 'error')).toMatchSnapshot()
  expect(getTranslations('id', 'getFact')).toMatchSnapshot()
  expect(getTranslations('id', 'heroHeader')).toMatchSnapshot()
  expect(getTranslations('id', 'tool')).toMatchSnapshot()
  expect(getTranslations('id', 'project')).toMatchSnapshot()
})
