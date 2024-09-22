/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kidizz-blue': {
          100: '#E6F0FF', // Fond clair
          500: '#3B82F6', // Bouton primaire
          600: '#2563EB' // Bouton primaire hover
        },
        'kidizz-green': {
          500: '#10B981', // Bouton secondaire
          600: '#059669' // Bouton secondaire hover
        },
        'kidizz-gray': {
          300: '#D1D5DB', // Bordures
          500: '#6B7280', // Texte secondaire
          900: '#111827' // Texte principal
        }
      }
    }
  },
  plugins: []
}
