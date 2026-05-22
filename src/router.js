import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import ProductPage from './components/ProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
