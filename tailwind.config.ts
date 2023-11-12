import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'storm': '#353535',
        'cloudy': '#727272',
        'rainy': '#32596C',
        'snow': '#E6E6E6',
        'foggy': '#727272',
        'sunny': '#FFD67A',
      },
    },
  },
  plugins: [],
}
export default config
