import invariant from 'tiny-invariant'
import type { Language } from './i18n.server'

const fact = new Map<Language, string[]>()

fact.set('en', [
  'Jody Geraldo is not a designer but trying his best',
  'Jody Geraldo loves UI/UX and accessibility',
  'Jody Geraldo consider himself a front-end guy',
  'Jody Geraldo do some back end stuff',
  'Jody Geraldo wants to become an open-source guy',
  'Jody Geraldo is introvert',
  'Jody Geraldo plays games',
  'Jody Geraldo loves music',
  'Jody Geraldo started learning programming in 2018',
])

fact.set('id', [
  'Jody Geraldo bukan seorang desainer',
  'Jody Geraldo menyukai UI/UX dan aksesibilitas',
  'Jody Geraldo menganggap diri seorang front-end',
  'Jody Geraldo terkadang melakukan back-end',
  'Jody Geraldo ingin menjadi open-source developer',
  'Jody Geraldo seorang introvert',
  'Jody Geraldo bermain game',
  'Jody Geraldo menyukai musik',
  'Jody Geraldo mulai belajar programming di 2018',
])

function getRandomFact(lang: Language, ignore?: string | string[]) {
  const facts = fact.get(lang)

  invariant(facts, `If this ever happens, please report it to me.`)

  const filteredFact = facts.filter((f) =>
    ignore ? !ignore.includes(f) : true,
  )
  const randomIndex = Math.floor(Math.random() * filteredFact.length)

  return {
    fact: filteredFact[randomIndex],
    isLastFact: filteredFact.length === 1,
  }
}

export { getRandomFact }
