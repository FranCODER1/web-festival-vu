<template>
  <main class="entradas-page-content">
    <div class="container">
      <section id="tipos-entradas">
        <h1>Compra tus Entradas</h1>
        <p>Asegura tu lugar en Sonidos de la Ciudad. ¡Elige la entrada que mejor se adapte a vos y preparate para vibrar!</p>

        <div v-if="tiposDeEntradas && tiposDeEntradas.length > 0" class="table-container">
          <div class="table-responsive-wrapper">
            <table class="tabla-entradas">
              <caption>Tabla de Precios y Tipos de Entrada</caption>
              <thead>
                <tr>
                  <th>Tipo de Entrada</th>
                  <th>Descripción</th>
                  <th>Precio (Preventa)</th>
                  <th>Precio (Puerta)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entrada in tiposDeEntradas" :key="entrada.id">
                  <td data-label="Tipo de Entrada">{{ entrada.tipo }}</td>
                  <td data-label="Descripción">{{ entrada.descripcion }}</td>
                  <td data-label="Precio (Preventa)">{{ entrada.precioPreventa }}</td>
                  <td data-label="Precio (Puerta)">{{ entrada.precioPuerta }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">Los precios pueden variar. Cupos limitados.</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Botón único de compra debajo de la tabla -->
          <div class="comprar-action-wrapper">
            <router-link to="/comprar-ticket" class="btn btn-primary btn-comprar-aqui">
              Comprar Aquí
            </router-link>
          </div>

        </div>
        <div v-else class="loading-placeholder">
          <p>La información sobre entradas se publicará próximamente.</p>
        </div>
      </section>

      <section id="info-adicional">
        <h2>Información Adicional</h2>
        <p>Las entradas también se pueden adquirir en puntos de venta físicos (consultar <router-link to="/ubicacion#puntos-venta">sección Ubicación</router-link> para más detalles).</p>
        <p>Menores de 10 años ingresan gratis acompañados de un adulto responsable con entrada.</p>
        <p>Para consultas sobre devoluciones o problemas con tu compra, contacta a <a href="mailto:soporte-entradas@example-ticketera.com">soporte-entradas@example-ticketera.com</a>.</p>
      </section>
    </div>
  </main>
</template>

<script>
// Importamos los datos para que la tabla sea dinámica
import { tiposDeEntradas } from '@/data/tiposDeEntradas.js';

export default {
  name: 'EntradasView',
  data() {
    return {
      tiposDeEntradas: tiposDeEntradas
    };
  }
}
</script>

<style scoped>
.entradas-page-content {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

#tipos-entradas h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-primary-red);
  font-size: 2.5rem;
}
#tipos-entradas > p { /* Párrafo introductorio */
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
}

.table-container {
  /* Contenedor para la tabla y el nuevo botón */
}

.table-responsive-wrapper {
  overflow-x: auto; 
}

.tabla-entradas {
  width: 100%;
  margin-top: 1rem;
  /* Estilos base de colores, bordes, etc., vienen de estilos.css global */
}

.tabla-entradas th, .tabla-entradas td {
  padding: 0.8em 1.2em;
  vertical-align: middle;
}

/* --- ESTILOS PARA EL BOTÓN ÚNICO DE COMPRA --- */
.comprar-action-wrapper {
  text-align: center;
  margin-top: 2.5rem; /* Espacio después de la tabla */
}

.btn-comprar-aqui {
  padding: 1em 3em; /* Hacer el botón más grande y prominente */
  font-size: 1.1rem;
  font-weight: bold;
}


.loading-placeholder {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-medium);
}

#info-adicional {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: var(--color-background-surface-dark);
  border-radius: 8px;
  border: 1px solid var(--color-border-dark);
}

#info-adicional h2 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1rem;
}
#info-adicional p a {
    font-weight: bold;
}

@media (max-width: 768px) {
  #tipos-entradas h1 {
    font-size: 2rem;
  }
}
</style>