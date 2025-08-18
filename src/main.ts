// import './assets/drv.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CarbonVue3 from '@carbon/vue'
import ChartsVue from '@carbon/charts-vue'
import i18next from 'i18next'
import httpBackend from 'i18next-http-backend'
import I18NextVue from 'i18next-vue'
// import App from './App.vue'
// import DRVApp from './DRVApp.vue'
import EONApp from './EONApp.vue'
import router from './router'

// import './styles/tailwind.css'
import '@carbon/charts-vue/styles.css'

// import DRVIncubatorNavigationBar from '@/components/DRVIncubatorNavigationBar.vue'

const localLang = localStorage.getItem('language') || 'en'
const i18nInitialized = i18next.use(httpBackend).init({
  lng: localLang,
  fallbackLng: 'en',
  backend: {
    loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  },
})
i18nInitialized.then(() => {
  const app = createApp(EONApp)

  app.use(router)
  app.use(CarbonVue3)
  app.use(ChartsVue)
  app.use(createPinia())
  app.use(I18NextVue, { i18next })

  // app.component('DRVIncubatorNavigationBar', DRVIncubatorNavigationBar)

  app.mount('#app')
})
