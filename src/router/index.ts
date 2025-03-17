import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DRVHome.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/arztbrief-backend',
      name: 'arztbrief-backend',
      component: () => import('../views/DRVArztbriefBackend.vue'),
    },
    {
      path: '/arztbrief-feedback',
      name: 'arztbrief-feedback',
      component: () => import('../views/DRVArztbriefFeedback.vue'),
    },
    {
      path: '/arztbrief-summarizer',
      name: 'arztbrief-summarizer',
      component: () => import('../views/DRVArztbriefSummarizer.vue'),
    },
    {
      path: '/pflegegutachten',
      name: 'pflegegutachten',
      component: () => import('../views/DRVPflegegutachten.vue'),
    },
    {
      path: '/anamnese-generator',
      name: 'anamnese-generator',
      component: () => import('../views/DRVAnamneseGenerator.vue'),
    },
    {
      path: '/anonymizer',
      name: 'anonymizer',
      component: () => import('../views/DRVAnonymizer.vue'),
    },
    {
      path: '/patienten-uebersicht',
      name: 'patienten-uebersicht',
      component: () => import('../views/DRVPatientenUebersicht.vue'),
    },
  ],
})

export default router
