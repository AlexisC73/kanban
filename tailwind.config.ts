import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'dropdown-shadow': '0 10px 20px 0 rgba(54, 78, 126, 0.25)',
        'card-task': '0px 4px 6px 0 rgba(54, 78, 126, 0.1)',
      },
      colors: {
        'Main-Purple': '#635FC7',
        'Main-Purple-Hover': '#A8A4FF',
        Black: '#000112',
        'Very-Dark-Grey': '#20212C',
        'Dark-Grey': '#2B2C37',
        'Lines-Dark': '#3E3F4E',
        'Medium-Grey': '#828FA3',
        'Lines-Light': '#E4EBFA',
        'Light-Grey': '#F4F7FD',
        Red: '#EA5555',
        'Red-Hover': '#FF9898',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'Heading-XL': [
          '1.5rem',
          {
            lineHeight: '1.875rem',
            fontWeight: '700',
          },
        ],
        'Heading-L': [
          '1.125rem',
          {
            lineHeight: '1.4375rem',
            fontWeight: '700',
          },
        ],
        'Heading-M': [
          '0.9375rem',
          {
            lineHeight: '1.1875rem',
            fontWeight: '700',
          },
        ],
        'Heading-S': [
          '0.75rem',
          {
            lineHeight: '0.9375rem',
            fontWeight: '700',
            letterSpacing: '0.15rem',
          },
        ],
        'Body-L': [
          '0.8125rem',
          {
            lineHeight: '1.4375rem',
            fontWeight: '500',
          },
        ],
        'Body-M': [
          '0.75rem',
          {
            lineHeight: '0.9375rem',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [],
}
export default config
