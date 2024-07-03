/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      danger: 'var(--color-danger)',
      white: '#ffffff',
      black: '#000000'
    },
    extend: {
      textColor: {
        emphasis: 'var(--color-text-primary)',
        regular: 'var(--color-text-regular)',
        secondary: 'var(--color-text-secondary)',
        highlight: '#FA6400'
      },
      backgroundColor: {
        base: 'var(--color-bg-base)',
        'primary-light': 'var(--color-bg-primary-light)'
      },
      borderColor: {
        base: 'var(--color-board-base)',
        emphasis: '#DDDDDD'
      }
    }
  },
  plugins: []
}
