const verbs = [
  'crushing bugs',
  'fighting eslint',
  'browsing MDN',
  'inventing problems',
]

function getRandomVerb() {
  // This get a new random word only every 10 second
  const stringDigit = Math.floor(new Date().getTime() / 1000).toString()
  const numZeroToNine = Number.parseInt(
    stringDigit.charAt(stringDigit.length - 2),
  )
  switch (numZeroToNine) {
    case 0:
      return verbs[0]
    case 1:
      return verbs[1]
    case 2:
      return verbs[2]
    case 3:
      return verbs[3]
    case 4:
      return verbs[0]
    case 5:
      return verbs[1]
    case 6:
      return verbs[2]
    case 7:
      return verbs[3]
    case 8:
      return verbs[0]
    case 9:
      return verbs[1]
    default:
      return verbs[3]
  }
}

export { getRandomVerb }
