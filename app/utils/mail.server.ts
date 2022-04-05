import { blacklistedWords } from '~/models/blacklist-words'
import { ActionData as IndexActionData } from '~/routes'
import { Notification } from './notification.server'

function validateMailRequest(mail: {
  name: string
  email: string
  message: string
}) {
  const fieldErrors: IndexActionData['fieldErrors'] = {}
  let formError: string | undefined

  if (!mail.name || mail.name.length < 3) {
    fieldErrors.name = 'Name is required and must be at least 3 characters'
  }

  if (!mail.email) {
    fieldErrors.email = 'Email is required'
  }

  if (!mail.message || mail.message.length < 20) {
    fieldErrors.message =
      'Message is required and must be at least 20 characters'
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    formError = 'There were errors with your submission'
  }

  return { fieldErrors, formError }
}

function checkBadWords(words: string) {
  let isBad = false
  blacklistedWords.forEach((word) => {
    if (words.toLowerCase().includes(word)) {
      isBad = true
    }
  })

  return isBad
}

async function sendMail(
  apiKey: string,
  mail: { name: string; email: string; message: string },
): Promise<Notification> {
  const isBad = checkBadWords(mail.message)

  if (isBad) {
    return {
      message: 'The message you sent, contains blacklisted words',
      extendedMessage:
        'If you believe this is a mistake, please contact me through other means',
      type: 'ERROR',
    }
  }

  const elasticEmailApiUrl =
    'https://api.elasticemail.com/v4/emails/transactional'

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('X-ElasticEmail-ApiKey', apiKey)

  const body = {
    Recipients: { To: ['Jody Geraldo <jody.geraldo.jg@gmail.com>'] },
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Content: `<h2>${mail.name}</h2>
                    <br />
                    <p>${mail.message}</p>
                `,
          Charset: 'utf-8',
        },
      ],
      From: 'contact@jodygeraldo.com',
      ReplyTo: `${mail.name} <${mail.email}>`,
      Subject: 'jodygeraldo.com contact form',
    },
  }

  const res = await fetch(elasticEmailApiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return { message: 'Message sent successfully', type: 'SUCCESS' }
  } else {
    return {
      message: "Couldn't send the message",
      extendedMessage:
        'Please try again later or contact me through other means',
      type: 'ERROR',
    }
  }
}

export { sendMail, validateMailRequest }
