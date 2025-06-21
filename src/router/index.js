import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistasView from '../views/ArtistasView.vue'
import CronogramaView from '../views/CronogramaView.vue'
import EntradasView from '../views/EntradasView.vue'
import UbicacionView from '../views/UbicacionView.vue'
import ContactoView from '../views/ContactoView.vue'
import GraciasContactoView from '../views/GraciasContactoView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artistas',
    name: 'artistas',
    component: ArtistasView
  },
  {
    path: '/cronograma',
    name: 'cronograma',
    component: CronogramaView
  },
  {
    path: '/entradas',
    name: 'entradas',
    component: EntradasView
  },
  {
    path: '/ubicacion',
    name: 'ubicacion',
    component: UbicacionView
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: ContactoView
  },
  { 
    path: '/contacto/gracias', 
    name: 'graciasContacto',
    component: GraciasContactoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes,
  linkActiveClass: 'active', 
  linkExactActiveClass: 'exact-active', 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
})

export default router