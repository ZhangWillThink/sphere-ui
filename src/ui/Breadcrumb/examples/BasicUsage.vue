<script setup lang="ts">
import Breadcrumb from '../index.vue'
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-semibold">Basic Breadcrumb</h2>

    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components">Components</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components/breadcrumb">Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>

    <h2 class="mt-6 mb-4 text-lg font-semibold">Custom Separator</h2>

    <Breadcrumb separator=">">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components">Components</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components/breadcrumb">Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>

    <h2 class="mt-6 mb-4 text-lg font-semibold">Custom Separator Slot</h2>

    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components">Components</Breadcrumb.Item>
      <Breadcrumb.Item href="#/components/breadcrumb">Breadcrumb</Breadcrumb.Item>
      <template #separator>
        <Breadcrumb.Separator>→</Breadcrumb.Separator>
      </template>
    </Breadcrumb>
  </div>
</template>
