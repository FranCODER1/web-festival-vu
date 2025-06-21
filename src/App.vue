<template>
  <div id="app-layout" :class="{ 'mobile-menu-is-active-on-body': isMobileMenuOpen }">
    <nav id="main-nav">
      <div class="nav-container">
        <router-link to="/" id="logo-nav-link-main" @click="closeMobileMenu">
          <img src="@/assets/img/logo_ciudad.png" alt="Logo Sonidos de la Ciudad" id="logo-nav-img">
        </router-link>

        <ul class="desktop-nav-links">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/artistas">Artistas</router-link></li>
          <li><router-link to="/cronograma">Cronograma</router-link></li>
          <li><router-link to="/ubicacion">Ubicación</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>

        <router-link to="/entradas" class="nav-button-cta desktop-cta-button" @click="closeMobileMenu">
          <i class="fas fa-ticket-alt"></i> Entradas
        </router-link>

        <button
          class="hamburger-menu"
          @click="toggleMobileMenu"
          :class="{ 'is-active': isMobileMenuOpen }"
          aria-label="Abrir/Cerrar menú de navegación"
          :aria-expanded="isMobileMenuOpen.toString()"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </nav>

    <div class="mobile-menu-overlay" :class="{ 'is-open': isMobileMenuOpen }" @click.self="closeMobileMenu">
      <ul class="mobile-nav-links">
        <li><router-link to="/" @click="closeMobileMenu">Inicio</router-link></li>
        <li><router-link to="/artistas" @click="closeMobileMenu">Artistas</router-link></li>
        <li><router-link to="/cronograma" @click="closeMobileMenu">Cronograma</router-link></li>
        <li><router-link to="/ubicacion" @click="closeMobileMenu">Ubicación</router-link></li>
        <li><router-link to="/contacto" @click="closeMobileMenu">Contacto</router-link></li>
        <li>
          <router-link to="/entradas" class="nav-button-cta-mobile" @click="closeMobileMenu">
            <i class="fas fa-ticket-alt"></i> Entradas
          </router-link>
        </li>
      </ul>
    </div>

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
/* Layout principal y estilos que afectan a toda la app */
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#app-layout.mobile-menu-is-active-on-body {
  /* overflow: hidden; */
}
#app-layout > main {
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

/* --- NAVBAR ESTILOS BASE --- */
nav#main-nav {
  background-color: rgba(var(--rgb-background-surface-dark), 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1011;
  box-shadow: 0 2px 10px rgba(var(--rgb-black), 0.2);
}

nav#main-nav .nav-container {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 15px;
  /* position: relative; No es necesario si el logo ya no es absoluto en desktop */
  height: 60px; /* Aumentamos un poco la altura para el logo más grande */
}

/* Logo */
#logo-nav-link-main { /* Nueva ID para el enlace del logo */
  display: flex; /* Para centrar la imagen si tiene padding */
  align-items: center;
  margin-right: auto; /* Empuja los links de escritorio y el CTA a la derecha */
  z-index: 1;
}
#logo-nav-img { /* Nueva ID para la imagen del logo */
  width: 70px; /* LOGO MÁS GRANDE EN ESCRITORIO */
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}
#logo-nav-img:hover { transform: scale(1.1); }


/* --- NAV DE ESCRITORIO --- */
ul.desktop-nav-links {
  list-style: none;
  padding: 0;
  margin: 0; /* El logo y el CTA lo empujarán */
  display: flex;
  align-items: center;
  height: 100%;
  /* Quitar flex-grow para que no compita con el margin-right:auto del logo y margin-left:auto del CTA */
}
ul.desktop-nav-links li {
  margin: 0 0.75rem; /* Un poco más de margen */
}
ul.desktop-nav-links li a {
  color: var(--color-text-light);
  padding: 0.6em 1em;
  display: block;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.85rem; /* Puedes mantener o ajustar */
  border-radius: 5px;
  position: relative;
  transition: color 0.3s ease, transform 0.2s ease; /* Quitado background-color */
}
ul.desktop-nav-links li a::before {
  content: ''; position: absolute; bottom: 3px; left: 50%;
  width: 0; height: 2px; background-color: var(--color-primary-red);
  transition: width 0.3s ease-out; transform: translateX(-50%);
}
ul.desktop-nav-links li a:hover,
ul.desktop-nav-links li a:focus,
ul.desktop-nav-links li a.router-link-active,
ul.desktop-nav-links li a.router-link-exact-active {
  background-color: transparent; /* Ya estaba */
  color: var(--color-primary-red);
  transform: translateY(-1px);
}
ul.desktop-nav-links li a:hover::before,
ul.desktop-nav-links li a:focus::before,
ul.desktop-nav-links li a.router-link-active::before,
ul.desktop-nav-links li a.router-link-exact-active::before {
  width: 60%;
}

/* Botón CTA "Entradas" para ESCRITORIO */
.desktop-cta-button {
  background-color: var(--color-primary-red);
  color: var(--color-text-light) !important;
  padding: 0.7em 1.4em; /* Padding ajustado */
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.85rem;
  margin-left: 1.5rem; /* Espacio a la izquierda del botón CTA */
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex; /* Para alinear el icono y el texto */
  align-items: center;
}
.desktop-cta-button:hover {
  background-color: var(--color-hover-red) !important;
  transform: translateY(-2px);
}
.desktop-cta-button i.fas {
  margin-right: 0.6em;
}


/* --- ESTILOS HAMBURGUESA --- */
.hamburger-menu {
  display: none; /* OCULTO por defecto en escritorio */
  /* ... (resto de estilos de hamburguesa sin cambios) ... */
  flex-direction: column; justify-content: space-around; align-items: center;
  width: 40px; height: 40px; background: transparent; border: 2px solid var(--color-text-light);
  border-radius: 4px; cursor: pointer; padding: 6px; z-index: 1012; /* Alto para estar encima de todo en el nav */
  position: relative;
}
.hamburger-menu .bar { display: block; width: 20px; height: 2px; background-color: var(--color-text-light); transition: all 0.3s ease-in-out; border-radius: 1px; }
.hamburger-menu.is-active .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger-menu.is-active .bar:nth-child(2) { opacity: 0; }
.hamburger-menu.is-active .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.hamburger-menu.is-active { border-color: var(--color-primary-red); }
.hamburger-menu.is-active .bar { background-color: var(--color-primary-red); }


/* --- ESTILOS DEL MENÚ MÓVIL DESPLEGABLE (OVERLAY) --- */
.mobile-menu-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
  background-color: rgba(var(--rgb-background-body-dark), 0.85);
  -webkit-backdrop-filter: blur(12px) saturate(110%);
  backdrop-filter: blur(12px) saturate(110%);
  z-index: 1010;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding-top: calc(60px + 1rem); /* altura nav (ajustada a 60px) + padding nav vertical total (0.5rem*2) */
  opacity: 0; visibility: hidden; transform: translateY(-20px);
  transition: opacity 0.35s ease, visibility 0s linear 0.35s, transform 0.35s ease;
}
.mobile-menu-overlay.is-open { /* ... (sin cambios) ... */
  opacity: 1; visibility: visible; transform: translateY(0);
  transition: opacity 0.35s ease, visibility 0s linear 0s, transform 0.35s ease;
}
ul.mobile-nav-links { /* ... (sin cambios) ... */
  list-style: none; padding: 0; margin: 0; text-align: center;
}
ul.mobile-nav-links li a { /* ... (sin cambios) ... */
  display: block; padding: 0.9rem 0; color: var(--color-text-light); text-decoration: none;
  font-family: 'Montserrat', sans-serif; font-size: 1.6rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px;
  transition: color 0.3s ease, transform 0.2s ease; position: relative;
}
ul.mobile-nav-links li a::after { /* ... (sin cambios) ... */
  content: '›'; position: absolute; top: 50%; transform: translateY(-50%); right: -15px;
  opacity: 0; transition: opacity 0.3s ease, right 0.3s ease;
  color: var(--color-primary-red); font-size: 1.5em; line-height: 1;
}
ul.mobile-nav-links li a:hover,
ul.mobile-nav-links li a:focus,
ul.mobile-nav-links li a.router-link-active,
ul.mobile-nav-links li a.router-link-exact-active { /* ... (sin cambios) ... */
  color: var(--color-primary-red);
}
ul.mobile-nav-links li a:hover::after,
ul.mobile-nav-links li a:focus::after,
ul.mobile-nav-links li a.router-link-active::after,
ul.mobile-nav-links li a.router-link-exact-active::after { /* ... (sin cambios) ... */
  opacity: 1; right: -25px;
}
.nav-button-cta-mobile { /* ... (sin cambios) ... */
  margin-top: 1rem; padding: 0.7em 1.5em !important; border: 1px solid var(--color-primary-red);
  border-radius: 25px; display: inline-block; width: auto;
}
.nav-button-cta-mobile i.fas { margin-right: 0.5em; }
.nav-button-cta-mobile:hover,
.nav-button-cta-mobile.router-link-active,
.nav-button-cta-mobile.router-link-exact-active { /* ... (sin cambios) ... */
    background-color: var(--color-primary-red);
    color: var(--color-text-light) !important;
    border-color: var(--color-primary-red);
}
.nav-button-cta-mobile:hover::after,
.nav-button-cta-mobile.router-link-active::after,
.nav-button-cta-mobile.router-link-exact-active::after { /* ... (sin cambios) ... */
    opacity: 0;
}


/* --- MEDIA QUERY PARA CAMBIAR ENTRE NAV DE ESCRITORIO Y HAMBURGUESA --- */
@media (min-width: 901px) { /* ESTILOS PARA ESCRITORIO (más ancho que 900px) */
    .hamburger-menu {
        display: none !important; /* Ocultar hamburguesa */
    }
    /* .nav-left-spacer { display: block; } No es necesario si el logo usa margin-right: auto */
    ul.desktop-nav-links {
        display: flex !important; /* Mostrar links de escritorio */
    }
    .desktop-cta-button {
        display: flex !important; /* Mostrar botón CTA de escritorio */
    }
    #logo-nav-link-main { /* Asegurar que el logo esté bien posicionado en escritorio */
        position: static; /* Quitar posicionamiento absoluto del logo en escritorio */
        transform: none;
        margin-right: auto; /* Empuja todo lo demás a la derecha */
    }
    nav#main-nav .nav-container {
        justify-content: flex-start; /* Alinea todo a la izquierda, el margin:auto del logo lo empuja */
    }
}

@media (max-width: 900px) { /* ESTILOS PARA MÓVIL/TABLET (hasta 900px) */
  ul.desktop-nav-links {
    display: none !important; /* Ocultar nav de escritorio */
  }
  .desktop-cta-button {
    display: none !important; /* Ocultar CTA de escritorio */
  }
  /* .nav-left-spacer { display: none !important; } No lo usamos ahora */

  .hamburger-menu {
    display: flex !important; /* Mostrar hamburguesa */
    margin-left: auto; /* Empuja la hamburguesa a la derecha */
  }
  #logo-nav-link-main { /* Logo en móvil */
    position: static; /* Quitar posicionamiento absoluto */
    transform: none;
    margin-right: auto; /* Empuja la hamburguesa a la derecha */
  }
  #logo-nav-img {
      width: 40px;
      height: 40px; 
      object-fit: contain; 
  }
  nav#main-nav .nav-container {
    justify-content: space-between;
  }
}

/* Footer Icons */
footer .fab, footer .fas {
  margin-right: 0.3em;
  font-size: 1.1em;
}
footer {
    background-color: var(--color-background-surface-dark);
    color: var(--color-text-medium); 
    text-align: center;
    padding: 3rem 0;
    border-top: 3px solid var(--color-primary-red);
}
footer p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

footer a { /* Estilo para los enlaces dentro del footer */
    color: var(--color-accent-light-blue); 
    transition: color 0.3s ease;
}

footer a:hover {
    color: var(--color-primary-red);
}
</style>
