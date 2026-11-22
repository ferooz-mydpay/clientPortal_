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
          bg: '#f8fafc',
          surface: '#ffffff',
          dark: '#090d16',
          navy: '#0b1120',
          footer: '#070b14',
          card: '#ffffff',
          primary: '#4f46e5',
          'primary-hover': '#4338ca',
          purple: '#6366f1',
          teal: '#0d9488',
          amber: '#f59e0b',
          green: '#10b981',
          rose: '#f43f5e',
          cyan: '#00a3e0',
          'cyan-hover': '#008ec4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'IBM Plex Sans Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 28px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow-cyan': '0 0 25px -5px rgba(0, 163, 224, 0.35)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'elevated': '0 20px 40px -15px rgba(15, 23, 42, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgba(0, 163, 224, 0.12), transparent 50%)',
      }
    },
  },
  plugins: [],
}
