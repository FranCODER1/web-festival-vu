<template>
  <main class="artistas-page-content">
    <div class="container">
      <section id="lineup">
        <h1>Artistas del Festival</h1>
        
        <div v-if="artistas && artistas.length > 0" class="artist-list-grid">
          <ArtistCard
            v-for="artista in artistas"
            :key="artista.id"
            :artist="artista"
          />
        </div>
        <div v-else class="loading-placeholder">
          <p>Cargando artistas o no hay artistas para mostrar en este momento.</p>
        </div>
      </section>

      <section id="generos" v-if="generosMusicales && generosMusicales.length > 0">
        <h2>Géneros Musicales Presentes</h2>
        <ul>
          <li v-for="genero in generosMusicales" :key="genero">{{ genero }}</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue';

export default {
  name: 'ArtistasView',
  components: {
    ArtistCard
  },
  data() {
    return {
      artistas: [
        {
          id: 1,
          name: 'Los Manseros Santiagueños',
          description: 'Una verdadera institución del folclore argentino. Con décadas de trayectoria, son embajadores de la chacarera, la zamba y el gato santiagueño. Sus armonías vocales son inconfundibles.',
          imageSrc: 'img/manseros.jpg',
          imageAlt: 'Foto de Los Manseros Santiagueños',
          audioSrc: 'audio/Eterno Amor.mp3'
        },
        {
          id: 2,
          name: 'Peteco Carabajal',
          description: 'Referente indiscutido, multiinstrumentista (violín, guitarra, bombo), compositor prolífico y cantante. Miembro de la legendaria familia Carabajal, ha sabido innovar sin perder la raíz. Su energía en el escenario es contagiosa.',
          imageSrc: 'img/peteco.jpg',
          imageAlt: 'Foto de Peteco Carabajal',
          audioSrc: 'audio/Puente Carretero- Los Carabajal (Peteco Carabajal).mp3'
        },
        {
          id: 3,
          name: 'Horacio Banegas',
          description: 'Compositor, cantante y guitarrista de enorme talento y profundidad. Su obra es extensa y muy respetada, con un fuerte anclaje en la poesía y la música de Santiago. Voz potente y gran presencia escénica.',
          imageSrc: 'img/horacio_banegas+.jpg',
          imageAlt: 'Foto de Horacio Banegas',
          audioSrc: 'audio/Hermano Kakuy (original).mp3'
        },
        {
          id: 4,
          name: 'Raly Barrionuevo',
          description: 'Uno de los artistas más populares de la nueva generación del folclore. Con un estilo propio que fusiona lo tradicional con sonidos más contemporáneos y letras comprometidas. Gran convocatoria entre el público joven.',
          imageSrc: 'img/Raly.jpg',
          imageAlt: 'Foto de Raly Barrionuevo',
          audioSrc: 'audio/Raly Barrionuevo - Zamba y Acuarela.mp3'
        },
        {
          id: 5,
          name: 'Dúo Coplanacu',
          description: 'Un dúo emblemático que ha llevado la música santiagueña por todo el país y más allá. Su fuerza interpretativa y la autenticidad de su propuesta los hacen muy queridos. "La Copla" es su sello.',
          imageSrc: 'img/duo-coplanacu.jpg',
          imageAlt: 'Foto del Dúo Coplanacu',
          audioSrc: 'audio/La Parecida- Duo Coplanacu.mp3'
        },
        {
          id: 6,
          name: 'Los Arcanos del Desierto',
          description: 'Innovadora propuesta que fusiona el folclore con sonidos contemporáneos y electrónicos, manteniendo la esencia de la música de Santiago del Estero.',
          imageSrc: 'img/arcanos.jpeg',
          imageAlt: 'Foto de Los Arcanos del Desierto',
          audioSrc: '../audio/Los Arcanos del Desierto - Fusión Santiagueña.mp3'
        }
      ],
      generosMusicales: [
        'Chacarera',
        'Zamba',
        'Gato',
        'Escondido',
        'Chamamé'
      ]
    };
  }
}
</script>

<style scoped>
.artistas-page-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

#lineup h1 {
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--color-primary-red);
  font-size: 2.5rem;
}

.artist-list-grid { /* Este es para la página de Artistas */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Un poco más anchas que en home */
  gap: 2.5rem; /* Un poco más de espacio */
  margin-bottom: 3rem;
}

.loading-placeholder {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-medium);
}

#generos {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--color-background-surface-dark);
  border-radius: 8px;
}

#generos h2 {
  text-align: center;
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
}

#generos ul {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  justify-content: center;
}

#generos ul li {
  background-color: var(--color-secondary-blue);
  color: var(--color-text-light);
  padding: 0.4em 0.8em;
  border-radius: 15px;
  font-size: 0.9rem;
}

/* No se necesitan media queries específicas para artist-list-grid aquí
   si auto-fit ya maneja la responsividad. */
@media (max-width: 600px) {
  #lineup h1 {
    font-size: 2rem;
  }
  /* .artist-list-grid {
    grid-template-columns: 1fr; // auto-fit ya debería manejar esto
    gap: 1.5rem;
  } */
  #generos ul {
    justify-content: flex-start;
  }
}
</style>