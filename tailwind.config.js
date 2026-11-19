/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portal: {
          bg: '#f4f6fa',
          dark: '#0f172a',
          navy: '#0d1526',
          footer: '#0b1320',
          card: '#ffffff',
          primary: '#4f46e5',
          'primary-hover': '#4338ca',
          purple: '#6366f1',
          teal: '#0d9488',
          amber: '#f59e0b',
          green: '#10b981',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'IBM Plex Sans Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
