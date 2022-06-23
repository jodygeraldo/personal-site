import { blacklistedWords } from '~/models/blacklist-words'
import type { ActionData as IndexActionData } from '~/routes'
import type { Notification } from './notification.server'

async function validateMailRequest(
  mail: {
    name: string
    email: string
    message: string
  },
  rechaptcha: {
    token: string
    secret: string
  },
) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: JSON.stringify({
      secret: rechaptcha.secret,
      response: rechaptcha.token,
    }),
  })
  const rechaptchaServerResponse = (await res.json()) as {
    success: boolean
  }

  console.log(rechaptchaServerResponse)
  if (!rechaptchaServerResponse.success) {
    console.log("Rechaptcha didn't validate")
    return {
      message: 'Recaptcha failed',
    }
  }

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

  console.log('Is bad:', isBad)

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

  console.log(res.json())

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
