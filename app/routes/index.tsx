import { ActionFunction, json, LoaderFunction } from 'remix'
import invariant from 'tiny-invariant'
import Hero from '~/components/Hero/Hero'
import Tool from '~/components/Tool/Tool'
import { commitSession, setTheme } from '~/utils/theme.server'

export enum ActionType {
  SET_THEME = 'SET_THEME',
  SUBMIT_MESSSAGE = 'SUBMIT_MESSSAGE',
}

function isValidActionType(value: any): value is ActionType {
  return (
    typeof value === 'string' &&
    Object.values<string>(ActionType).includes(value)
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const actions = formData.get('action')
  invariant(isValidActionType(actions), 'Invalid action type')

  switch (actions) {
    case ActionType.SET_THEME:
      const setTo = formData.get('theme')
      invariant(typeof setTo === 'string', 'Invalid theme type')
      invariant(setTo === 'dark' || setTo === 'light', 'Invalid theme')

      const themeSession = await setTheme(request, setTo)

      return new Response(null, {
        status: 204,
        headers: {
          'Set-Cookie': await commitSession(themeSession),
        },
      })
    case ActionType.SUBMIT_MESSSAGE:
      return null
    default:
      return json(`Can't process action with name: ${actions}`, {
        status: 400,
      })
  }
}

export default function Index() {
  return (
    <>
      <Hero />
      <Tool />
    </>
  )
}
