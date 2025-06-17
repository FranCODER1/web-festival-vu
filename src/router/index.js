import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistasView from '../views/ArtistasView.vue' // <<--- 1. ASEGÚRATE DE IMPORTAR ArtistasView.vue

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artistas', // <<--- 2. ASEGÚRATE DE QUE ESTA RUTA ESTÉ DEFINIDA
    name: 'artistas',
    component: ArtistasView // <<--- 3. ASEGÚRATE DE QUE APUNTE AL COMPONENTE CORRECTO
  }
  // Aquí puedes añadir las otras rutas más adelante
  // { path: '/cronograma', name: 'cronograma', component: () => import('../views/CronogramaView.vue') },
  // { path: '/entradas', name: 'entradas', component: () => import('../views/EntradasView.vue') },
  // { path: '/ubicacion', name: 'ubicacion', component: () => import('../views/UbicacionView.vue') },
  // { path: '/contacto', name: 'contacto', component: () => import('../views/ContactoView.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // o import.meta.env.BASE_URL para Vite
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
})

export default router