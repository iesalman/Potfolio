/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#2A2438',
          surface: '#352F44',
          subtle: '#231e30',
        },
        accent: {
          muted: '#5C5470',
          light: '#DBD8E3',
          glow: '#786d94',
        },
        card: {
          bg: '#352F44',
          border: '#5C5470',
          hover: '#423b55',
        },
        text: {
          primary: '#DBD8E3',
          secondary: '#a39cb3',
          muted: '#877f98',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(219, 216, 227, 0.1)',
        'glow-md': '0 0 30px rgba(92, 84, 112, 0.25)',
        'glow-lg': '0 0 50px rgba(120, 109, 148, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(42, 36, 56, 0.8) 100%)',
        'subtle-grid': 'linear-gradient(to right, rgba(92, 84, 112, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(92, 84, 112, 0.1) 1px, transparent 1px)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
