# Theming

Learn how to customize the look and feel of Sphere UI components to match your brand.

## Overview

Sphere UI is built with Tailwind CSS, making it incredibly easy to customize. You can theme components at multiple levels:

- **Tailwind Configuration**: Customize design tokens (colors, spacing, fonts)
- **CSS Variables**: Override component-specific styles
- **Component Props**: Use built-in variant and size props
- **Custom Classes**: Apply Tailwind utilities directly to components

## Tailwind Theme Customization

### Custom Colors

Define your brand colors in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Your brand colors
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Custom semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
}
```

### Custom Spacing

Adjust spacing scale:

```javascript
export default {
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
}
```

### Custom Border Radius

Define border radius values:

```javascript
export default {
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
}
```

### Custom Fonts

Add custom font families:

```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
}
```

## CSS Variables

Sphere UI uses CSS variables for dynamic theming. Override them in your global CSS:

### Creating a Custom Theme

```css
/* styles/theme.css */

:root {
  /* Primary Colors */
  --sphere-primary-50: 240 249 255;
  --sphere-primary-100: 224 242 254;
  --sphere-primary-200: 186 230 253;
  --sphere-primary-300: 125 211 252;
  --sphere-primary-400: 56 189 248;
  --sphere-primary-500: 14 165 233;
  --sphere-primary-600: 2 132 199;
  --sphere-primary-700: 3 105 161;
  --sphere-primary-800: 7 89 133;
  --sphere-primary-900: 12 74 110;

  /* Component Specific */
  --sphere-button-radius: 0.375rem;
  --sphere-button-padding-x: 1rem;
  --sphere-button-padding-y: 0.5rem;
  
  --sphere-input-radius: 0.375rem;
  --sphere-input-border: 1px solid rgb(209 213 219);
  --sphere-input-focus-border: 1px solid rgb(59 130 246);
  
  --sphere-card-radius: 0.5rem;
  --sphere-card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --sphere-transition-duration: 150ms;
  --sphere-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode */
.dark {
  --sphere-primary-500: 56 189 248;
  --sphere-bg: 17 24 39;
  --sphere-text: 243 244 246;
}
```

### Import Your Theme

```typescript
// main.ts
import './styles/theme.css'
import 'sphere-ui/style.css'
```

## Component-Level Theming

### Using Tailwind Classes

Apply Tailwind utilities directly to components:

```vue
<template>
  <!-- Custom button styles -->
  <Button 
    class="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg"
  >
    Custom Styled Button
  </Button>
  
  <!-- Custom input styles -->
  <Input 
    class="border-2 border-purple-300 focus:border-purple-600 rounded-xl"
    placeholder="Custom input"
  />
  
  <!-- Custom card styles -->
  <Card class="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl shadow-xl">
    <h3 class="text-2xl font-bold text-purple-900">Custom Card</h3>
    <p class="text-purple-700">With custom styling</p>
  </Card>
</template>
```

### Creating Component Wrappers

Create themed wrapper components:

```vue
<!-- components/BrandButton.vue -->
<script setup lang="ts">
import { Button } from 'sphere-ui'

interface Props {
  variant?: 'primary' | 'secondary'
}

defineProps<Props>()
</script>

<template>
  <Button 
    :class="[
      'font-semibold rounded-full shadow-md transition-all',
      variant === 'primary' 
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300'
    ]"
  >
    <slot />
  </Button>
</template>
```

Use your themed component:

```vue
<template>
  <BrandButton variant="primary">Primary Action</BrandButton>
  <BrandButton variant="secondary">Secondary Action</BrandButton>
</template>
```

## Theme Presets

### Light Theme

```css
/* themes/light.css */
:root {
  --sphere-bg-primary: 255 255 255;
  --sphere-bg-secondary: 249 250 251;
  --sphere-text-primary: 17 24 39;
  --sphere-text-secondary: 107 114 128;
  --sphere-border: 229 231 235;
  --sphere-primary: 59 130 246;
}
```

### Dark Theme

```css
/* themes/dark.css */
.dark {
  --sphere-bg-primary: 17 24 39;
  --sphere-bg-secondary: 31 41 55;
  --sphere-text-primary: 243 244 246;
  --sphere-text-secondary: 156 163 175;
  --sphere-border: 55 65 81;
  --sphere-primary: 96 165 250;
}
```

### Toggle Dark Mode

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const isDark = ref(false)

watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
})
</script>

<template>
  <Button @click="isDark = !isDark">
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </Button>
</template>
```

## Brand Themes

### Professional Theme

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      borderRadius: {
        DEFAULT: '0.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      },
    },
  },
}
```

### Modern Theme

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          50: '#faf5ff',
          500: '#8b5cf6',
          900: '#581c87',
        },
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
}
```

### Minimal Theme

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          50: '#f9fafb',
          500: '#6b7280',
          900: '#111827',
        },
      },
      borderRadius: {
        DEFAULT: '0',
      },
    },
  },
}
```

## Dynamic Theming

### Theme Provider

Create a theme provider component:

```vue
<!-- components/ThemeProvider.vue -->
<script setup lang="ts">
import { provide, reactive } from 'vue'

interface Theme {
  primary: string
  secondary: string
  radius: string
}

const theme = reactive<Theme>({
  primary: 'blue',
  secondary: 'gray',
  radius: 'md',
})

provide('theme', theme)

const updateTheme = (newTheme: Partial<Theme>) => {
  Object.assign(theme, newTheme)
}

provide('updateTheme', updateTheme)
</script>

<template>
  <div :class="`theme-${theme.primary}`">
    <slot />
  </div>
</template>
```

### Use Theme Context

```vue
<script setup lang="ts">
import { inject } from 'vue'

const theme = inject('theme')
const updateTheme = inject('updateTheme')
</script>

<template>
  <div>
    <select @change="updateTheme({ primary: $event.target.value })">
      <option value="blue">Blue</option>
      <option value="purple">Purple</option>
      <option value="green">Green</option>
    </select>
  </div>
</template>
```

## Best Practices

### 1. Use Design Tokens

Define reusable design tokens:

```javascript
// config/design-tokens.js
export const tokens = {
  colors: {
    brand: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, sans-serif',
    },
  },
}
```

### 2. Maintain Consistency

Use consistent values across your application:

```vue
<template>
  <!-- Good: Consistent spacing -->
  <div class="space-y-4">
    <Button class="mb-4">Button 1</Button>
    <Button class="mb-4">Button 2</Button>
  </div>
  
  <!-- Bad: Inconsistent spacing -->
  <div>
    <Button class="mb-3">Button 1</Button>
    <Button class="mb-5">Button 2</Button>
  </div>
</template>
```

### 3. Test Color Contrast

Ensure sufficient color contrast for accessibility:

```vue
<template>
  <!-- Good: High contrast -->
  <Button class="bg-blue-600 text-white">
    Accessible Button
  </Button>
  
  <!-- Bad: Low contrast -->
  <Button class="bg-blue-200 text-blue-300">
    Hard to Read
  </Button>
</template>
```

### 4. Document Your Theme

Create a theme documentation file:

```markdown
# Brand Theme

## Colors
- Primary: #3b82f6
- Secondary: #8b5cf6
- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444

## Typography
- Font Family: Inter
- Headings: Bold, 1.5 line height
- Body: Regular, 1.6 line height

## Spacing
- Base unit: 0.25rem (4px)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64
```

## Examples

### Complete Theme Setup

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/sphere-ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
}
```

```css
/* styles/theme.css */
@import 'tailwindcss';

:root {
  --sphere-primary: theme('colors.brand.500');
  --sphere-radius: theme('borderRadius.DEFAULT');
}

.dark {
  --sphere-bg: theme('colors.gray.900');
  --sphere-text: theme('colors.gray.100');
}
```

## Resources

- [Tailwind CSS Theming](https://tailwindcss.com/docs/theme)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Design Tokens](https://www.designtokens.org/)

## Next Steps

- Explore [TypeScript](/guide/typescript) integration
- Learn about [Configuration](/guide/configuration)
- Check out [Components](/components/button)