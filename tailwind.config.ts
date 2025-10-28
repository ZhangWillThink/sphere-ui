import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // 使用 class 策略
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
} satisfies Config
