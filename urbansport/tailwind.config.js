/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'ball-B': "url('../src/assets/images/Ball.jpg')",
        'main-B': "url('../src/assets/images/field.jpg')",
       }),
       fontFamily: {
        'mudhead': ['"Mudhead FREE Regular"', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      },
    },
    
  plugins: [],
}

}
