<template>
  <div id="app-layout">
    <nav id="main-nav">
      <div class="nav-container">
        <router-link to="/" id="logo-nav-link">
          <img src="@/assets/img/logo_ciudad.png" alt="Logo Sonidos de la Ciudad" id="logo-nav">
        </router-link>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/artistas">Artistas</router-link></li>
          <li><router-link to="/cronograma">Cronograma</router-link></li>
          <li><router-link to="/entradas" class="nav-button-cta">Entradas</router-link></li>
          <li><router-link to="/ubicacion">Ubicación</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </div>
    </nav>

    <main>
      <router-view /> 
    </main>

    <footer>
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Sonidos de la Ciudad. Todos los derechos reservados.</p>
        <p>Síguenos en
          <a href="https://www.facebook.com/franco.rivero.7967/" target="_blank" rel="noopener noreferrer">Facebook</a> |
          <a href="https://www.instagram.com/p/DJhlXBevOy0/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
        <p><a href="mailto:info@sonidosdelaciudad.com">info@sonidosdelaciudad.com</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app-layout > main {
  flex-grow: 1;
}
</style>