import { sendMail, validateMailRequest } from './mail.server'

let badMail = {
  name: 'jody geraldo',
  email: 'jody.geraldo.jg@gmail.com',
  message: 'abcde',
}

let goodMail = {
  name: 'jody geraldo',
  email: 'jody.geraldo.jg@gmail.com',
  message:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, voluptatibus.',
}

beforeEach(() => {
  badMail = {
    name: 'jody geraldo',
    email: 'jody.geraldo.jg@gmail.com',
    message: 'abcde',
  }

  goodMail = {
    name: 'jody geraldo',
    email: 'jody.geraldo.jg@gmail.com',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, voluptatibus.',
  }
})

test('validateMailRequest should return fieldErrors and formError for bad form request', () => {
  expect(validateMailRequest(badMail)).toMatchObject({
    fieldErrors: {
      message: 'Message is required and must be at least 20 characters',
    },
    formError: 'There were errors with your submission',
  })

  expect(validateMailRequest(badMail)).toMatchSnapshot()

  badMail.name = 'ab'

  expect(validateMailRequest(badMail)).toMatchSnapshot()

  badMail.email = ''
  expect(validateMailRequest(badMail)).toMatchSnapshot()
})

test('validateMailRequest should return empty object fieldErrors and undefined formError', () => {
  expect(validateMailRequest(goodMail)).toMatchObject({
    fieldErrors: {},
    formError: undefined,
  })
})

test('sendMail should return error object if message contains bad words', async () => {
  goodMail.message =
    'this message is not a good message and contains a bad word like ASS and bitch or cuck'

  expect(await sendMail('API_KEY', goodMail)).toMatchSnapshot()
})

test.todo('sendMail should return success object on success')

test.todo('sendMail should return error object if send mail fail')
