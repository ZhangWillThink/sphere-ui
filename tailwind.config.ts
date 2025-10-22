import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{vue,ts,tsx}',
    './docs/.vitepress/**/*.{vue,ts,tsx}',
    './docs/**/*.{md,mdx}',
    './playground/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
