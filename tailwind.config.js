const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
      },
      keyword: 'var(--plum9)',
      method: 'var(--indigo9)',
      variable: 'var(--red9)',
      intruction: 'var(--cyan9)',
      string: 'var(--grass9)',
    },
    extend: {
      screens: {
        'max-320': { max: '320px' },
      },
      fontFamily: {
        code: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('state-active', '&[data-state="active"]')
    }),
    require('@tailwindcss/forms'),
  ],
}
