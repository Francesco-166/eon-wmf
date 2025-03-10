<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import SpacerSection from '@/components/SpacerSection.vue'
// import { getErrorMessage } from './composables/helpers'

// const route = useRoute()

const asyncContentFinishedLoading = ref<boolean>(false)
const animateContentContainer = ref<boolean>(false)
const loader = ref<Element>()
const target = ref<Element>()

const observer = new IntersectionObserver(
  ([entry]) => {
    animateContentContainer.value = entry.isIntersecting
    // console.log('observer triggered')
    // console.log(animateContentContainer.value)
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
    }
  },
  {
    threshold: 0.5,
  },
)

onMounted(() => {})

function onPending() {
  // console.log('onPending...')
  // getHPTexts()
}

function onResolve() {
  // console.log('onResolve...')
  nextTick(() => {
    asyncContentFinishedLoading.value = true
    // console.log('async loading FINISHED')
    // console.log(target.value) // Now, target should be defined
    // console.log(loader.value)

    if (target.value) {
      observer.observe(target.value as Element)
    }
  })
}

function onReject() {
  // console.log('onReject')
}

withDefaults(defineProps<{ animationType?: string }>(), {
  animationType: 'fade',
})
</script>

<template>
  <main class="full-intro background--light">
    <Suspense :onPending="onPending" :onResolve="onResolve" :onReject="onReject">
      <template #default>
        <Transition name="fade">
          <div v-show="asyncContentFinishedLoading" class="demo-container">
            <!-- NavigationBar -->
            <DRVIncubatorNavigationBar />
            <!-- NavigationBar End -->

            <!-- Spacer Section -->
            <SpacerSection />
            <!-- End Spacer Section -->

            <!-- Content -->
            <RouterView />
            <!-- Content End -->
          </div>
        </Transition>
      </template>

      <template #fallback>
        <!-- Preloader -->
        <Transition name="fade">
          <section v-show="!asyncContentFinishedLoading" id="preloader">
            <div class="loader" id="loader" ref="loader">
              <div>Loading...</div>
              <div class="loader-img"></div>
            </div>
          </section>
        </Transition>
        <!-- End Preloader -->
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.background_color_slider {
  width: 100%;
}
</style>
