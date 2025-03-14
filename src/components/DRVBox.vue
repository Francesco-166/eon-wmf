<script setup lang="ts">
import { onMounted } from 'vue'
// import { RouterLink } from 'vue-router'
// import DRVRouterLink from '@/components/DRVRouterLink.vue'
import { type htmlModule } from '@/definitions/interfaces'

const props = defineProps<{
  classes?: string
  modules: htmlModule[]
}>()

for (const module of props.modules) {
  // console.log(module);
  let imgSource = null
  if (module.image) {
    if (module.image?.path == '@/assets/img/img-550-300/') {
      imgSource = await import(
        `@/assets/img/img-550-300/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }

    if (imgSource) {
      module.image.imgSource = imgSource
    }
  }
  // console.log(imgSources);
}

onMounted(() => {})
</script>

<template>
  <div :class="props.classes">
    <div v-for="(module, idx) in props.modules" :key="idx" :class="module.classes">
      <!-- <div v-if="module.image?.imgSource">
        <RouterLink v-if="module.image?.link" :to="`${module.image?.link}`">
          <img
            alt="1"
            :src="module.image?.imgSource"
            :class="module.image?.classes"
            :height="module.image?.height"
          />
        </RouterLink>
        <img
          v-else
          alt="1"
          :src="module.image?.imgSource"
          :class="module.image?.classes"
          :height="module.image?.height"
        />
      </div> -->
      {{ module.html }}
      <!-- <div v-html="module.html"></div> -->
    </div>
  </div>
</template>

<style scoped>
section {
  height: 500px;
  background-position: center;
  background-size: cover;
}
</style>
