/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",  
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'first': '#06C24C',
        'sec': '#323943',
        'third': '#535353'
      },
      fontFamily: {
         primary: [ 'Jost_500Medium'],
        second: ['Inter_400Regular', 'Inter_700Bold'],
      }
    },
  },
  plugins: [],
}

