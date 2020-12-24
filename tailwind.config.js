module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './core/**/*.tsx',
    './features/**/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      prompt: [ 'Prompt Regular' ],
      'prompt-light': ['Prompt Light'],
      'prompt-medium': [ 'Prompt Medium' ],
      'prompt-semibold': [ 'Prompt SemiBold' ],
      sarabun: ['Sarabun Regular'],
      'sarabun-meduim': ['Sarabun Medium'],
      'sarabun-light': ['Sarabun Light'],
      'sarabun-samibold': ['Sarabun SemiBold']
    },
    colors: {
      primary: '#295B8D',
      secondary1: '#168FBD',
      secondary2: '#6D6D6A',
      'grey-100': '#F5F5F5',
      white: '#ffffff',
      black: '#000000',
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
      'subtitle-2': '14px',
    },
    borderWidth: {
      DEFAULT: '1px',
    }
  },
  variants: {},
  plugins: [],
}
