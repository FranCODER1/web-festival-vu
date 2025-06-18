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
          <!-- MODIFICACIÓN: Usando ArtistCard aquí -->
          <ArtistCard
            v-for="artista in artistasDestacados"
            :key="artista.id"
            :artist="artista"
          />
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
// 1. Importar el componente ArtistCard
import ArtistCard from '@/components/ArtistCard.vue';

export default {
  name: 'HomeView',
  // 2. Registrar el componente
  components: {
    ArtistCard
  },
  data() {
    return {
      // 3. Definir los datos para los artistas destacados
      // Las rutas de imageSrc son relativas a src/assets/
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
  }
}
</script>

<style scoped>
/* Estilos específicos para HomeView.vue si son necesarios. */
/* La clase .destacados-grid ya debería estar estilizada por tu CSS global (estilos.css). */
/* Si no, y quieres que sea igual al de artistas-list-grid, copia esos estilos aquí o al global */
</style>