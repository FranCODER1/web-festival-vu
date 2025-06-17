// src/views/HomeView.vue
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
          <article>
            <img src="@/assets/img/manseros.jpg" alt="Los Manseros Santiagueños" class="artist-thumbnail">
            <h3>Los Manseros Santiagueños</h3>
            <p>Leyendas vivas con la chacarera más pura y las zambas que enamoran.</p>
          </article>
          <article>
            <img src="@/assets/img/peteco.jpg" alt="Peteco Carabajal" class="artist-thumbnail">
            <h3>Peteco Carabajal</h3>
            <p>Magia en el violín, potencia en el bombo y canciones que son himnos.</p>
          </article>
          <article>
            <img src="@/assets/img/horacio_banegas+.jpg" alt="Horacio Banegas" class="artist-thumbnail">
            <h3>Horacio Banegas</h3>
            <p>La fuerza de la tierra en su voz y la poesía en sus cuerdas.</p>
          </article>
          <article>
            <img src="@/assets/img/Raly.jpg" alt="Raly Barrionuevo" class="artist-thumbnail">
            <h3>Raly Barrionuevo</h3>
            <p>Folklore con sonidos contemporáneos y letras comprometidas.</p>
          </article>
          <article>
            <img src="@/assets/img/duo-coplanacu.jpg" alt="Dúo Coplanacu" class="artist-thumbnail">
            <h3>Dúo Coplanacu</h3>
            <p>Dúo emblemático que ha llevado la música santiagueña por todo el país.</p>
          </article>
          <article>
            <img src="@/assets/img/arcanos.jpeg" alt="Los Arcanos del Desierto" class="artist-thumbnail">
            <h3>Los Arcanos del Desierto</h3>
            <p>Innovadora propuesta que fusiona el folclore con sonidos contemporáneos y electrónicos.</p>
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
export default {
  name: 'HomeView',
}
</script>

<style scoped>
/* Estilos específicos para HomeView.vue si son necesarios. */
</style>