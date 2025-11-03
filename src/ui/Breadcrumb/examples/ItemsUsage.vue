<script setup lang="ts">
import Breadcrumb from '../index.vue'
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-semibold">Breadcrumb with Items Prop</h2>

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

    <h2 class="mt-6 mb-4 text-lg font-semibold">Breadcrumb with Custom Separator</h2>

    <Breadcrumb
      separator=">"
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
  </div>
</template>
