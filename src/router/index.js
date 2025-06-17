import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistasView from '../views/ArtistasView.vue'
import CronogramaView from '../views/CronogramaView.vue'
import EntradasView from '../views/EntradasView.vue'
import UbicacionView from '../views/UbicacionView.vue'
import ContactoView from '../views/ContactoView.vue'
// Importa aquí las otras vistas cuando las crees:
// import EntradasView from '../views/EntradasView.vue'
// import UbicacionView from '../views/UbicacionView.vue'
// import ContactoView from '../views/ContactoView.vue'

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
  }
  // Descomenta y completa estas rutas cuando tengas los componentes de vista:
  // {
  //   path: '/entradas',
  //   name: 'entradas',
  //   component: EntradasView // Asegúrate de importar EntradasView arriba
  // },
  // {
  //   path: '/ubicacion',
  //   name: 'ubicacion',
  //   component: UbicacionView // Asegúrate de importar UbicacionView arriba
  // },
  // {
  //   path: '/contacto',
  //   name: 'contacto',
  //   component: ContactoView // Asegúrate de importar ContactoView arriba
  // },

  // Opcional: Una ruta "catch-all" para páginas no encontradas (404)
  // {
  //   path: '/:catchAll(.*)', // Vue Router 4.x syntax for catch-all
  //   name: 'NotFound',
  //   component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue') // Crea este componente
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Para Vue CLI con Webpack
  // Si usas Vite, sería: history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active', // Clase para el enlace activo (coincide con tu CSS)
  linkExactActiveClass: 'exact-active', // Clase para el enlace exacto activo (coincide con tu CSS)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Si el usuario vuelve atrás, restaura la posición de scroll
      return savedPosition;
    } else if (to.hash) {
      // Si hay un hash en la URL (ej. #video-promo), haz scroll a ese elemento
      return {
        el: to.hash,
        behavior: 'smooth', // Scroll suave
      };
    } else {
      // Por defecto, haz scroll al inicio de la página en cada nueva navegación
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
})

export default router