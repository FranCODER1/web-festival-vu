<template>
  <article class="artist-card-component">
    <img
      v-if="artist.imageSrc"
      :src="getImageUrl(artist.imageSrc)"
      :alt="artist.imageAlt || artist.name"
      class="artist-thumbnail"
    >
    <div class="artist-info-content">
      <h3>{{ artist.name }}</h3>
      <p>{{ artist.description }}</p>
    </div>
    <div v-if="artist.audioSrc" class="artist-audio">
      <audio controls :src="getAudioUrl(artist.audioSrc)">
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArtistCard',
  props: {
    artist: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Nombre del Artista',
        description: 'Descripción no disponible.',
        imageSrc: '',
        imageAlt: '',
        audioSrc: ''
      })
    }
  },
  methods: {
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      try {
        // console.log(`ArtistCard: Intentando cargar imagen: @/assets/${imagePath}`);
        const imageModule = require(`@/assets/${imagePath}`);
        // console.log('ArtistCard: Módulo de imagen cargado:', imagePath, imageModule);
        return imageModule.default || imageModule;
      } catch (e) {
        console.warn(`ArtistCard: No se pudo cargar la imagen: @/assets/${imagePath}. Error: ${e.message}`);
        return '';
      }
      // No hay código inalcanzable aquí
    },
    getAudioUrl(audioPath) {
      if (!audioPath) return '';
      // No necesitamos la lógica de startsWith('/') si todos los audios vienen de src/assets
      try {
        console.log(`ArtistCard: Intentando cargar audio con require: @/assets/${audioPath}`);
        const audioModule = require(`@/assets/${audioPath}`);
        console.log('ArtistCard: Módulo de audio cargado:', audioPath, audioModule);
        return audioModule.default || audioModule;
      } catch (e) {
        console.warn(`ArtistCard: No se pudo cargar el audio con require: @/assets/${audioPath}. Error: ${e.message}`);
        return '';
      }
      // No hay código inalcanzable aquí (esto soluciona el error de ESLint)
    }
  }
}
</script>

<style scoped>
.artist-card-component {
  background-color: var(--color-background-surface-dark);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border-dark);
  box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.artist-card-component:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 25px rgba(var(--rgb-black), 0.3);
}

.artist-thumbnail {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  border: 3px solid var(--color-accent-light-blue);
}

.artist-info-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.artist-card-component h3 {
  color: var(--color-accent-light-blue);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.artist-card-component p {
  font-size: 0.9rem;
  color: var(--color-text-medium);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.artist-audio {
  margin-top: auto;
  padding-top: 0.5rem;
}

/* Estilos de depuración para la etiqueta <audio> */
.artist-card-component audio {
  width: 100%;
  max-width: 250px;
  /* filter: invert(90%) hue-rotate(180deg) contrast(0.8) brightness(1.2); */ /* Comentado para la prueba */
  border-radius: 5px;
  background-color: #555; /* Fondo visible para la prueba */
  border: 1px solid yellow; /* Borde visible para la prueba */
  min-height: 40px; /* Altura mínima para asegurar que no sea cero */
  display: block !important; /* Forzar display block, por si acaso */
  visibility: visible !important; /* Forzar visibilidad */
  opacity: 1 !important; /* Forzar opacidad */
}
</style>