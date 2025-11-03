<script setup lang="ts">
// External imports
import { h } from 'vue'

// Local imports
import Breadcrumb from '../index.vue'

// Create a VNode for a link
const ApplicationCenterLink = () => h('a', { href: '#/application-center' }, 'Application Center')
const ApplicationListLink = () => h('a', { href: '#/application-list' }, 'Application List')
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-semibold">Breadcrumb with VNode Titles</h2>

    <Breadcrumb
      :items="[
        {
          title: 'Home',
        },
        {
          title: h('a', { href: '#/application-center' }, 'Application Center'),
        },
        {
          title: h('a', { href: '#/application-list' }, 'Application List'),
        },
        {
          title: 'An Application',
        },
      ]"
    />

    <h2 class="mt-6 mb-4 text-lg font-semibold">Breadcrumb with Component Titles</h2>

    <Breadcrumb
      :items="[
        {
          title: 'Home',
        },
        {
          title: ApplicationCenterLink(),
        },
        {
          title: ApplicationListLink(),
        },
        {
          title: 'An Application',
        },
      ]"
    />
  </div>
</template>
