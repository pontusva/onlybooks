/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        suse: ['suse'],
        workSans: ['work-sans']
      },
      colors: {
        'background-default': '#FEFCFF'
      }
    }
  },
  plugins: []
}
