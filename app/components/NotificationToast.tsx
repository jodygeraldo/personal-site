import * as Toast from '@radix-ui/react-toast'
import clsx from 'clsx'
import Icon from '~/components/Icon'
import type { Notification } from '~/utils/notification.server'

const variantStyles: Record<Notification['type'], string> = {
  SUCCESS: 'border-grass',
  ERROR: 'border-red',
  INFO: 'border-cyan',
}

export default function NotificationToast({
  notification,
}: {
  notification: Notification
}) {
  return (
    <Toast.Root
      className={clsx(
        notification.type && variantStyles[notification.type],
        'flex rounded-lg border-l-8 bg-gray-3 p-4 shadow-lg ring-1 ring-gray-7 ring-opacity-5',
      )}
    >
      <div className="flex-1">
        <Toast.Title className="text-sm font-medium text-gray-12">
          {notification.message}
        </Toast.Title>
        {notification.extendedMessage ? (
          <Toast.Description className="mt-1 text-sm text-gray-11">
            {Array.isArray(notification.extendedMessage) ? (
              <ul>
                {notification.extendedMessage.map((message) => (
                  <li key={message}>
                    <span className="mr-2" aria-hidden={true}>
                      &middot;
                    </span>
                    <span>{message}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{notification.extendedMessage}</p>
            )}
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
