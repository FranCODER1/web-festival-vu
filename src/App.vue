<template>
  <div id="app-layout">
    <nav id="main-nav"> 
      <div class="nav-container"> 
        <router-link to="/" id="logo-nav-link">
          <img src="@/assets/img/logo_ciudad.png" alt="Logo Sonidos de la Ciudad" id="logo-nav">
        </router-link>

        <button 
          class="hamburger-menu" 
          @click="toggleMobileMenu" 
          :class="{ 'is-active': isMobileMenuOpen }" 
          aria-label="Abrir menú de navegación" 
          :aria-expanded="isMobileMenuOpen.toString()"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

     
        <ul :class="{ 'mobile-nav-active': isMobileMenuOpen }">
          <li><router-link to="/" @click="closeMobileMenu">Inicio</router-link></li>
          <li><router-link to="/artistas" @click="closeMobileMenu">Artistas</router-link></li>
          <li><router-link to="/cronograma" @click="closeMobileMenu">Cronograma</router-link></li>
          <li>
            <router-link to="/entradas" class="nav-button-cta" @click="closeMobileMenu">
              <i class="fas fa-ticket-alt"></i> Entradas
            </router-link>
          </li>
          <li><router-link to="/ubicacion" @click="closeMobileMenu">Ubicación</router-link></li>
          <li><router-link to="/contacto" @click="closeMobileMenu">Contacto</router-link></li>
        </ul>
      </div>
    </nav>

    <main @click="closeMobileMenuIfOpen"> 
      <router-view /> 
    </main>

    <footer>
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Sonidos de la Ciudad. Todos los derechos reservados.</p>
        <p>Síguenos en
          <a href="https://www.facebook.com/franco.rivero.7967/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook-square"></i> Facebook
          </a> |
          <a href="https://www.instagram.com/p/DJhlXBevOy0/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i> Instagram
          </a>
        </p>
        <p><a href="mailto:info@sonidosdelaciudad.com"><i class="fas fa-envelope"></i> info@sonidosdelaciudad.com</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    closeMobileMenuIfOpen() {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    }
  },
  watch: {
    '$route'() {
      this.closeMobileMenu();
    }
  }
}
</script>

<style>
/* ESTILOS GLOBALES ESPECÍFICOS DE APP.VUE O AJUSTES MENORES */
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app-layout > main {
  flex-grow: 1;
}

footer .fab, footer .fas {
  margin-right: 0.3em;
  font-size: 1.1em;
}

.nav-button-cta i.fas {
  margin-right: 0.5em;
}

/* Estilos para .nav-container (si no están ya en estilos.css global o para asegurar precedencia) */
/* Y ASEGURAR position:relative para el menú absoluto */
nav#main-nav .nav-container {
  width: 90%; 
  max-width: 1300px; 
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Clave para el posicionamiento del menú desplegable absoluto */
}

/* --- ESTILOS HAMBURGUESA Y MENÚ MÓVIL --- */
.hamburger-menu {
  display: none; 
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px; 
  z-index: 1010; /* Encima del menú desplegable */
  margin-left: auto; 
}

.hamburger-menu .bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: var(--color-text-light); 
  transition: all 0.3s ease-in-out;
}

.hamburger-menu.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger-menu.is-active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger-menu.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 900px) { /* AJUSTA ESTE BREAKPOINT SEGÚN NECESITES */
  .hamburger-menu {
    display: block; 
  }

  /* Estilos para el UL cuando está en modo "MENÚ DESPLEGABLE MÓVIL" */
  /* El selector es nav#main-nav ul para que coincida con los estilos de escritorio en especificidad */
  nav#main-nav ul {
    /* Por defecto en móvil (sin .mobile-nav-active), está oculto */
    display: none;
    
    /* Estilos para cuando SÍ está activo y desplegado */
    flex-direction: column;
    align-items: stretch; 
    position: absolute;             
    top: 100%; /* Relativo a .nav-container */                     
    left: 0;
    width: 100%;       
    background-color: rgba(var(--rgb-secondary-blue), 0.98); /* Fondo del menú desplegado */
    -webkit-backdrop-filter: blur(8px); 
    backdrop-filter: blur(8px);
    padding: 0.5rem 0; 
    box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.35);
    z-index: 1005; /* Debe estar por encima del contenido de la página (main) */
                   /* pero debajo del botón hamburguesa (que tiene 1010) */
    border-top: 1px solid rgba(var(--rgb-text-light), 0.15);
  }

  nav#main-nav ul.mobile-nav-active {
    display: flex !important; /* Fuerza la visualización. Si esto funciona, luego intentamos quitar !important */
  }
  
  nav#main-nav ul li {
    margin: 0; /* Sobrescribe el margen de escritorio */
    width: 100%;
    text-align: left; 
  }

  nav#main-nav ul li a {
    padding: 0.9em 1.5em; 
    display: block; 
    border-bottom: 1px solid rgba(var(--rgb-text-light), 0.1);
    font-size: 1rem; 
    color: var(--color-text-light); 
    text-transform: uppercase; 
    font-weight: 500; 
    position: static; /* Evitar position:relative del hover de escritorio si interfiere */
  }
  nav#main-nav ul li a::before { /* Ocultar la línea animada de escritorio en el menú móvil */
    display: none;
  }


  nav#main-nav ul li:last-child a {
    border-bottom: none;
  }

  nav#main-nav ul li a.nav-button-cta {
    margin: 0.75rem auto; 
    width: calc(100% - 3rem); 
    max-width: 280px; 
    display: block; 
    text-align: center;
    border-radius: 25px; 
    background-color: var(--color-primary-red); 
    color: var(--color-text-light) !important; 
    padding: 0.8em 1em; 
    border-bottom: none; 
  }
  nav#main-nav ul li a.nav-button-cta:hover {
      background-color: var(--color-hover-red) !important;
  }

  nav#main-nav ul li a:hover,
  nav#main-nav ul li a:focus {
      background-color: rgba(var(--rgb-primary-red), 0.2); 
      transform: none; 
  }
  nav#main-nav ul li a.active { 
      background-color: var(--color-primary-red);
      color: var(--color-text-light) !important;
  }
  /* nav#main-nav ul li a.active::before ya está display:none arriba */
}
</style>