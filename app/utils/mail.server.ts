function validateMailRequest(mail: {
  name: string
  email: string
  message: string
}) {
  const errors: { field: string; message: string }[] = []

  if (!mail.name || mail.name.length < 3) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 3 characters long',
    })
  }

  if (!mail.email) {
    errors.push({ field: 'email', message: 'Email is required' })
  }

  if (!mail.message || mail.message.length < 20) {
    errors.push({
      field: 'message',
      message: 'Message must be at least 20 characters long',
    })
  }

  return errors
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
    headers: {
      'Content-Type': 'application/json',
      'X-ElasticEmail-ApiKey': apiKey,
    },
    body: JSON.stringify(body),
  })

  return res
}

export { sendMail, validateMailRequest }
