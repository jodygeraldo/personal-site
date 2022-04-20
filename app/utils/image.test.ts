import { generatePictureSource } from './image'

const mock = {
  url: '/assets/images/test.png',
  width: 512,
  height: 288,
  output: ['png', 'webp'] as ['png', 'webp'],
  set: [
    { width: 384, height: 216, media: '(max-width: 639px)' },
    {
      width: 464,
      height: 261,
      media: '(min-width: 640px) and (max-width: 1023px)',
    },
    { width: 512, height: 288, media: '(min-width: 1024px)' },
  ],
}

test('should return object to build html picture source', () => {
  expect(
    generatePictureSource(
      mock.url,
      mock.width,
      mock.height,
      mock.output,
      mock.set,
    ),
  ).toMatchSnapshot()
})
