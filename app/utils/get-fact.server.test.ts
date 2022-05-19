import { fact, getRandomFact } from './get-fact.server'

const mockFactsId = fact.get('id')
const mockFactsEn = fact.get('en')

test('facts should not be empty', () => {
  expect(mockFactsId).not.toBeUndefined()
  expect(mockFactsEn).not.toBeUndefined()
})

test('should return object with fact and isLastFact', () => {
  expect(getRandomFact('en')).toMatchObject({
    fact: expect.any(String),
    isLastFact: false,
  })
  expect(getRandomFact('id')).toMatchObject({
    fact: expect.any(String),
    isLastFact: false,
  })

  expect(getRandomFact('id', mockFactsId?.slice(1))).toMatchObject({
    fact: expect.any(String),
    isLastFact: true,
  })
})
