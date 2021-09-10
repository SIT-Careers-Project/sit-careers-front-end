module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./pages/*.tsx', './pages/**/*.tsx', './core/**/*.tsx', './features/**/**/*.tsx'],
  theme: {
    fontFamily: {
      prompt: ['Prompt Regular'],
      'prompt-light': ['Prompt Light'],
      'prompt-medium': ['Prompt Medium'],
      'prompt-semibold': ['Prompt SemiBold'],
      sarabun: ['Sarabun Regular'],
      'sarabun-meduim': ['Sarabun Medium'],
      'sarabun-light': ['Sarabun Light'],
      'sarabun-samibold': ['Sarabun SemiBold']
    },
    colors: {
      primary: '#295B8D',
      secondary1: '#168FBD',
      secondary2: '#6D6D6A',
      'grey-fbfcfd': '#FBFCFD',
      'grey-100': '#F5F5F5',
      'grey-200': '#F3F3F3',
      'grey-300': '#E8E8E8',
      white: '#ffffff',
      black: '#000000',
      'red-light': '#FCE7E7',
      red: '#EB5757',
      'red-dark-1': '#E53935',
      'red-dark': '#C62828',
      grey4: '#E0E0E0',
      grey1: '#FBFCFB',
      green1: '#ECF9F3',
      green2: '#27AE60',
      green3: '#00C853',
      green4: '#5CB660'
    },
    fontSize: {
      'heading-1': '96px',
      'heading-2': '60px',
      'heading-3': '48px',
      'heading-4': '34px',
      'heading-5': '24px',
      'heading-6': '20px',
      'body-1': '18px',
      'body-2': '14px',
      'subtitle-1': '16px',
      'subtitle-2': '14px'
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px'
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
