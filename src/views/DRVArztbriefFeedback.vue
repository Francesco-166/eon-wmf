<script setup lang="ts">
// import { useHead } from '@unhead/vue'
import { onMounted, ref } from 'vue'

// const title = 'Kletterwald München – Anfahrt'
// const myPage = ref({
//   description:
//     'Anfahrt zum Kletterwald München ✅ Mit öffentlichen ✅ Tram 26 oder S7 ✅ und mit dem PKW',
// })
// useHead({
//   // ref (recommended)
//   title,
//   // computed getter (recommended)
//   meta: [{ name: 'description', content: () => myPage.value.description }],
// })

let oberserverFiredFirstTime = false
const iFrameSection = ref<Element>()
const animateIFrameSection = ref<boolean>(false)

const observer = new IntersectionObserver(
  ([entry]) => {
    // console.log(entry.target);
    if (oberserverFiredFirstTime == true) {
      //   console.log(entry.isIntersecting);
      oberserverFiredFirstTime = false
    } else if (entry.isIntersecting) {
      if (entry.target == iFrameSection.value) {
        console.log('iFrameSection animation')
        animateIFrameSection.value = entry.isIntersecting
      }
      observer.unobserve(entry.target)
    }
  },
  {
    threshold: 0.9,
  },
)

onMounted(() => {
  //   console.log("onMounted");
  if (iFrameSection.value) {
    // console.log("iFrameSection exists, starting observation");
    observer.observe(iFrameSection.value as Element)
  }
})
</script>

<template>
  <!-- <div class="spacer-30"></div> -->

  <section>
    <!-- <div class="container"> -->
    <div ref="iFrameSection">
      <!-- <div class="col-md-12 mb-30"> -->
      <transition name="fade">
        <div v-if="animateIFrameSection">
          <iframe
            src="https://anamnese-generator.1dc7pfjky15y.eu-de.codeengine.appdomain.cloud"
            width="100%"
            height="1000"
            frameborder="0"
            style="border: 0"
            allowfullscreen
          ></iframe>
        </div>
      </transition>
      <!-- </div> -->
    </div>

    <div class="spacer-30"></div>
    <!-- </div> -->
  </section>

  <div class="spacer-30"></div>
</template>

<style scoped></style>
