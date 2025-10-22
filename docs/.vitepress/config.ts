import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sphere UI',
  description: 'A modern UI component library for Vue 3 based on Tailwind CSS',
  lang: 'en-US',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Sphere UI' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/button' },
      { text: 'Playground', link: '/playground' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Theming', link: '/guide/theming' },
            { text: 'TypeScript', link: '/guide/typescript' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Basic Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Divider', link: '/components/divider' },
            { text: 'Tag', link: '/components/tag' },
          ],
        },
        {
          text: 'Form Components',
          items: [
            { text: 'Input', link: '/components/input' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Select', link: '/components/select' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Form', link: '/components/form' },
          ],
        },
        {
          text: 'Data Display',
          items: [
            { text: 'Table', link: '/components/table' },
            { text: 'Description', link: '/components/description' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Collapse', link: '/components/collapse' },
            { text: 'Pagination', link: '/components/pagination' },
          ],
        },
        {
          text: 'Feedback',
          items: [
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Loading', link: '/components/loading' },
          ],
        },
        {
          text: 'Navigation',
          items: [{ text: 'Context Menu', link: '/components/context-menu' }],
        },
        {
          text: 'Utilities',
          items: [{ text: 'Transition', link: '/components/transition' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/yourusername/sphere-ui' }],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present WillZhang',
    },

    editLink: {
      pattern: 'https://github.com/yourusername/sphere-ui/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      port: 5173,
      host: true,
      // Allow serving files from project root so theme can import `src/style.css`
      fs: {
        // allow importing from project root
        allow: ['..', '../..'],
      },
    },
  },
})
