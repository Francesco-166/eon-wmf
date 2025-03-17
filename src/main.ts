import './assets/drv.css'
import { createApp } from 'vue'
// import App from './App.vue'
import DRVApp from './DRVApp.vue'
import router from './router'

import DRVIncubatorNavigationBar from '@/components/DRVIncubatorNavigationBar.vue'

const app = createApp(DRVApp)

app.use(router)

app.component('DRVIncubatorNavigationBar', DRVIncubatorNavigationBar)

app.mount('#app')
