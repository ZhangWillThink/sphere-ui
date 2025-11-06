<script setup lang="ts">
import { useColorMode, useToggle } from '@vueuse/core'

import { Button, Dialog } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

const [open, toggleOpen] = useToggle(true)
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Button variant="primary" @click="toggleOpen()">Open</Button>

    <Dialog v-model="open">
      <template #title>
        <h1>Title</h1>
      </template>
      <template #description>
        <p>Content</p>
      </template>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut atque expedita non impedit
      similique quam quasi, iure sint reprehenderit harum, iste dolorem provident! Ducimus debitis
      rerum dicta velit numquam sed? Debitis corporis voluptas nostrum, tempora ad saepe! Nulla, ut
      sed eum corrupti quae, facilis quis molestias ea excepturi quos modi similique asperiores,
      harum nisi fuga quas saepe quia ipsum aperiam. Quo ex doloribus, excepturi deserunt quaerat
      alias quidem voluptatum hic porro pariatur optio magni rem laudantium quos libero natus
      possimus similique nobis mollitia illo. Ducimus culpa tenetur nostrum consectetur ab! Quos
      aliquam velit dignissimos dolorem reprehenderit laboriosam! A impedit veniam at minus cum ab
      dicta commodi ex necessitatibus harum, velit repellendus ad quasi debitis minima, corporis
      consequuntur voluptas, recusandae laboriosam. Iusto ut aut deleniti illum, eius suscipit natus
      eum quae nemo vel aliquid nihil sed consequuntur! Velit, odio, voluptates nostrum in
      accusantium eius eveniet vel eaque cum inventore veniam sapiente? Ullam minima blanditiis quos
      corrupti minus sapiente sit tempore dicta molestiae commodi? Itaque iusto odit voluptate ullam
      corporis doloribus rem voluptatum est magni! Consequatur voluptate eius reiciendis suscipit
      doloribus nulla? Cupiditate minus consequatur dolor quibusdam autem itaque. Deserunt velit
      quos ullam culpa praesentium blanditiis. Fugit quo voluptatibus reiciendis quisquam aut
      ratione? Deserunt facilis esse, modi odit dolores sunt sed ipsa. Temporibus molestiae quam
      facere, numquam aliquam tempore ipsam. Placeat, voluptate ea. Ducimus cupiditate quasi, iusto,
      numquam consequuntur laudantium nam nesciunt natus repellendus fugit asperiores dicta
      quibusdam quos sed! Beatae, et. Illum, dicta, nisi repudiandae ipsa architecto voluptatum
      numquam mollitia vero in tenetur natus officiis repellat alias hic iure sit repellendus
      facilis! Illum assumenda, corporis nihil eius aperiam cumque fugiat soluta. Ex, ipsum quaerat.
      Officia corporis, maxime consequatur nulla incidunt ipsam earum accusamus modi totam quos nemo
      debitis soluta laudantium quisquam autem, porro unde facere minima odio impedit aliquid
      commodi vero.

      <template #footer>
        <Button variant="primary" @click="toggleOpen(false)">Close</Button>
      </template>
    </Dialog>
  </div>
</template>
