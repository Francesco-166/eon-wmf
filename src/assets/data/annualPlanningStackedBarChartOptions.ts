// import Switcher from '@/components/Theme/Switcher.vue'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
const theme = ref(useStorage('theme', 'g10'))

// const theme = Switcher.theme
console.log(theme.value)

export default {
  title: 'Work order distribution by Month',
  // theme: theme.value, //'g90',
  axes: {
    left: {
      mapsTo: 'value',
      stacked: true,
      title: '%',
    },
    bottom: {
      mapsTo: 'key',
      scaleType: 'labels',
    },
  },
  height: '400px',
}
