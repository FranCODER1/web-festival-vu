<template>
  <main class="artistas-page-content">
    <div class="container">
      <section id="lineup">
        <h1>Artistas del Festival</h1>
        
        <div v-if="artistas && artistas.length > 0" class="artist-list-grid">
          <article 
            v-for="artista in artistas" 
            :key="artista.id" 
            class="artist-card-inline"
          >
            <img
              v-if="artista.imageSrc"
              :src="getImageUrl(artista.imageSrc)"
              :alt="artista.imageAlt || artista.name"
              class="artist-thumbnail-inline"
            >
            <div class="artist-info-content-inline">
              <h3>{{ artista.name }}</h3>
              <p>{{ artista.description }}</p>
            </div>
            <div v-if="artista.youtubeLink" class="artist-youtube-link">
              <a :href="artista.youtubeLink" target="_blank" rel="noopener noreferrer" class="btn btn-youtube">
                <i class="fab fa-youtube"></i> Escuchar en YouTube
              </a>
            </div>
          </article>
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

export default {
  name: 'ArtistasView',

  data() {
    return {
      artistas: [
        {
          id: 1,
          name: 'Los Manseros Santiagueños',
          description: 'Una verdadera institución del folclore argentino. Con décadas de trayectoria, son embajadores de la chacarera, la zamba y el gato santiagueño. Sus armonías vocales son inconfundibles.',
          imageSrc: 'img/manseros.jpg',
          imageAlt: 'Foto de Los Manseros Santiagueños',
          youtubeLink: 'https://www.youtube.com/watch?v=nyzz7aFdGwI' 
        },
        {
          id: 2,
          name: 'Peteco Carabajal',
          description: 'Referente indiscutido, multiinstrumentista (violín, guitarra, bombo), compositor prolífico y cantante. Miembro de la legendaria familia Carabajal, ha sabido innovar sin perder la raíz. Su energía en el escenario es contagiosa.',
          imageSrc: 'img/peteco.jpg',
          imageAlt: 'Foto de Peteco Carabajal',
          youtubeLink: 'https://www.youtube.com/watch?v=_OhwHix6Vgc' 
        },
        {
          id: 3,
          name: 'Horacio Banegas',
          description: 'Compositor, cantante y guitarrista de enorme talento y profundidad. Su obra es extensa y muy respetada, con un fuerte anclaje en la poesía y la música de Santiago. Voz potente y gran presencia escénica.',
          imageSrc: 'img/horacio_banegas+.jpg', 
          imageAlt: 'Foto de Horacio Banegas',
          youtubeLink: 'https://www.youtube.com/watch?v=TTGJfSDTDXo' 
        },
        {
          id: 4,
          name: 'Raly Barrionuevo',
          description: 'Uno de los artistas más populares de la nueva generación del folclore. Con un estilo propio que fusiona lo tradicional con sonidos más contemporáneos y letras comprometidas. Gran convocatoria entre el público joven.',
          imageSrc: 'img/Raly.jpg', 
          imageAlt: 'Foto de Raly Barrionuevo',
          youtubeLink: 'https://www.youtube.com/watch?v=2cEWcfMXfdI' 
        },
        {
          id: 5,
          name: 'Dúo Coplanacu',
          description: 'Un dúo emblemático que ha llevado la música santiagueña por todo el país y más allá. Su fuerza interpretativa y la autenticidad de su propuesta los hacen muy queridos. "La Copla" es su sello.',
          imageSrc: 'img/duo-coplanacu.jpg',
          imageAlt: 'Foto del Dúo Coplanacu',
          youtubeLink: 'https://www.youtube.com/watch?v=FwGzy7_20u0' 
        },
        {
          id: 6,
          name: 'Los Arcanos del Desierto',
          description: 'Innovadora propuesta que fusiona el folclore con sonidos contemporáneos y electrónicos, manteniendo la esencia de la música de Santiago del Estero.',
          imageSrc: 'img/arcanos.jpeg', 
          imageAlt: 'Foto de Los Arcanos del Desierto',
          youtubeLink: 'https://www.youtube.com/watch?v=5YvtEw2P8_c'
        },
        {
          id: 7,
          name: 'La Brasita de mi Chala',
          description: 'Grupo santiagueño de gran trayectoria, referente de la chacarera festiva y bailable.', 
          imageSrc: 'img/La Brasita.png', 
          imageAlt: 'Foto de La Brasita de mi Chala',
          youtubeLink: 'https://www.youtube.com/watch?v=u7y8kLL1BA0' 
        },
        {
          id: 8,
          name: 'Don Argañaraz',
          description: 'Cantautor y vidalero, una voz auténtica que representa las profundas raíces de Santiago del Estero.', 
          imageSrc: 'img/Don argañaraz.png',
          imageAlt: 'Foto de Don Argañaraz',
          youtubeLink: 'https://www.youtube.com/watch?v=Iy2CPPjpcqc' 
        },
        {
          id: 9,
          name: 'Vislumbre del Esteko',
          description: 'Energía joven y renovación del folklore, con un sonido que invita al baile y la celebración.', 
          imageSrc: 'img/Vislumbre.png', 
          imageAlt: 'Foto de Vislumbre del Esteko',
          youtubeLink: 'https://www.youtube.com/watch?v=EE_3aKeEg14' 
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
  },
  methods: {
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      try {
        const imageModule = require(`@/assets/${imagePath}`);
        return imageModule.default || imageModule;
      } catch (e) {
        console.warn(`ArtistasView: No se pudo cargar la imagen: @/assets/${imagePath}. Error: ${e.message}`);
        return '';
      }
    }
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

.artist-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.loading-placeholder {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-medium);
}

.artist-card-inline {
  background-color: var(--color-background-surface-dark);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border-dark);
  box-shadow: 0 5px 15px rgba(0,0,0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ajustado para empujar el botón hacia abajo */
  align-items: center;
  height: 100%;
}
.artist-card-inline:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0,0,0, 0.3);
}
.artist-thumbnail-inline {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  border: 3px solid var(--color-accent-light-blue);
}
.artist-info-content-inline {
  /* flex-grow: 1; Ya no es necesario si justify-content es space-between en la card */
  margin-bottom: 1rem; /* Espacio entre descripción y botón de YouTube */
}
.artist-card-inline h3 {
  color: var(--color-accent-light-blue);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}
.artist-card-inline p {
  font-size: 0.9rem;
  color: var(--color-text-medium);
  /* margin-bottom: 1rem; Ajustado por el margin-bottom de artist-info-content-inline */
  line-height: 1.5;
}

.artist-youtube-link {
  margin-top: auto; /* Empuja el botón de YouTube hacia abajo si hay espacio */
  padding-top: 0.5rem; 
}

.btn-youtube { /* Estilo para el botón de YouTube */
  /* Hereda estilos de .btn de tu estilos.css global */
  /* Puedes añadir o sobrescribir estilos aquí si es necesario */
  background-color: #FF0000; /* Color de YouTube */
  color: white !important; /* Asegurar texto blanco */
  border-color: #FF0000; /* Opcional: si .btn tiene borde */
  display: inline-flex; /* Para alinear icono y texto */
  align-items: center;
  justify-content: center;
  padding: 0.6em 1.2em; /* Ajusta padding */
}
.btn-youtube:hover {
  background-color: #cc0000 !important; /* YouTube más oscuro en hover */
  border-color: #cc0000 !important;
}
.btn-youtube .fab.fa-youtube { /* O .fas fa-play si prefieres un icono de play */
  margin-right: 0.5em;
}


#generos { /* ... (sin cambios) ... */ }
#generos h2 { /* ... (sin cambios) ... */ }
#generos ul { /* ... (sin cambios) ... */ }
#generos ul li { /* ... (sin cambios) ... */ }

@media (max-width: 600px) { /* ... (sin cambios) ... */ }
</style>