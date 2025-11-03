# Breadcrumb

Breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

## API

### Breadcrumb Props

| Property   | Description                   | Type                                           | Default |
| ---------- | ----------------------------- | ---------------------------------------------- | ------- |
| separator  | Custom separator character    | `string \| VNodeChild`                         | `'/'`   |
| items      | The breadcrumb items          | `BreadcrumbItem[]`                             | -       |
| params     | Routing parameters            | `Record<string, any>`                          | -       |
| routes     | The routing stack information | `BreadcrumbRoute[]`                            | -       |
| itemRender | Custom item renderer          | `(route, params, routes, paths) => VNodeChild` | -       |

### Breadcrumb Slots

| Name      | Description      |
| --------- | ---------------- |
| default   | Breadcrumb items |
| separator | Custom separator |

### BreadcrumbItem Interface

| Property | Description                           | Type                          | Default |
| -------- | ------------------------------------- | ----------------------------- | ------- |
| title    | The title of the breadcrumb item      | `string \| VNodeChild`        | -       |
| href     | Target of hyperlink                   | `string`                      | -       |
| class    | The additional css class              | `string`                      | -       |
| onClick  | Set the handler to handle click event | `(event: MouseEvent) => void` | -       |

### Breadcrumb.Item Props

| Property | Description                           | Type                          | Default |
| -------- | ------------------------------------- | ----------------------------- | ------- |
| href     | Target of hyperlink                   | `string`                      | -       |
| class    | The additional css class              | `string`                      | -       |
| onClick  | Set the handler to handle click event | `(event: MouseEvent) => void` | -       |

### Breadcrumb.Item Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Breadcrumb item content |

### Breadcrumb.Separator Slots

| Name    | Description              |
| ------- | ------------------------ |
| default | Custom separator content |

## Examples

### Basic Usage

```vue
<script setup lang="ts">
import { Breadcrumb } from 'sphere-ui'
</script>

<template>
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#/components">Components</Breadcrumb.Item>
    <Breadcrumb.Item href="#/components/breadcrumb">Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
</template>
```

### Using Items Prop (Recommended)

```vue
<script setup lang="ts">
import { Breadcrumb } from 'sphere-ui'
</script>

<template>
  <Breadcrumb
    :items="[
      {
        title: 'Home',
      },
      {
        title: 'Application Center',
        href: '#/application-center',
      },
      {
        title: 'Application List',
        href: '#/application-list',
      },
      {
        title: 'An Application',
      },
    ]"
  />
</template>
```

### Custom Separator

```vue
<template>
  <Breadcrumb
    separator=">"
    :items="[
      { title: 'Home' },
      { title: 'Application Center', href: '#/application-center' },
      { title: 'Application List', href: '#/application-list' },
      { title: 'An Application' },
    ]"
  />
</template>
```

### Custom Separator Slot

```vue
<template>
  <Breadcrumb
    :items="[
      { title: 'Home' },
      { title: 'Application Center', href: '#/application-center' },
      { title: 'Application List', href: '#/application-list' },
      { title: 'An Application' },
    ]"
  >
    <template #separator>
      <Breadcrumb.Separator>→</Breadcrumb.Separator>
    </template>
  </Breadcrumb>
</template>
```
