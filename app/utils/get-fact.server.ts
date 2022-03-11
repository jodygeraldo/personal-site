const fact = [
  'Jody Geraldo is not a designer',
  'Jody Geraldo loves UI/UX and accessibility',
  'Jody Geraldo consider himself a front-end guy',
  'Jody Geraldo do some back end stuff',
  'Jody Geraldo wants to become an open-source guy',
  'Jody Geraldo is introvert',
  'Jody Geraldo plays games',
  'Jody Geraldo loves music',
  'Jody Geraldo started learning programming in 2018',
]

function getRandomFact(ignore?: string | string[]) {
  const filteredFact = fact.filter((f) => (ignore ? !ignore.includes(f) : true))
  const randomIndex = Math.floor(Math.random() * filteredFact.length)

  return {
    fact: filteredFact[randomIndex],
    isLastFact: filteredFact.length === 1,
  }
}

export { getRandomFact }
