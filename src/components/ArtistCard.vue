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
        return require(`@/assets/${imagePath}`);
      } catch (e) {
        console.warn(`No se pudo cargar la imagen: @/assets/${imagePath}. Error: ${e.message}`);
        return '';
      }
    },
    getAudioUrl(audioPath) {
      if (!audioPath) return '';
      try {
        return require(`@/assets/${audioPath}`);
      } catch (e) {
        console.warn(`No se pudo cargar el audio: @/assets/${audioPath}. Error: ${e.message}`);
        return '';
      }
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
  justify-content: flex-start; /* Alinea contenido al inicio */
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
  border-radius: 50%; /* Imagen redonda */
  object-fit: cover;
  margin: 0 auto 1rem auto; /* Centrada y con espacio abajo */
  border: 3px solid var(--color-accent-light-blue);
}

.artist-info-content {
  flex-grow: 1; /* Ocupa espacio para empujar el audio hacia abajo si existe */
  display: flex;
  flex-direction: column;
  /* justify-content: center;  Podrías quitar esto si prefieres que el texto no se centre verticalmente */
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
  margin-top: auto; /* Empuja el audio hacia abajo */
  padding-top: 0.5rem;
}

.artist-card-component audio {
  width: 100%;
  max-width: 250px;
  filter: invert(90%) hue-rotate(180deg) contrast(0.8) brightness(1.2);
  border-radius: 5px;
}
</style>