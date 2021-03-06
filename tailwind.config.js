const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      opacity: {
        'image-overlay': 'var(--image-overlay-opacity)',
      },
      colors: {
        primary: {
          1: 'var(--amber1)',
          2: 'var(--amber2)',
          3: 'var(--amber3)',
          4: 'var(--amber4)',
          5: 'var(--amber5)',
          6: 'var(--amber6)',
          7: 'var(--amber7)',
          8: 'var(--amber8)',
          9: 'var(--amber9)',
          10: 'var(--amber10)',
          11: 'var(--amber11)',
          12: 'var(--amber12)',
        },
        gray: {
          1: 'var(--sand1)',
          2: 'var(--sand2)',
          3: 'var(--sand3)',
          4: 'var(--sand4)',
          5: 'var(--sand5)',
          6: 'var(--sand6)',
          7: 'var(--sand7)',
          8: 'var(--sand8)',
          9: 'var(--sand9)',
          10: 'var(--sand10)',
          11: 'var(--sand11)',
          12: 'var(--sand12)',
          'neutral-3': 'var(--neutral3)',
        },
        plum: 'var(--plum11)',
        indigo: 'var(--indigo11)',
        red: 'var(--red11)',
        cyan: 'var(--cyan11)',
        grass: 'var(--grass11)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('state-active', '&[data-state="active"]')
      addVariant('state-open', '&[data-state="open"]')
      addVariant('data-disabled', '&[data-disabled]')
    }),
    require('@tailwindcss/forms'),
  ],
}
