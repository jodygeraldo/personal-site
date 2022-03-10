import { ActionData as IndexActionData } from '~/routes'

function validateMailRequest(mail: {
  name: string
  email: string
  message: string
}) {
  const fieldErrors: IndexActionData['fieldErrors'] = {}
  let formError: IndexActionData['statusMessage']

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

async function sendMail(
  apiKey: string,
  mail: {
    name: string
    email: string
    message: string
  },
) {
  const elasticEmailApiUrl =
    'https://api.elasticemail.com/v4/emails/transactional'

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('X-ElasticEmail-ApiKey', apiKey)

  const body = {
    Recipients: {
      To: ['Jody Geraldo <jody.geraldo.jg@gmail.com>'],
    },
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

  return res
}

export { sendMail, validateMailRequest }
