import './assets/drv.css'
import { createApp } from 'vue'
// import App from './App.vue'
import DRVApp from './DRVApp.vue'
import router from './router'

import DRVIncubatorNavigationBar from '@/components/DRVIncubatorNavigationBar.vue'

// console.log(import.meta.env.VITE_APP_PARSE_KWM2_APPID)
// console.log(import.meta.env.VITE_APP_PARSE_KWM2_JSKEY)

const app = createApp(DRVApp)

app.use(router)

app.component('DRVIncubatorNavigationBar', DRVIncubatorNavigationBar)

app.mount('#app')
