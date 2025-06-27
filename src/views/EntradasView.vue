// src/views/EntradasView.vue
<template>
  <main class="entradas-page-content">
    <div class="container">
      <section id="tipos-entradas">
        <h1>Compra tus Entradas</h1>
        <p>Asegura tu lugar en Sonidos de la Ciudad. ¡Elige la entrada que mejor se adapte a vos y preparate para vibrar!</p>

        <div v-if="tiposDeEntradas && tiposDeEntradas.length > 0" class="table-responsive-wrapper">
          <table class="tabla-entradas">
            <caption>Tabla de Precios y Tipos de Entrada</caption>
            <thead>
              <tr>
                <th>Tipo de Entrada</th>
                <th>Descripción</th>
                <th>Precio (Preventa)</th>
                <th>Precio (Puerta)</th>
                <th>Acción</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="entrada in tiposDeEntradas" :key="entrada.id">
                <td data-label="Tipo de Entrada">{{ entrada.tipo }}</td>
                <td data-label="Descripción">{{ entrada.descripcion }}</td>
                <td data-label="Precio (Preventa)">{{ entrada.precioPreventa }}</td>
                <td data-label="Precio (Puerta)">{{ entrada.precioPuerta }}</td>
                <td data-label="Acción">
                  <router-link :to="`/comprar-ticket/${entrada.id}`" class="btn btn-primary">
                    {{ entrada.textoBoton || 'Comprar Ahora' }}
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5">Los precios pueden variar. Cupos limitados.</td>
              </tr>
            </tfoot>
          </table>
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
export default {
  name: 'EntradasView',
  data() {
    return {
      tiposDeEntradas: [
        {
          id: 'gral-diaria',
          tipo: 'Entrada General Diaria',
          descripcion: 'Acceso a todos los escenarios por un día.',
          precioPreventa: '$2500 ARS',
          precioPuerta: '$3000 ARS',
          enlaceCompra: '...', 
          textoBoton: 'Comprar Diaria'
        },
        {
          id: 'abono-gral',
          tipo: 'Abono General (3 días)',
          descripcion: 'Acceso completo a los tres días del festival.',
          precioPreventa: '$6000 ARS',
          precioPuerta: '$7500 ARS',
          textoBoton: 'Comprar Abono'
        },
        {
          id: 'vip-diaria',
          tipo: 'Entrada VIP Diaria',
          descripcion: 'Acceso preferencial, área VIP, consumiciones.',
          precioPreventa: '$5000 ARS',
          precioPuerta: '$6000 ARS',
          textoBoton: 'Comprar VIP Diaria'
        },
        {
          id: 'abono-vip',
          tipo: 'Abono VIP (3 días)',
          descripcion: 'Experiencia VIP completa para todo el festival.',
          precioPreventa: '$12000 ARS',
          precioPuerta: '$15000 ARS',
          textoBoton: 'Comprar Abono VIP'
        }
      ]
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
#tipos-entradas > .container > p { 
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.table-responsive-wrapper {
  overflow-x: auto; 
}

.tabla-entradas {
  width: 100%;
  margin-top: 1rem;
}

.tabla-entradas th, .tabla-entradas td {
  padding: 0.8em 1em;
}

.tabla-entradas .btn-primary {
    padding: 0.6em 1.2em;
    font-size: 0.85rem;
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