/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
        colors: {
          'primary': '#44cad2',
          'primary-fade': '#83dfe5',
          'primary-dark': '#5ab1b6',  // A darker shade of primary color
          'text': '#081e1f',
          'text-accent': '#555a5a',
          'background': '#f2f6f7',
          'secondary': '#a28ee4',
          'accent': '#a56adb',
        },
     
    },
  },
  plugins: [],
}

