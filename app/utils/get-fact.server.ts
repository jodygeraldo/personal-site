// replicate the get fact api
const facts = [
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

async function getFact(apiKey: string, ignore: string) {
  const url = 'https://get-fact.deno.dev'

  const res = await fetch(
    `${url}/api/v1/fact?api_key=${apiKey}&ignore=${ignore}`,
  )

  const jsonData = (await res.json<{ data: { fact: string[] } | {} }>()).data

  if (!jsonData) {
    return 'Jody Geraldo loves UI/UX and accessibility'
  }

  if (!jsonData.hasOwnProperty('fact')) {
    return 'Jody Geraldo loves UI/UX and accessibility'
  }

  // fact array should be exist after the hasOwnProperty check
  // @ts-ignore
  if (Array.isArray(jsonData.fact) && jsonData.fact.length < 1) {
    return 'Jody Geraldo loves UI/UX and accessibility'
  } else {
    // fact array should have at least have one element
    // @ts-ignore
    return jsonData.fact[0]
  }
}

export { getFact }
