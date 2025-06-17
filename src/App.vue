<template>
  <div id="app-layout">
    <nav id="main-nav">
      <div class="nav-container">
        <router-link to="/" id="logo-nav-link">
          <img src="@/assets/img/logo_ciudad.png" alt="Logo Sonidos de la Ciudad" id="logo-nav">
        </router-link>

        <!-- Botón de Hamburguesa - Visible solo en móviles -->
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

        <!-- Enlaces de Navegación - Clase condicional para móvil -->
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
      isMobileMenuOpen: false, // Estado para controlar si el menú móvil está abierto
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() { // Para cerrar el menú al hacer clic en un enlace del menú
      this.isMobileMenuOpen = false;
    },
    closeMobileMenuIfOpen() { // Para cerrar si se hace clic fuera del menú (en el main content)
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    }
  },
  watch: {
    // Opcional: Cerrar el menú si la ruta cambia 
    // (útil si el usuario usa los botones de atrás/adelante del navegador)
    '$route'() {
      this.closeMobileMenu();
    }
  }
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

/* Estilos para los iconos del footer */
footer .fab, footer .fas {
  margin-right: 0.3em;
  font-size: 1.1em;
}

/* Estilo para el icono en el botón de entradas del nav */
.nav-button-cta i.fas {
  margin-right: 0.5em;
}

/* --- ESTILOS HAMBURGUESA Y MENÚ MÓVIL --- */
.hamburger-menu {
  display: none; /* Oculto por defecto, se mostrará con media query */
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px; /* Área de toque */
  z-index: 1010; /* Asegurar que esté por encima del contenido del nav */
  margin-left: auto; /* Para empujarlo a la derecha si es necesario */
}

.hamburger-menu .bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: var(--color-text-light); /* Color de las barras */
  transition: all 0.3s ease-in-out;
}

/* Animación para convertir hamburguesa en 'X' cuando está activo */
.hamburger-menu.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger-menu.is-active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger-menu.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Estilos para el nav en móvil */
/* AJUSTA ESTE BREAKPOINT (900px) SEGÚN TUS NECESIDADES */
@media (max-width: 900px) { 
  .nav-container {
    /* Si el logo y la hamburguesa no se alinean bien, puedes usar flex aquí también */
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
  }

  .hamburger-menu {
    display: block; /* Mostrar el botón de hamburguesa */
  }

  /* Ocultar la lista de enlaces de escritorio por defecto en móvil */
  nav#main-nav ul {
    display: none; 
    flex-direction: column;
    position: absolute; 
    top: 100%;
    left: 0;
    width: 100%;
    /* Un color de fondo ligeramente diferente al del navbar para el menú desplegable */
    background-color: rgba(var(--rgb-secondary-blue), 0.98); /* Un poco más opaco */
    -webkit-backdrop-filter: blur(8px); /* Desenfoque más sutil para el menú */
    backdrop-filter: blur(8px);
    padding: 0.5rem 0; /* Menos padding vertical */
    box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.35);
    z-index: 1005; /* Debajo del botón hamburguesa si es necesario, pero encima del contenido */
    border-top: 1px solid rgba(var(--rgb-text-light), 0.15);
  }

  /* Mostrar la lista cuando el menú móvil está activo */
  nav#main-nav ul.mobile-nav-active {
    display: flex; 
  }

  nav#main-nav ul li {
    margin: 0;
    width: 100%;
    text-align: left; /* Alinear texto a la izquierda en el menú desplegable */
  }

  nav#main-nav ul li a {
    padding: 0.9em 1.5em; /* Padding para los items */
    display: block; /* Para que ocupen todo el ancho del li */
    border-bottom: 1px solid rgba(var(--rgb-text-light), 0.1);
    font-size: 1rem; 
    color: var(--color-text-light); /* Asegurar color de texto */
    text-transform: uppercase; /* Mantener mayúsculas */
    font-weight: 500; /* Mantener peso */
  }

  nav#main-nav ul li:last-child a {
    border-bottom: none;
  }

  /* Estilo para el botón CTA dentro del menú móvil */
  nav#main-nav ul li a.nav-button-cta {
    margin: 0.75rem auto; /* Centrar el botón y dar espacio */
    width: calc(100% - 3rem); /* Ancho con padding a los lados */
    max-width: 280px; /* Ancho máximo para el botón */
    display: block; /* Para que margin: auto funcione */
    text-align: center;
    border-radius: 25px; /* Mantener bordes redondeados */
    background-color: var(--color-primary-red); /* Color de fondo del CTA */
    color: var(--color-text-light) !important; /* Asegurar color de texto del CTA */
    padding: 0.8em 1em; /* Padding del CTA */
    border-bottom: none; /* Quitar borde inferior del CTA */
  }
   nav#main-nav ul li a.nav-button-cta:hover {
       background-color: var(--color-hover-red) !important;
   }

   /* Quitar efectos de hover de escritorio si no se desean en el menú móvil */
   nav#main-nav ul li a:hover,
   nav#main-nav ul li a:focus {
      background-color: rgba(var(--rgb-primary-red), 0.2); /* Un hover sutil en los items */
      color: var(--color-text-light);
      transform: none; 
   }
    nav#main-nav ul li a.active { /* Estilo para el link activo en el menú móvil */
        background-color: var(--color-primary-red);
        color: var(--color-text-light) !important;
    }
   nav#main-nav ul li a.active::before { /* Ocultar línea de "active" de escritorio */
       display: none;
   }
}
</style>