<script setup lang="ts">
import DRVIcon from './icons/IconDRV.vue'
import DRVIncubatorMenu from './DRVIncubatorMenu.vue'
import { ref, onBeforeMount } from 'vue'

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})

const stickyHeader = ref(false)

function handleScroll() {
  if (window.scrollY > 1) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}
</script>

<template>
  <!-- HEADER -->
  <header class="header" :class="stickyHeader ? 'sticky' : ''">
    <div class="container">
      <!-- logo -->
      <div class="logo">
        <RouterLink to="/">
          <DRVIcon />
        </RouterLink>
      </div>
      <!--End logo-->

      <!--Switcher-->
      <!-- <div class="sectionswitcher">
        <RouterLink class="section_active_1 section_1" to="/">
          <i class="fa fa-circle"></i>
          Kletterwald
        </RouterLink>
        <RouterLink to="/events-home">
          <i class="fa fa-circle-o"></i>
          Teamevents
        </RouterLink>
      </div> -->
      <!--End Switcher-->

      <!--Menu-->
      <DRVIncubatorMenu />
      <!--End Menu-->
    </div>
  </header>
</template>

<!-- <template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template> -->
