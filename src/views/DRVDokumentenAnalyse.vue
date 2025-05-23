<script setup lang="ts">
import { onMounted, ref } from 'vue'

let observerFiredFirstTime = false
const iFrameSection = ref<Element>()
const animateIFrameSection = ref<boolean>(false)

const observer = new IntersectionObserver(
  ([entry]) => {
    // console.log(entry.target);
    if (observerFiredFirstTime == true) {
      //   console.log(entry.isIntersecting);
      observerFiredFirstTime = false
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
            src="https://keycloak-ui-release.pic-rhos-vpc-cluster-41f6e661cc85d0fd89d529791d8d1453-0001.eu-de.containers.appdomain.cloud/realms/cortex/protocol/openid-connect/auth?approval_prompt=force&client_id=cortex-login&redirect_uri=https%3A%2F%2Fcortex-ui-release.pic-rhos-vpc-cluster-41f6e661cc85d0fd89d529791d8d1453-0001.eu-de.containers.appdomain.cloud%2Foauth2%2Fcallback&response_type=code&scope=openid&state=nhcKIhwp4L9lPNFOPuS3NCEOwXtUHTd5Jy7E1isyopE%3A%2F"
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
