<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Tabs } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">Toggle Color Mode</Button>

    <Tabs
      :items="[
        { label: '123', value: 1 },
        { label: '456', value: 2 },
      ]"
    >
      <template #tab-1>
        <div>Lorem ipsum dolor sit.</div>
        <div>Enim quod excepturi facere!</div>
        <div>Quod omnis dolores explicabo.</div>
        <div>Repellendus, odio. Dolor, rerum!</div>
        <div>Repudiandae illo totam eius?</div>
        <div>Dolores aliquam amet officiis?</div>
        <div>Recusandae nulla nostrum mollitia.</div>
        <div>Laborum necessitatibus eum quod.</div>
        <div>Eius cupiditate nisi facilis!</div>
        <div>Nihil praesentium facere dignissimos!</div>
        <div>Hic rem non molestias!</div>
        <div>Porro ex ipsam necessitatibus.</div>
        <div>Est corrupti laborum doloribus.</div>
        <div>Maxime aut magni quam!</div>
        <div>Illo corrupti iusto ducimus?</div>
        <div>Voluptate numquam ipsa illo?</div>
        <div>Dicta reiciendis earum dolorem?</div>
        <div>A esse quia quo.</div>
        <div>Porro quae nulla iste?</div>
        <div>Delectus laborum repudiandae praesentium?</div>
        <div>Quibusdam exercitationem recusandae temporibus?</div>
        <div>Voluptatibus eligendi ullam sit.</div>
        <div>Ex qui blanditiis omnis.</div>
        <div>Quae dolorum ratione nemo.</div>
        <div>Iusto accusamus ullam neque!</div>
        <div>Repudiandae dolorem magni autem?</div>
        <div>Quisquam labore mollitia incidunt?</div>
        <div>Facere optio quibusdam maiores.</div>
        <div>Ipsa itaque hic eius?</div>
        <div>Hic quibusdam illum aliquid!</div>
        <div>Aut facilis corrupti vitae?</div>
        <div>Id qui tempora impedit.</div>
        <div>Dolore quaerat suscipit eius!</div>
        <div>Reprehenderit, tempora. Quibusdam, ipsum!</div>
        <div>Odio quibusdam in numquam.</div>
        <div>Ea ab autem commodi!</div>
        <div>Perferendis placeat cupiditate maxime?</div>
        <div>Eius necessitatibus quibusdam commodi?</div>
        <div>Laudantium officia pariatur minus.</div>
        <div>Voluptate aliquid dignissimos nesciunt.</div>
        <div>Modi, quaerat. Voluptate, odit.</div>
        <div>Ducimus illo dolores voluptatibus?</div>
        <div>Praesentium quisquam molestiae officia.</div>
        <div>Facere neque dicta earum!</div>
        <div>Maiores perspiciatis doloribus inventore.</div>
        <div>Sit voluptate dignissimos repellendus?</div>
        <div>Magnam consectetur rem quia!</div>
        <div>Quidem exercitationem repudiandae saepe.</div>
        <div>Ex veniam eius nihil.</div>
        <div>Quidem dolorem provident necessitatibus.</div>
        <div>Natus illum debitis architecto?</div>
        <div>Ad delectus tempora vitae!</div>
        <div>Tempora ea fugit quo!</div>
        <div>Reiciendis natus beatae maiores.</div>
        <div>Distinctio minus ipsa maxime!</div>
        <div>Expedita repellendus iure amet?</div>
        <div>Harum dolore mollitia autem!</div>
        <div>Consectetur laborum necessitatibus modi.</div>
        <div>Ab et distinctio inventore.</div>
        <div>Doloremque neque id labore?</div>
        <div>Nihil voluptatum neque labore.</div>
        <div>Dolor adipisci ut aut?</div>
        <div>Consequuntur velit ipsam facilis.</div>
        <div>Recusandae facere odit quis?</div>
        <div>Neque tempora accusamus reiciendis!</div>
        <div>Vel nihil neque ab!</div>
        <div>Temporibus repellat distinctio voluptatum.</div>
        <div>Laudantium nobis commodi consequuntur.</div>
        <div>Nulla perspiciatis voluptatem dolor.</div>
        <div>Aliquid id commodi molestiae.</div>
        <div>Neque a pariatur saepe?</div>
        <div>Eaque quibusdam sed nemo?</div>
        <div>Enim deleniti dolores doloribus?</div>
        <div>Consequuntur tempore asperiores illum.</div>
        <div>Sed praesentium perspiciatis suscipit.</div>
        <div>Eaque sequi hic modi?</div>
        <div>Perspiciatis eligendi tempore maiores.</div>
        <div>Amet error sed qui!</div>
        <div>Commodi vel illum repudiandae!</div>
        <div>Minima dicta corporis libero.</div>
        <div>Quam mollitia inventore at.</div>
        <div>Officiis totam at quam!</div>
        <div>Repudiandae rerum nobis eum.</div>
        <div>Quasi non magni ratione.</div>
        <div>Sint aliquam odit nihil!</div>
        <div>Praesentium, itaque earum. Eos.</div>
        <div>Porro ex necessitatibus vitae?</div>
        <div>Necessitatibus possimus eos blanditiis.</div>
        <div>Voluptatibus facilis explicabo nihil?</div>
        <div>Architecto perferendis corporis maiores!</div>
        <div>Ducimus incidunt ipsam tenetur?</div>
        <div>Aut necessitatibus expedita earum.</div>
        <div>Libero maiores praesentium sed.</div>
        <div>Ut illo quasi quis.</div>
        <div>Similique asperiores aliquam ipsa!</div>
        <div>Cumque incidunt ullam quas?</div>
        <div>Sapiente quisquam odio consequatur!</div>
        <div>Mollitia sunt ipsa temporibus.</div>
        <div>Sit ipsum blanditiis magnam.</div>
        <div>Harum doloribus amet temporibus!</div>
      </template>
      <template #tab-2>
        <div>456</div>
      </template>
    </Tabs>
  </div>
</template>
