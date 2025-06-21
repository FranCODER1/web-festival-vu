import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Mantenemos HomeView con importación normal, ya que es la primera página

// Ya no necesitamos importar ArtistasView, CronogramaView, etc., aquí arriba

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // La vista de inicio se carga inmediatamente
  },
  {
    path: '/artistas',
    name: 'artistas',
    // Lazy load ArtistasView
    component: () => import(/* webpackChunkName: "artistas" */ '../views/ArtistasView.vue')
  },
  {
    path: '/cronograma',
    name: 'cronograma',
    // Lazy load CronogramaView
    component: () => import(/* webpackChunkName: "cronograma" */ '../views/CronogramaView.vue')
  },
  {
    path: '/entradas',
    name: 'entradas',
    // Lazy load EntradasView
    component: () => import(/* webpackChunkName: "entradas" */ '../views/EntradasView.vue')
  },
  {
    path: '/ubicacion',
    name: 'ubicacion',
    // Lazy load UbicacionView
    component: () => import(/* webpackChunkName: "ubicacion" */ '../views/UbicacionView.vue')
  },
  {
    path: '/contacto',
    name: 'contacto',
    // Lazy load ContactoView
    component: () => import(/* webpackChunkName: "contacto" */ '../views/ContactoView.vue')
  },
  {
    path: '/contacto/gracias', // Página de gracias para el formulario
    name: 'graciasContacto',
    // Lazy load GraciasContactoView
    component: () => import(/* webpackChunkName: "gracias-contacto" */ '../views/GraciasContactoView.vue')
  },
  // Opcional: Ruta NotFound (si la creas)
  // {
  //   path: '/:catchAll(.*)', 
  //   name: 'NotFound',
  //   component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Para Vue CLI con Webpack
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }; // Ajusta 'top' si tu navbar tiene una altura fija
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
})

export default router