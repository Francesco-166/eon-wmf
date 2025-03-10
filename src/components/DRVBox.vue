<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
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

    if (module.image?.path == '@/assets/img/img-round/') {
      imgSource = await import(
        `@/assets/img/img-round/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }

    // kwm
    if (module.image?.path == '@/assets/img/_img-540-300/') {
      imgSource = await import(
        `@/assets/img/_img-540-300/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/_img-550-250/') {
      imgSource = await import(
        `@/assets/img/_img-550-250/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/_img-header-large/') {
      imgSource = await import(
        `@/assets/img/_img-header-large/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/escape-game/') {
      imgSource = await import(
        `@/assets/img/escape-game/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/event-overview/') {
      imgSource = await import(
        `@/assets/img/event-overview/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/events/') {
      imgSource = await import(
        `@/assets/img/events/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/full/') {
      imgSource = await import(
        `@/assets/img/full/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-550-300/') {
      imgSource = await import(
        `@/assets/img/img-550-300/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-big-home/') {
      imgSource = await import(
        `@/assets/img/img-big-home/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-content/') {
      // console.log("img found: @/assets/img/img-content/");
      // console.log(module.image.filename);
      imgSource = await import(
        `@/assets/img/img-content/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-content-1-2/') {
      // console.log("img found: @/assets/img/img-content/");
      // console.log(module.image.filename);
      imgSource = await import(
        `@/assets/img/img-content-1-2/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-feature-home/') {
      imgSource = await import(
        `@/assets/img/img-feature-home/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-kwm-info/') {
      imgSource = await import(
        `@/assets/img/img-kwminfo/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-parcours/') {
      imgSource = await import(
        `@/assets/img/img-parcours/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-round/') {
      imgSource = await import(
        `@/assets/img/img-round/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/img-slide-small-home/') {
      imgSource = await import(
        `@/assets/img/img-slide-small-home/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/map/') {
      imgSource = await import(
        `@/assets/img/map/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img/slider-kletterwald/') {
      imgSource = await import(
        `@/assets/img/slider-kletterwald/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }

    // teamevents
    if (module.image?.path == '@/assets/img-teamevents/_img-header-large/') {
      console.log('_img-header-large')
      imgSource = await import(
        `@/assets/img-teamevents/_img-header-large/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/header-large/') {
      imgSource = await import(
        `@/assets/img-teamevents/header-large/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/header-small/') {
      imgSource = await import(
        `@/assets/img-teamevents/header-small/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/img-550-200/') {
      imgSource = await import(
        `@/assets/img-teamevents/img-550-200/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/img-550-300/') {
      imgSource = await import(
        `@/assets/img-teamevents/img-550-300/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/img-800-500/') {
      imgSource = await import(
        `@/assets/img-teamevents/img-800-500/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/img-medium/') {
      imgSource = await import(
        `@/assets/img-teamevents/img-medium/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/slider-location/') {
      imgSource = await import(
        `@/assets/img-teamevents/slider-location/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    if (module.image?.path == '@/assets/img-teamevents/slider-teamevents/') {
      imgSource = await import(
        `@/assets/img-teamevents/slider-teamevents/${module.image.filename}.${module.image.extension}`
      ).then((x) => x.default)
    }
    // console.log(imgSource0);
    // imgSources.push(imgSource0);
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
