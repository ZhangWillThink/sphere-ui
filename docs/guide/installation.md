# Installation

This guide will help you install Sphere UI in your Vue 3 project.

## Prerequisites

Before installing Sphere UI, make sure you have:

- **Node.js** version 16.x or higher
- **Vue 3** version 3.x or higher
- A package manager: **npm**, **yarn**, **pnpm**, or **bun**

## Package Manager

Choose your preferred package manager to install Sphere UI:

::: code-group

```bash [npm]
npm install sphere-ui
```

```bash [yarn]
yarn add sphere-ui
```

```bash [pnpm]
pnpm add sphere-ui
```

```bash [bun]
bun add sphere-ui
```

:::

## Install Peer Dependencies

Sphere UI requires several peer dependencies to work properly. Install them using your package manager:

::: code-group

```bash [npm]
npm install vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss
```

```bash [yarn]
yarn add vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss
```

```bash [pnpm]
pnpm add vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss
```

```bash [bun]
bun add vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss
```

:::

## Peer Dependencies Explained

Here's what each peer dependency does:

| Package | Purpose |
|---------|---------|
| `vue` | The Vue.js framework (v3.x) |
| `@icon-park/vue-next` | Icon library for Vue 3 |
| `@tailwindcss/vite` | Tailwind CSS Vite plugin |
| `@vueuse/core` | Collection of Vue composition utilities |
| `class-variance-authority` | CSS class variance utility |
| `lodash-es` | JavaScript utility library |
| `tailwindcss` | Utility-first CSS framework |

## Version Compatibility

Sphere UI follows semantic versioning. Here's the compatibility matrix:

| Sphere UI Version | Vue Version | Node Version |
|-------------------|-------------|--------------|
| 0.1.x | ^3.0.0 | >=16.0.0 |

## Using a CDN

While we recommend installing via npm for better tree-shaking and build optimization, you can also use Sphere UI via CDN:

```html
<!-- Import Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Import Sphere UI -->
<link rel="stylesheet" href="https://unpkg.com/sphere-ui/dist/sphere-ui.css">
<script src="https://unpkg.com/sphere-ui/dist/sphere-ui.umd.js"></script>
```

::: warning
CDN usage is not recommended for production as it doesn't support tree-shaking and may have performance implications.
:::

## Development Build

If you want to use the latest development version from GitHub:

```bash
# Clone the repository
git clone https://github.com/yourusername/sphere-ui.git
cd sphere-ui

# Install dependencies
bun install

# Build the library
bun run build

# Link locally
npm link
```

Then in your project:

```bash
npm link sphere-ui
```

## Verify Installation

After installation, verify that Sphere UI is properly installed by checking your `package.json`:

```json
{
  "dependencies": {
    "sphere-ui": "^0.1.4",
    "vue": "^3.5.22",
    "@icon-park/vue-next": "latest",
    "@tailwindcss/vite": "latest",
    "@vueuse/core": "latest",
    "class-variance-authority": "latest",
    "lodash-es": "latest",
    "tailwindcss": "latest"
  }
}
```

## Troubleshooting

### Peer Dependency Warnings

If you see peer dependency warnings during installation, make sure all required packages are installed with compatible versions.

### TypeScript Errors

If you're using TypeScript and encounter type errors, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  }
}
```

### Build Errors

If you encounter build errors, try:

1. Clear your `node_modules` and lock file
2. Reinstall dependencies
3. Clear your build cache

```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that you've installed Sphere UI, proceed to the [Quick Start](/guide/quick-start) guide to learn how to use it in your application.