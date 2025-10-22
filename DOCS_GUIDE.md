# Sphere UI Documentation Guide

## 📚 Documentation Overview

I've created a comprehensive documentation site for Sphere UI using VitePress. Here's everything you need to know!

## 🚀 Quick Start

### Running the Documentation

To preview the documentation site locally:

```bash
# Make sure you're in the tensor-ui directory
cd tensor-ui

# Start the VitePress development server
bun run docs:dev
```

The documentation will be available at: **http://localhost:5173/**

### Other Commands

```bash
# Build documentation for production
bun run docs:build

# Preview production build
bun run docs:preview
```

## 📁 What's Been Created

### Documentation Structure

```
tensor-ui/
├── README.md                    # Main project README
├── DOCS_GUIDE.md               # This file
└── docs/
    ├── .vitepress/
    │   ├── config.ts           # VitePress configuration
    │   └── theme/
    │       ├── index.ts        # Custom theme setup
    │       └── style.css       # Custom styles
    ├── guide/
    │   ├── introduction.md     # Project introduction
    │   ├── installation.md     # Installation guide
    │   ├── quick-start.md      # Quick start tutorial
    │   └── configuration.md    # Configuration guide
    ├── components/
    │   └── button.md           # Button component docs
    ├── index.md                # Home page
    ├── playground.md           # Interactive playground
    └── README.md               # Docs development guide
```

## 📝 Documentation Pages Created

### Home Page (`docs/index.md`)
- Hero section with branding
- Feature highlights (12 key features)
- Quick action buttons
- Beautiful landing page design

### Guide Section

1. **Introduction** (`guide/introduction.md`)
   - What is Sphere UI
   - Key features
   - Design principles
   - Browser support

2. **Installation** (`guide/installation.md`)
   - Package manager installation
   - Peer dependencies
   - CDN usage
   - Troubleshooting

3. **Quick Start** (`guide/quick-start.md`)
   - Full import setup
   - On-demand import
   - TypeScript usage
   - Complete examples
   - Starter templates

4. **Configuration** (`guide/configuration.md`)
   - Tailwind CSS setup
   - Vite configuration
   - Component registration
   - TypeScript config
   - Framework-specific setup

### Components Section

1. **Button** (`components/button.md`)
   - Basic usage examples
   - All variants (primary, secondary, outline, ghost, danger)
   - Sizes (sm, md, lg, xl)
   - Disabled state
   - Loading state
   - Block buttons
   - Icon buttons
   - API documentation
   - TypeScript examples
   - Accessibility notes
   - Best practices

### Interactive Pages

1. **Playground** (`playground.md`)
   - Interactive component demos
   - Real-time prop changes
   - Button playground
   - Form components showcase
   - Data display examples
   - Feedback components

## 🎨 Features Included

### Theme Customization
- Custom color scheme (Blue primary)
- Responsive design
- Dark mode support
- Custom CSS variables

### Navigation
- Top navigation bar
- Sidebar with categories
- Search functionality (local)
- Mobile-friendly menu

### Component Integration
- All Sphere UI components registered
- Live demos in documentation
- Interactive examples
- Code syntax highlighting

### Styling
- Demo containers for live previews
- Props tables
- Color palettes
- Badge components
- Responsive grid layouts

## 🛠️ Adding New Documentation

### Adding a New Component Page

1. Create a new markdown file in `docs/components/`:
```bash
touch docs/components/input.md
```

2. Add the page structure:
```markdown
# Input

Brief description of the component.

## Basic Usage

<div class="demo-container">
  <Input placeholder="Enter text..." />
</div>

\`\`\`vue
<template>
  <Input placeholder="Enter text..." />
</template>
\`\`\`

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `''` | Placeholder text |
```

3. Add to navigation in `docs/.vitepress/config.ts`:
```typescript
sidebar: {
  '/components/': [
    {
      text: 'Form Components',
      items: [
        { text: 'Input', link: '/components/input' },
        // ... other components
      ],
    },
  ],
}
```

### Adding a New Guide Page

1. Create file in `docs/guide/`:
```bash
touch docs/guide/theming.md
```

2. Add to sidebar in config:
```typescript
sidebar: {
  '/guide/': [
    {
      text: 'Advanced',
      items: [
        { text: 'Theming', link: '/guide/theming' },
      ],
    },
  ],
}
```

## 📋 TODO: Additional Pages to Create

### Guide Section
- [ ] `guide/theming.md` - Theming and customization
- [ ] `guide/typescript.md` - TypeScript integration guide
- [ ] `guide/faq.md` - Frequently asked questions
- [ ] `guide/migration.md` - Migration guides

### Component Documentation
- [ ] `components/input.md`
- [ ] `components/textarea.md`
- [ ] `components/select.md`
- [ ] `components/checkbox.md`
- [ ] `components/radio.md`
- [ ] `components/form.md`
- [ ] `components/card.md`
- [ ] `components/table.md`
- [ ] `components/dialog.md`
- [ ] `components/tooltip.md`
- [ ] `components/popover.md`
- [ ] `components/tabs.md`
- [ ] `components/collapse.md`
- [ ] `components/pagination.md`
- [ ] `components/description.md`
- [ ] `components/tag.md`
- [ ] `components/divider.md`
- [ ] `components/loading.md`
- [ ] `components/context-menu.md`
- [ ] `components/transition.md`

### Additional Sections
- [ ] Examples gallery
- [ ] Best practices
- [ ] Contributing guide
- [ ] Changelog
- [ ] Roadmap

## 🎯 Best Practices for Documentation

### Writing Style
1. **Be Clear**: Use simple, direct language
2. **Be Consistent**: Follow existing patterns
3. **Be Complete**: Include all necessary information
4. **Be Visual**: Use demos and examples

### Code Examples
1. Always include working code samples
2. Show TypeScript types when relevant
3. Demonstrate common use cases
4. Include error handling examples

### Component Documentation Template
```markdown
# Component Name

Brief description (1-2 sentences)

## Basic Usage

Live demo + code example

## Variants/Options

Different configurations with demos

## API

### Props
Table of all props

### Events
Table of all events

### Slots
Table of all slots

### Exposed Methods
Table of exposed methods

## TypeScript

TypeScript usage examples

## Accessibility

Accessibility features and guidelines

## Best Practices

Tips for using the component

## Examples

Real-world usage examples
```

## 🔧 Configuration Files

### VitePress Config (`docs/.vitepress/config.ts`)
- Site metadata
- Navigation structure
- Sidebar configuration
- Theme settings
- Search configuration
- Social links

### Theme Setup (`docs/.vitepress/theme/index.ts`)
- Registers all Sphere UI components
- Extends default VitePress theme
- Makes components available in markdown

### Custom Styles (`docs/.vitepress/theme/style.css`)
- Custom color schemes
- Demo container styles
- Props table styling
- Badge components
- Utility classes

## 🚨 Important Notes

### Fixed Issues
1. **Removed `rolldown-vite` override** from `package.json` for VitePress compatibility
2. **Installed VitePress** and added documentation scripts
3. **Created theme integration** to use Sphere UI components in docs

### Known Issues
- Bun lockfile warnings (can be ignored)
- Peer dependency warnings (non-blocking)

### Requirements
- Node.js 16+ 
- Bun (or npm/yarn/pnpm)
- All Sphere UI peer dependencies installed

## 🌐 Deployment

### Build for Production
```bash
bun run docs:build
```

Output will be in `docs/.vitepress/dist/`

### Deploy Options
1. **GitHub Pages**: Use `.github/workflows` with VitePress action
2. **Netlify**: Connect repository and set build command
3. **Vercel**: Import project and configure
4. **Custom Server**: Upload `dist` folder to any static host

### Example GitHub Pages Workflow
```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## 📚 Resources

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎉 Summary

You now have a fully functional documentation site with:
- ✅ Beautiful home page
- ✅ Comprehensive guides
- ✅ Component documentation
- ✅ Interactive playground
- ✅ Search functionality
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Live component demos

**To get started**: Run `bun run docs:dev` and open http://localhost:5173/

Happy documenting! 🚀