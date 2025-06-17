// src/views/UbicacionView.vue
<template>
  <main class="ubicacion-page-content">
    <div class="container">
      <section id="lugar-del-evento">
        <h1>Ubicación del Evento</h1>
        <p>Encuéntranos fácilmente y planifica tu llegada a Sonidos de la Ciudad.</p>
      </section>

      <section id="direccion">
        <h2>Dirección y Cómo Llegar</h2>
        <p>El festival "Sonidos de la Ciudad" se llevará a cabo en:</p>
        <address>
          <strong>Club Atletico Union Santiago</strong><br>
          Av. Rivadavia 1049<br>
          Ciudad Santiago del Estero, Santiago del Estero<br>
          Argentina
        </address>

        <h3>Transporte Público:</h3>
        <ul>
          <li>Colectivo: Líneas 17, 21 (parada "La banda")</li>
          <li>Colectivo: Línea 120 (caminar 3 cuadras desde Forum)</li>
        </ul>
        <h3>En Auto:</h3>
        <p>Habrá estacionamiento limitado en las cercanías. Se recomienda el uso de transporte público o servicios de ride-sharing.</p>
      </section>

      <section id="mapa">
        <h2>Mapa Interactivo - Ubicación del Festival</h2>
        <div class="video-responsive-wrapper"> {/* Usaremos la misma clase que para videos responsivos */}
          <iframe
            :src="mapaSrc"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación: Rivadavia 1049, Santiago del Estero">
          </iframe>
        </div>
      </section>

      <section id="puntos-venta"> 
        <h2>Puntos de Venta Físicos de Entradas</h2>
        <p v-if="puntosDeVenta && puntosDeVenta.length > 0">
          Adquiere tus entradas en los siguientes puntos autorizados:
        </p>
        <ul v-if="puntosDeVenta && puntosDeVenta.length > 0" class="lista-puntos-venta">
          <li v-for="punto in puntosDeVenta" :key="punto.nombre">
            <strong>{{ punto.nombre }}:</strong> {{ punto.direccion }} ({{ punto.horarios }})
          </li>
        </ul>
        <p v-else>
          Próximamente anunciaremos los puntos de venta físicos autorizados. ¡Mantente atento!
        </p>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'UbicacionView',
  data() {
    return {
      // URL del iframe de Google Maps. Reemplaza con tu mapa embebido.
      mapaSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.482744448968!2d-64.26292682383606!3d-27.797135676193816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b521857f5906d%3A0xbef5acd1ba9808d9!2sRivadavia%201049%2C%20G4200%20Santiago%20del%20Estero!5e0!3m2!1ses!2sar!4v1715887214196!5m2!1ses!2sar',
      puntosDeVenta: [
        // Ejemplo de datos para puntos de venta, puedes añadir más o dejarlos vacíos
        // { nombre: 'Disquería El Pibe', direccion: 'Peatonal Tucumán 255', horarios: 'Lun-Sáb 9-13hs y 17-21hs' },
        // { nombre: 'Oficina Festival Centro', direccion: 'Plaza Libertad Local 10', horarios: 'Mar y Jue 10-18hs' }
      ]
    };
  }
}
</script>

<style scoped>
.ubicacion-page-content {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

#lugar-del-evento h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-primary-red);
  font-size: 2.5rem;
}
#lugar-del-evento > .container > p { /* Párrafo introductorio */
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

#direccion, #mapa, #puntos-venta {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: var(--color-background-surface-dark);
  border-radius: 8px;
  border: 1px solid var(--color-border-dark);
}

#direccion h2, #mapa h2, #puntos-venta h2 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-dark);
  padding-bottom: 0.5rem;
}

address {
  font-style: normal;
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 1em;
  border-left: 3px solid var(--color-primary-red);
}

#direccion h3 {
  color: var(--color-text-light); /* Un color más claro para subtítulos */
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

#direccion ul {
  list-style: disc;
  padding-left: 20px;
  margin-left: 10px;
}
#direccion ul li {
  margin-bottom: 0.3rem;
}

.video-responsive-wrapper { /* Hereda estilos de tu CSS global */
  /* No se necesita estilo adicional aquí si ya está definido globalmente */
}

.lista-puntos-venta {
    list-style: none;
    padding-left: 0;
}
.lista-puntos-venta li {
    background-color: rgba(var(--rgb-secondary-blue), 0.3);
    padding: 0.8em 1em;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    border-left: 3px solid var(--color-accent-light-blue);
}
.lista-puntos-venta li strong {
    color: var(--color-text-light);
}


@media (max-width: 768px) {
  #lugar-del-evento h1 {
    font-size: 2rem;
  }
   #direccion h2, #mapa h2, #puntos-venta h2 {
    font-size: 1.5rem; /* Ajustar tamaño de H2 en secciones */
  }
}
</style>