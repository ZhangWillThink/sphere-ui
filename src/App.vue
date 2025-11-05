<script setup lang="ts">
import { shallowRef } from 'vue'

import { Select } from './ui'

defineOptions({ name: 'App' })

const cls = shallowRef('p-7')
setTimeout(() => {
  cls.value = 'p-10'
}, 1000)
</script>

<template>
  <div :class="cls">
    <Select
      :options="[
        { label: '123', value: 1 },
        { label: '456', value: 2 },
      ]"
    />
  </div>
</template>
