import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/pokemons/pokemons-view.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
})

export default router
