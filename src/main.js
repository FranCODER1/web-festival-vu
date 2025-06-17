// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import './assets/css/estilos.css' // <--- AÑADE ESTA LÍNEA

const app = createApp(App).use(router)

app.use(router) // Asegúrate de usar el router

app.mount('#app')