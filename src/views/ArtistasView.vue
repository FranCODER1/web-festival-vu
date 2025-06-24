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
          youtubeLink: 'https://youtu.be/_pcIHJ2XUsA?si=Ef5Xn4nTnHnJBi4j'
        },
        {
          id: 2,
          name: 'Peteco Carabajal',
          description: 'Referente indiscutido, multiinstrumentista (violín, guitarra, bombo), compositor prolífico y cantante. Miembro de la legendaria familia Carabajal, ha sabido innovar sin perder la raíz. Su energía en el escenario es contagiosa.',
          imageSrc: 'img/peteco.jpg',
          imageAlt: 'Foto de Peteco Carabajal',
          youtubeLink: 'https://youtu.be/_OhwHix6Vgc?si=i3ldXZfN0QsbztC2'
        },
        {
          id: 3,
          name: 'Horacio Banegas',
          description: 'Compositor, cantante y guitarrista de enorme talento y profundidad. Su obra es extensa y muy respetada, con un fuerte anclaje en la poesía y la música de Santiago. Voz potente y gran presencia escénica.',
          imageSrc: 'img/horacio_banegas+.jpg',
          imageAlt: 'Foto de Horacio Banegas',
          youtubeLink: 'https://youtu.be/aDQu5MhjHdU?si=6wPsh4gPpXbfkp4I'
        },
        {
          id: 4,
          name: 'Raly Barrionuevo',
          description: 'Uno de los artistas más populares de la nueva generación del folclore. Con un estilo propio que fusiona lo tradicional con sonidos más contemporáneos y letras comprometidas. Gran convocatoria entre el público joven.',
          imageSrc: 'img/Raly.jpg',
          imageAlt: 'Foto de Raly Barrionuevo',
          youtubeLink: 'https://youtu.be/b6bTbteh4yc?si=7RDxtVQ_paaxIOyY'
        },
        {
          id: 5,
          name: 'Dúo Coplanacu',
          description: 'Un dúo emblemático que ha llevado la música santiagueña por todo el país y más allá. Su fuerza interpretativa y la autenticidad de su propuesta los hacen muy queridos. "La Copla" es su sello.',
          imageSrc: 'img/duo-coplanacu.jpg',
          imageAlt: 'Foto del Dúo Coplanacu',
          youtubeLink: 'https://youtu.be/FwGzy7_20u0?si=Ta4FlwcWmQnYyYTD'
        },
        {
          id: 6,
          name: 'Los Arcanos del Desierto',
          description: 'Innovadora propuesta que fusiona el folclore con sonidos contemporáneos y electrónicos, manteniendo la esencia de la música de Santiago del Estero.',
          imageSrc: 'img/arcanos.jpeg',
          imageAlt: 'Foto de Los Arcanos del Desierto',
          youtubeLink: 'https://youtu.be/5YvtEw2P8_c?si=z3SSjtBq_Wdr0typ'
        },
        {
          id: 7,
          name: 'La Brasita de mi Chala',
          description: 'Grupo santiagueño de gran trayectoria que enciende cada escenario con su música festiva y tradicional, invitando al baile y la celebración.',
          imageSrc: 'img/La Brasita.png',
          imageAlt: 'Foto de La Brasita de mi Chala',
          youtubeLink: 'https://youtu.be/u7y8kLL1BA0?si=R-6UsTSnBJU42mb5'
        },
        {
          id: 8,
          name: 'Don Argañaraz',
          description: 'Cantautor y vidalero, una voz auténtica que rescata las coplas y melodías más profundas del sentir santiagueño, transmitiendo la herencia cultural de la región.',
          imageSrc: 'img/Don argañaraz.png', 
          imageAlt: 'Foto de Don Argañaraz',
          youtubeLink: 'https://youtu.be/Iy2CPPjpcqc?si=Lh1M59EPaORLazRQ'
        },
        {
          id: 9,
          name: 'Vislumbre del Esteko',
          description: 'Energía joven y renovación del folklore. Este grupo trae una propuesta fresca que combina la tradición con arreglos modernos, cautivando a nuevas audiencias.',
          imageSrc: 'img/Vislumbre.png',
          imageAlt: 'Foto de Vislumbre del Esteko',
          youtubeLink: 'https://youtu.be/EE_3aKeEg14?si=NfnOj0T_qC6f-YU9'
        }
      ],
        generosMusicales: [ 'Chacarera', 'Zamba', 'Gato', 'Escondido', 'Chamamé' ]
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
  .loading-placeholder { /* ... */ }

  .artist-card-inline {
    background-color: var(--color-background-surface-dark);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--color-border-dark);
    box-shadow: 0 5px 15px rgba(0,0,0, 0.2);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    margin-bottom: 1rem;
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
    line-height: 1.5;
  }
  .artist-youtube-link {
    margin-top: auto; 
    padding-top: 0.5rem; 
  }
  .btn-youtube {
    background-color: #FF0000; 
    color: white !important; 
    border-color: #FF0000; 
    display: inline-flex; 
    align-items: center;
    justify-content: center;
    padding: 0.6em 1.2em; 
  }
  .btn-youtube:hover {
    background-color: #cc0000 !important; 
    border-color: #cc0000 !important;
  }
  .btn-youtube .fab.fa-youtube { margin-right: 0.5em; }

  #generos { /* ... */ }
  #generos h2 { /* ... */ }
  #generos ul { /* ... */ }
  #generos ul li { /* ... */ }

  /* Ajustes para Mobile S (320px) y pantallas muy pequeñas */
  @media (max-width: 360px) {
      #lineup h1 { font-size: 1.8rem; margin-bottom: 1.5rem;}
      .artist-list-grid { gap: 1.5rem; } /* Menos espacio entre tarjetas */
      .artist-card-inline { padding: 1rem; }
      .artist-thumbnail-inline { width: 100px; height: 100px; margin-bottom: 0.75rem; }
      .artist-card-inline h3 { font-size: 1.2rem; }
      .artist-card-inline p { font-size: 0.8rem; line-height: 1.4; }
      .btn-youtube { padding: 0.5em 1em; font-size: 0.8rem; }
      .btn-youtube .fab.fa-youtube { font-size: 0.9em; }
      #generos h2 { font-size: 1.5rem; }
      #generos ul li { font-size: 0.8rem; padding: 0.3em 0.6em;}
  }

  @media (max-width: 600px) {
    #lineup h1 {
      /* font-size: 2rem; // Redefinido en max-width: 360px si es necesario */
    }
    .artist-list-grid { /* Si quieres una sola columna en móvil más grande que 360px */
      /* grid-template-columns: 1fr; */
      /* gap: 1.5rem; */
    }
    #generos ul {
      justify-content: flex-start;
    }
  }
  </style>