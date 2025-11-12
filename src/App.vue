<script setup lang="ts">
import { h, shallowRef } from 'vue'

import { Moon } from '@icon-park/vue-next'
import { useColorMode, useToggle } from '@vueuse/core'

import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Collapse,
  Dialog,
  Form,
  FormItem,
  Input,
  Pagination,
  Radio,
  Select,
  Tooltip,
} from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

const [open, toggleOpen] = useToggle()

const radio = shallowRef()
</script>

<template>
  <div class="bg-background relative h-svh w-svw space-y-10 p-10">
    <div>
      <Button variant="default" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
        {{ colorMode === 'light' ? 'Dark' : 'Light' }}
      </Button>
    </div>

    <Radio
      v-model="radio"
      :options="[
        { label: '1231', value: 1 },
        { label: '2', value: 2 },
      ]"
    />

    <Pagination :total="100" :page-size="10" :page-size-options="[10, 20, 30]" />

    <Card>
      <Form>
        <FormItem label="username" name="name">
          <Input class="w-full" type="text" placeholder="Placeholder" />
        </FormItem>

        <FormItem label="password" name="name">
          <Input class="w-full" type="text" placeholder="Placeholder" />
        </FormItem>
      </Form>
    </Card>

    <div>
      <Button @click="toggleOpen()"> Toggle dialog open </Button>

      <Dialog v-model="open" title="title" description="description">
        12312
        <template #footer>
          <Button variant="destructive">Cancel</Button>
          <Button variant="default">Save</Button>
        </template>
      </Dialog>
    </div>

    <Collapse
      :items="[
        { label: 'Collapse 1', key: '1', children: 'Collapse Content' },
        { label: 'Collapse 2', key: '2', children: 'Collapse Content' },
        { label: 'Collapse 3', key: '3', children: 'Collapse Content' },
      ]"
    />

    <Breadcrumb
      :items="[
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
      ]"
    />

    <Card>
      <template #title>Card Title</template>
      <template #description>Card Description</template>
      <p class="text-lg leading-7">This is a starter template.</p>

      <template #footer>
        <Button variant="destructive">Cancel</Button>
        <Button variant="default">Save</Button>
      </template>
    </Card>

    <Checkbox description="description"> Label </Checkbox>

    <Tooltip>
      <Button :icon="h(Moon)" variant="ghost">123</Button>

      <template #content> Tooltip </template>
    </Tooltip>

    <div class="w-1/2">
      <Select
        :options="[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ]"
      />
    </div>
  </div>
</template>
