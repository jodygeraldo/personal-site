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
      typography: {
        DEFAULT: {
          css: {
            pre: {
              'padding-left': 0,
              'padding-right': 0,
            },
            'pre code': {
              'border-radius': '0.25rem',
            },
            '--tw-prose-body': 'var(--sand11)',
            '--tw-prose-headings': 'var(--amber12)',
            '--tw-prose-lead': 'var(--sand10)',
            '--tw-prose-links': 'var(--amber11)',
            '--tw-prose-bold': 'var(--sand12)',
            '--tw-prose-counters': 'var(--sand9)',
            '--tw-prose-bullets': 'var(--sand7)',
            '--tw-prose-hr': 'var(--sand6)',
            '--tw-prose-quotes': 'var(--sand12)',
            '--tw-prose-quote-borders': 'var(--sand6)',
            '--tw-prose-captions': 'var(--sand9)',
            '--tw-prose-code': 'var(--sand12)',
            '--tw-prose-th-borders': 'var(--sand10)',
            '--tw-prose-td-borders': 'var(--sand11)',
          },
        },
        lg: {
          css: {
            pre: {
              'padding-left': 0,
              'padding-right': 0,
            },
          },
        },
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
    require('@tailwindcss/typography'),
  ],
}
