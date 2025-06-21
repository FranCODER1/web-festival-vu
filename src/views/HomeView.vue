<template>
  <main class="home-page-content">
    <section id="hero">
      <div class="hero-panel">
        <div class="hero-content">
          <h2>¡Bienvenidos a<br>Sonidos de la Ciudad!</h2>
          <p>El mejor festival al estilo santiagueño</p>
          <div class="hero-cta-buttons">
            <a href="#video-promo" class="btn btn-secondary">Ver trailer</a>
            <router-link to="/entradas" class="btn btn-secondary">Comprar entradas</router-link>
          </div>
        </div>
      </div>
    </section>

    <section id="destacados">
      <div class="container">
        <h2>Artistas Principales</h2>
        <div class="destacados-grid">
          <article 
            v-for="artista in artistasDestacados" 
            :key="artista.id" 
            class="destacados-artist-card" 
          >
            <img
              v-if="artista.imageSrc"
              :src="getImageUrl(artista.imageSrc)"
              :alt="artista.imageAlt || artista.name"
              class="destacados-artist-thumbnail"
            >
            <div class="destacados-artist-info">
              <h3>{{ artista.name }}</h3>
              <p>{{ artista.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="video-promo">
      <div class="container">
        <h2>Tráiler del Festival</h2>
        <div class="video-responsive-wrapper">
          <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/7xblk-rASDY" 
              title="Video Promocional del Festival"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// Ya no importamos ArtistCard.vue

export default {
  name: 'HomeView',
  // components: {}, // Ya no se registra ArtistCard
  data() {
    return {
      artistasDestacados: [
        {
          id: 1,
          name: 'Los Manseros Santiagueños',
          description: 'Leyendas vivas con la chacarera más pura y las zambas que enamoran.',
          imageSrc: 'img/manseros.jpg', 
          imageAlt: 'Los Manseros Santiagueños',
        },
        {
          id: 2,
          name: 'Peteco Carabajal',
          description: 'Magia en el violín, potencia en el bombo y canciones que son himnos.',
          imageSrc: 'img/peteco.jpg',
          imageAlt: 'Peteco Carabajal',
        },
        {
          id: 3,
          name: 'Horacio Banegas',
          description: 'La fuerza de la tierra en su voz y la poesía en sus cuerdas.',
          imageSrc: 'img/horacio_banegas+.jpg',
          imageAlt: 'Horacio Banegas',
        },
        {
          id: 4,
          name: 'Raly Barrionuevo',
          description: 'Folklore con sonidos contemporáneos y letras comprometidas.',
          imageSrc: 'img/Raly.jpg',
          imageAlt: 'Raly Barrionuevo',
        },
        {
          id: 5,
          name: 'Dúo Coplanacu',
          description: 'Dúo emblemático que ha llevado la música santiagueña por todo el país.',
          imageSrc: 'img/duo-coplanacu.jpg',
          imageAlt: 'Dúo Coplanacu',
        },
        {
          id: 6,
          name: 'Los Arcanos del Desierto',
          description: 'Innovadora propuesta que fusiona el folclore con sonidos contemporáneos y electrónicos.',
          imageSrc: 'img/arcanos.jpeg',
          imageAlt: 'Los Arcanos del Desierto',
        }
      ]
    };
  },
  methods: { // Método ahora definido directamente en esta vista
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      try {
        // console.log(`HomeView: Intentando cargar imagen: @/assets/${imagePath}`);
        const imageModule = require(`@/assets/${imagePath}`);
        // console.log('HomeView: Módulo de imagen cargado:', imagePath, imageModule);
        return imageModule.default || imageModule;
      } catch (e) {
        console.warn(`HomeView: No se pudo cargar la imagen: @/assets/${imagePath}. Error: ${e.message}`);
        return '';
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para HomeView.vue */

.home-page-content {
  /* Si necesitas algún padding general para el main de la home */
}

/* Estilos para el hero panel (pueden estar aquí o en estilos.css global si son idénticos) */
/* Si ya están en estilos.css, no necesitas repetirlos aquí. */
/* Si los pones aquí, serían específicos para el hero de HomeView */

/* Estilos para las tarjetas de artista en la sección destacados */
.destacados-artist-card {
  background-color: var(--color-background-surface-dark);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border-dark);
  box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* Para que todas las tarjetas en la grid tengan la misma altura */
}
.destacados-artist-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 25px rgba(var(--rgb-black), 0.3);
}
.destacados-artist-thumbnail {
  width: 150px; /* O el tamaño que prefieras para destacados */
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  border: 3px solid var(--color-accent-light-blue);
}
.destacados-artist-info {
  flex-grow: 1; /* Ocupa el espacio restante */
}
.destacados-artist-info h3 {
  color: var(--color-accent-light-blue);
  font-size: 1.4rem; /* Coincide con ArtistCard */
  margin-bottom: 0.5rem;
  line-height: 1.3;
}
.destacados-artist-info p {
  font-size: 0.9rem;
  color: var(--color-text-medium);
  margin-bottom: 0; /* Sin margen inferior si no hay audio */
  line-height: 1.5;
}

/* Los estilos para #hero, .hero-panel, #destacados, .destacados-grid, #video-promo, .video-responsive-wrapper */
/* deberían venir de tu estilos.css global si quieres que sean consistentes o tener una base. */
/* Si quieres que sean únicos para HomeView, defínelos aquí. */

/* Ejemplo si .destacados-grid necesita estilos específicos aquí y no del global: */
/*
#destacados {
    background-color: var(--color-background-surface-dark); 
    padding-top: 4rem;
    padding-bottom: 4rem;
}
#destacados h2 {
    text-align: center;
    margin-bottom: 2.5rem;
    color: var(--color-primary-red);
}
.destacados-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 2rem;
}
*/
</style>