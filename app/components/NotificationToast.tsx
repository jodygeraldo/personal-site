import * as Toast from '@radix-ui/react-toast'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useActionData } from 'remix'
import { ActionData as IndexActionData } from '~/routes'
import Icon from './Icon'

const variantStyles = {
  SUCCESS: 'border-string',
  ERROR: 'border-variable',
}

export default function NotificationToast() {
  const actionData = useActionData<IndexActionData>()
  const [open, setOpen] = useState(false)
  const errorArray = Object.values(actionData?.fieldErrors || {})

  function handleStateChange(open: boolean) {
    setOpen(open)
  }

  useEffect(() => {
    if (actionData?.statusMessage) {
      setOpen(true)
    }
  }, [actionData])

  return (
    <Toast.Root
      duration={5000}
      open={open}
      onOpenChange={handleStateChange}
      className={clsx(
        actionData?.type && variantStyles[actionData.type],
        'flex rounded-lg border-l-8 bg-gray-3 p-4 shadow-lg ring-1 ring-gray-7 ring-opacity-5',
      )}
    >
      <div className="flex-1">
        <Toast.Title className="text-sm font-medium text-gray-12">
          {actionData?.statusMessage}
        </Toast.Title>
        {errorArray.length > 0 ? (
          <Toast.Description className="mt-1 text-sm text-gray-11">
            <ul>
              {errorArray.map((error) => (
                <li key={error}>
                  <span className="mr-2" aria-hidden={true}>
                    &middot;
                  </span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </Toast.Description>
        ) : actionData?.extendedMessage ? (
          <Toast.Description className="mt-1 text-sm text-gray-11">
            {actionData.extendedMessage}
          </Toast.Description>
        ) : null}
      </div>
      <Toast.Close className="flex-shrink-0 self-start rounded-md bg-gray-3 ring-offset-gray-6 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2">
        <span className="sr-only">Close</span>
        <Icon
          id="cross"
          className="h-5 w-5 text-gray-11 hover:text-gray-12"
          aria-hidden={true}
        />
      </Toast.Close>
    </Toast.Root>
  )
}
