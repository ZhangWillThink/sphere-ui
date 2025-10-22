# Sphere UI Documentation

This directory contains the documentation site for Sphere UI, built with VitePress.

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Start the development server:

```bash
bun run docs:dev
```

The documentation site will be available at `http://localhost:5173/`

### Build

Build the documentation for production:

```bash
bun run docs:build
```

### Preview Production Build

Preview the production build locally:

```bash
bun run docs:preview
```

## Directory Structure

```
docs/
├── .vitepress/          # VitePress configuration
│   ├── config.ts        # Site configuration
│   └── theme/           # Custom theme
│       ├── index.ts     # Theme entry
│       └── style.css    # Custom styles
├── guide/               # Guide pages
│   ├── introduction.md
│   ├── installation.md
│   ├── quick-start.md
│   └── configuration.md
├── components/          # Component documentation
│   ├── button.md
│   ├── input.md
│   └── ...
├── public/              # Static assets
└── index.md             # Home page
```

## Writing Documentation

### Creating a New Page

1. Create a new markdown file in the appropriate directory
2. Add frontmatter if needed
3. Write your content using markdown
4. Update `.vitepress/config.ts` to add the page to navigation

Example:

```markdown
---
title: My Page
description: Page description
---

# My Page

Content goes here...
```

### Using Components

You can use Sphere UI components directly in markdown:

```vue
<Button variant="primary">Click me</Button>
```

### Code Examples

Use fenced code blocks with language identifiers:

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <Button @click="count++">Count: {{ count }}</Button>
</template>
\`\`\`

### Demo Containers

Wrap live demos in demo containers:

```markdown
<div class="demo-container">
  <Button variant="primary">Demo Button</Button>
</div>
```

## Customization

### Theme Colors

Edit `.vitepress/theme/style.css` to customize colors:

```css
:root {
  --vp-c-brand-1: #3b82f6;
  --vp-c-brand-2: #2563eb;
  --vp-c-brand-3: #1d4ed8;
}
```

### Navigation

Edit `.vitepress/config.ts` to update navigation:

```typescript
export default defineConfig({
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/button' },
    ],
    sidebar: {
      // Sidebar configuration
    },
  },
})
```

## Contributing

When contributing to the documentation:

1. Follow the existing structure and style
2. Test your changes locally before submitting
3. Ensure all links work correctly
4. Check for spelling and grammar errors
5. Add code examples where appropriate
6. Include TypeScript types in examples

## Resources

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Vue 3 Documentation](https://vuejs.org/)