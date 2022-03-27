// This based on remix-utils by sergiodxa
// https://github.com/sergiodxa/remix-utils

import { useEffect, useState } from 'react'

let hydrating = true

export function useHydrated() {
  let [hydrated, setHydrated] = useState(() => !hydrating)

  useEffect(function hydrate() {
    hydrating = false
    setHydrated(true)
  }, [])

  return hydrated
}
