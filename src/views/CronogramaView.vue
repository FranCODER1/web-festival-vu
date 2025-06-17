// src/views/CronogramaView.vue
<template>
  <main class="cronograma-page-content">
    <div class="container">
      <section id="horarios-festival">
        <h1>Cronograma del Festival</h1>
        <p>Descubre cuándo y dónde se presentarán tus artistas favoritos. ¡No te pierdas ni un momento!</p>

        <div v-if="diasDelFestival && diasDelFestival.length > 0">
          <div v-for="dia in diasDelFestival" :key="dia.fechaISO" class="dia-cronograma">
            <h2>{{ formatearFecha(dia.fechaISO) }} - {{ dia.nombreDia }}</h2>
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
export default {
  name: 'CronogramaView',
  data() {
    return {
      // Ejemplo de estructura de datos para el cronograma
      // Las fechas deben estar en formato ISO (YYYY-MM-DD) para facilitar el orden y formateo
      diasDelFestival: [
        {
          fechaISO: '2024-08-15', // Jueves 15 de Agosto, 2024 (Año-Mes-Día)
          nombreDia: 'Día 1: Apertura Folklórica',
          eventos: [
            { id: 'd1e1', hora: '18:00 - 19:00', artista: 'Apertura Ballet Local', escenario: 'Principal Sol', descripcion: 'Danzas tradicionales de apertura.' },
            { id: 'd1e2', hora: '19:30 - 20:30', artista: 'Los Arcanos del Desierto', artistaSlug: 'los-arcanos-del-desierto', escenario: 'Principal Sol', descripcion: 'Innovación y tradición santiagueña.' },
            { id: 'd1e3', hora: '21:00 - 22:15', artista: 'Raly Barrionuevo', artistaSlug: 'raly-barrionuevo', escenario: 'Principal Sol', descripcion: 'Un viaje por sus grandes éxitos.' },
            { id: 'd1e4', hora: '22:45 - 00:00', artista: 'Peteco Carabajal', artistaSlug: 'peteco-carabajal', escenario: 'Principal Sol', descripcion: 'La leyenda del violín y el bombo.' },
          ]
        },
        {
          fechaISO: '2024-08-16', // Viernes 16 de Agosto, 2024
          nombreDia: 'Día 2: Corazón de Chacarera',
          eventos: [
            { id: 'd2e1', hora: '19:00 - 20:00', artista: 'Artistas Emergentes SDE', escenario: 'Alternativo Luna' },
            { id: 'd2e2', hora: '20:30 - 21:45', artista: 'Dúo Coplanacu', artistaSlug: 'duo-coplanacu', escenario: 'Principal Sol', descripcion: 'La copla hecha canción.' },
            { id: 'd2e3', hora: '22:15 - 23:30', artista: 'Horacio Banegas', artistaSlug: 'horacio-banegas', escenario: 'Principal Sol' },
            { id: 'd2e4', hora: '00:00 - Cierre', artista: 'Gran guitarreada popular', escenario: 'Patio Santiagueño', descripcion: 'Música y encuentro bajo las estrellas.' },
          ]
        },
        {
          fechaISO: '2024-08-17', // Sábado 17 de Agosto, 2024
          nombreDia: 'Día 3: Noche de Leyendas',
          eventos: [
            { id: 'd3e1', hora: '20:00 - 21:30', artista: 'Jóvenes Talentos del Malambo', escenario: 'Alternativo Luna', descripcion: 'Demostración de destreza y pasión.' },
            { id: 'd3e2', hora: '22:00 - 23:45', artista: 'Los Manseros Santiagueños', artistaSlug: 'los-manseros-santiaguenos', escenario: 'Principal Sol', descripcion: 'Un cierre inolvidable con los embajadores del folklore.' },
            // { id: 'd3e3', hora: '00:00 - Cierre', artista: 'DJ Set Folklore Electrónico', escenario: 'Alternativo Luna' },
          ]
        }
      ]
    };
  },
  methods: {
    formatearFecha(fechaISO) {
      const opciones = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
      // El timeZone: 'UTC' es para evitar problemas con la zona horaria del cliente al convertir la fecha
      return new Date(fechaISO).toLocaleDateString('es-ES', opciones);
    }
  },
  // mounted() {
  //   // En un futuro, podrías cargar el cronograma desde una API:
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
#horarios-festival > .container > p { /* El párrafo introductorio */
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.dia-cronograma {
  margin-bottom: 3rem;
  background-color: var(--color-background-surface-dark); /* Fondo para cada día */
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-dark);
}

.dia-cronograma h2 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-primary-red);
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
}

.table-responsive-wrapper {
  overflow-x: auto; /* Permite scroll horizontal en tablas grandes en móvil */
}

.tabla-cronograma {
  width: 100%;
  /* Los estilos base de la tabla (colores, bordes) vendrán de estilos.css global */
  /* Aquí puedes añadir estilos específicos para la tabla de cronograma si es necesario */
  margin-top: 1rem;
}

.tabla-cronograma th, .tabla-cronograma td {
  /* Ajustes específicos si son necesarios, pero los globales deberían aplicar */
  padding: 0.8em 1em; /* Un poco más de padding */
}

.tabla-cronograma td[data-label="Artista"] a {
    font-weight: bold;
    /* color: var(--color-accent-light-blue); Se hereda el color de 'a' global, puedes cambiarlo */
}
.tabla-cronograma td[data-label="Artista"] a:hover {
    /* text-decoration: underline; */
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
    font-size: 2rem;
  }
  .dia-cronograma h2 {
    font-size: 1.5rem;
  }
  /* Los estilos de tabla responsiva de estilos.css se aplicarán aquí */
}
</style>