/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F8FAFC',
          light: '#FFFFFF',
          dark: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        gold: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
        },
        cyber: {
          cyan: '#0891B2',
          emerald: '#059669',
          purple: '#7C3AED',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E40AF' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(217, 119, 6, 0.3)',
        'glow-cyan': '0 0 20px rgba(8, 145, 178, 0.3)',
        'glow-emerald': '0 0 20px rgba(5, 150, 105, 0.3)',
        'glow-accent': '0 0 20px rgba(30, 64, 175, 0.3)',
      },
    },
  },
  plugins: [],
}