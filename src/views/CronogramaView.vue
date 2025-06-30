<template>
  <main class="cronograma-page-content">
    <div class="container">
      <section id="horarios-festival">
        <h1>Cronograma del Festival</h1>
        <p>Descubre cuándo y dónde se presentarán tus artistas favoritos. ¡No te pierdas ni un momento!</p>

        <div v-if="diasDelFestival && diasDelFestival.length > 0">
          <div v-for="dia in diasDelFestival" :key="dia.fechaISO" class="dia-cronograma">
            <h2>{{ dia.nombreDia }} - {{ formatearFecha(dia.fechaISO) }}</h2>
            <div class="table-responsive-wrapper">
              <table class="tabla-cronograma">
                <caption>Horarios para el {{ formatearFecha(dia.fechaISO) }}</caption>
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Artista</th>
                    <th>Escenario</th>
                    <th>Descripción Breve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="dia.eventos.length === 0">
                    <td colspan="4" class="no-eventos">Próximamente más detalles para este día.</td>
                  </tr>
                  <tr v-for="evento in dia.eventos" :key="evento.id">
                    <td data-label="Hora">{{ evento.hora }}</td>
                    <td data-label="Artista">
                      <router-link v-if="evento.artistaSlug" :to="`/artistas/${evento.artistaSlug}`">
                        {{ evento.artista }}
                      </router-link>
                      <span v-else>{{ evento.artista }}</span>
                    </td>
                    <td data-label="Escenario">{{ evento.escenario }}</td>
                    <td data-label="Descripción Breve">{{ evento.descripcion || 'Presentación especial' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-else class="loading-placeholder">
          <p>El cronograma completo se anunciará próximamente.</p>
        </div>

      </section>
    </div>
  </main>
</template>

<script>
// Importamos los datos centralizados del cronograma
import { diasDelFestival } from '@/data/cronogramaData.js';

export default {
  name: 'CronogramaView',
  data() {
    return {
      // Asignamos los datos importados a una propiedad del componente
      diasDelFestival: diasDelFestival
    };
  },
  methods: {
    formatearFecha(fechaISO) {
      if (!fechaISO) return '';
      // Opciones para formatear la fecha a un formato legible en español
      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
      // El timeZone: 'UTC' es importante para evitar que el navegador ajuste la fecha al día anterior/posterior
      // basado en la zona horaria del usuario.
      
      // Creamos una nueva fecha y la formateamos
      const fecha = new Date(fechaISO);
      let fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
      // Capitalizamos la primera letra del resultado (ej. "jueves" -> "Jueves")
      return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    }
  },
  // mounted() {
  //   // En un futuro, si los datos vinieran de una API, la llamada iría aquí:
  //   // fetch('/api/cronograma')
  //   //  .then(res => res.json())
  //   //  .then(data => this.diasDelFestival = data)
  //   //  .catch(err => console.error("Error cargando cronograma:", err));
  // }
}
</script>

<style scoped>
.cronograma-page-content {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

#horarios-festival h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-primary-red);
  font-size: 2.5rem;
}

#horarios-festival > p { /* El párrafo introductorio */
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.dia-cronograma {
  margin-bottom: 3rem;
  background-color: var(--color-background-surface-dark);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-dark);
}
.dia-cronograma:last-child {
  margin-bottom: 0;
}

.dia-cronograma h2 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-primary-red);
  padding-bottom: 0.75rem;
  font-size: 1.8rem;
}

.table-responsive-wrapper {
  overflow-x: auto; /* Permite scroll horizontal en tablas grandes en móvil */
}

.tabla-cronograma {
  /* Los estilos base de la tabla (colores, bordes) vienen de estilos.css global */
  width: 100%;
  margin-top: 1rem;
}

.tabla-cronograma th, .tabla-cronograma td {
  padding: 0.8em 1em; /* Más padding para legibilidad */
  white-space: nowrap; /* Evita que el contenido se rompa en varias líneas en desktop */
}

.tabla-cronograma td[data-label="Descripción Breve"] {
    white-space: normal; /* Permite que la descripción sí se rompa en varias líneas */
}

.tabla-cronograma td[data-label="Artista"] a {
    font-weight: bold;
    /* El color viene de la regla 'a' global, se puede sobrescribir aquí si se desea */
}

.no-eventos td {
    text-align: center;
    font-style: italic;
    color: var(--color-text-medium);
    padding: 2rem 1rem !important;
}

.loading-placeholder {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-medium);
}

@media (max-width: 768px) {
  #horarios-festival h1 {
    font-size: 2.2rem;
  }
  .dia-cronograma h2 {
    font-size: 1.6rem;
  }
  .tabla-cronograma th, .tabla-cronograma td {
      white-space: normal; /* Permite que todo el contenido se rompa en varias líneas en móvil */
  }
}
</style>