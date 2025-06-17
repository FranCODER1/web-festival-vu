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
      default: () => ({ // Proporciona un objeto por defecto con todas las claves esperadas
        name: 'Nombre del Artista',
        description: 'Descripción no disponible.',
        imageSrc: '', // Dejar vacío para que v-if lo oculte si no se proporciona
        imageAlt: '',
        audioSrc: ''  // Dejar vacío para que v-if lo oculte si no se proporciona
      })
    }
  },
  methods: {
    // Método para resolver la ruta de la imagen desde src/assets
    getImageUrl(imagePath) {
      if (!imagePath) return ''; // Si no hay imagePath, retorna vacío
      try {
        // Para que Webpack/Vite procesen correctamente las imágenes de `src/assets`
        // cuando la ruta viene de una prop.
        // La ruta 'imagePath' DEBE ser relativa a 'src/assets/', 
        // por ejemplo: 'img/nombre-imagen.jpg'
        return require(`@/assets/${imagePath}`);
      } catch (e) {
        console.warn(`No se pudo cargar la imagen: @/assets/${imagePath}. Error: ${e.message}`);
        // Considera retornar una URL a una imagen placeholder en caso de error
        return ''; // Retorna una cadena vacía o una imagen placeholder por defecto
      }
    },
    // Método para resolver la ruta del audio desde src/assets
    getAudioUrl(audioPath) {
      if (!audioPath) return ''; // Si no hay audioPath, retorna vacío
      try {
        // Similar a getImageUrl para los archivos de audio
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
/* Estilos para .artist-card-component.
   Estos son los estilos que antes estaban en tu CSS global para
   #destacados article o .artist-card (de artistas.html original).
*/
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
  justify-content: space-between; /* Intenta distribuir el espacio */
  height: 100%; /* Para que todas las tarjetas en una grid tengan la misma altura */
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
  margin: 0 auto 1rem auto; /* Centra la imagen y da espacio abajo */
  border: 3px solid var(--color-accent-light-blue);
}

.artist-info-content {
  flex-grow: 1; /* Permite que esta sección ocupe el espacio disponible */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra el texto verticalmente si hay espacio extra */
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
  margin-bottom: 1rem; /* Margen para separar del audio si existe, o del borde inferior */
  line-height: 1.5;
  /* flex-grow: 1; Quitamos flex-grow del párrafo para mejor control con .artist-info-content */
}

.artist-audio {
  margin-top: auto; /* Empuja el reproductor de audio hacia abajo */
  padding-top: 0.5rem; /* Pequeño espacio si hay párrafo antes */
}

.artist-card-component audio {
  width: 100%;
  max-width: 250px; /* Limitar ancho del reproductor de audio */
  filter: invert(90%) hue-rotate(180deg) contrast(0.8) brightness(1.2);
  border-radius: 5px;
}
</style>