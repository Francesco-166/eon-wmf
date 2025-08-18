import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/annualPlanningStart',
      name: 'annualPlanningStart',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AnnualPlanningStart.vue'),
    },
    {
      path: '/annualPlanning',
      name: 'annualPlanning',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AnnualPlanning.vue'),
    },
    {
      path: '/dispatchingStart',
      name: 'dispatchingStart',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DispatchingStart.vue'),
    },
    {
      path: '/dispatching',
      name: 'dispatching',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Dispatching.vue'),
    },
    {
      path: '/dispatchingReview',
      name: 'dispatchingReview',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DispatchingReview.vue'),
    },
    {
      path: '/dispatchingFinal',
      name: 'dispatchingFinal',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DispatchingFinal.vue'),
    },
    {
      path: '/dispatchingGanttPlanner',
      name: 'dispatchingGanttPlanner',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DispatchingGanttPlanner.vue'),
    },
    {
      path: '/scenarioPlanning',
      name: 'scenarioPlanning',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ScenarioPlanning.vue'),
    },
    {
      path: '/fish',
      name: 'fish',
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FishView.vue'),
    },
    {
      path: '/build-a-bug',
      name: 'build-a-bug',
      component: () => import('../views/BuildABugView.vue'),
    },
    {
      path: '/bugs',
      name: 'bugs',
      component: () => import('../views/BugsView.vue'),
    },
    {
      path: '/villagers',
      name: 'villagers',
      component: () => import('../views/VillagersView.vue'),
    },
  ],
})

export default router
