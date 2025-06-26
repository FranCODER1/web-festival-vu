<template>
  <main class="comprar-ticket-page-content">
    <div class="container">
      <section id="form-compra-entradas">
        <div v-if="tipoDeEntradaSeleccionado">
          <h1>Comprando: {{ tipoDeEntradaSeleccionado.tipo }}</h1>
          <p>Estás a solo unos pasos de conseguir tu entrada. Precio Preventa: <strong>{{ tipoDeEntradaSeleccionado.precioPreventa }}</strong></p>
        </div>
        <div v-else>
          <h1>Tipo de Entrada no encontrado</h1>
          <p>Por favor, vuelve a la <router-link to="/entradas">página de entradas</router-link> y selecciona una opción válida.</p>
        </div>

        <form v-if="tipoDeEntradaSeleccionado" @submit.prevent="procesarCompra" class="ticket-form" novalidate>
          <!-- SECCIÓN DATOS DEL COMPRADOR -->
          <fieldset>
            <legend>1. Tus Datos Personales</legend>
            <div class="form-group">
              <label for="nombreCompleto">Nombre Completo</label>
              <input type="text" id="nombreCompleto" v-model="form.comprador.nombreCompleto" placeholder="Ej: Juan Pérez" required>
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model="form.comprador.email" placeholder="ejemplo@correo.com" required>
            </div>
            <div class="form-group">
              <label for="telefono">Número de Teléfono</label>
              <input type="tel" id="telefono" v-model="form.comprador.telefono" placeholder="Ej: 1122334455 (10 dígitos)" required>
            </div>
            <div class="form-group">
              <label for="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="text" id="fechaNacimiento" v-model="form.comprador.fechaNacimiento" placeholder="dd/mm/aaaa" required>
            </div>
            <div class="form-group">
              <label for="pais">País de Residencia</label>
              <select id="pais" v-model="form.comprador.pais" required>
                <option disabled value="">Selecciona tu país</option>
                <option v-for="pais in paises" :key="pais.code" :value="pais.name_es">{{ pais.name_es }}</option>
              </select>
            </div>
          </fieldset>

          <!-- SECCIÓN DATOS DEL EVENTO -->
          <fieldset>
            <legend>2. Elige tu Evento y Cantidad</legend>
            <div class="form-group">
              <label for="evento">Selecciona el Evento</label>
              <select id="evento" v-model="form.evento.id" required>
                <option disabled value="">Selecciona un evento</option>
                <option v-for="evento in eventos" :key="evento.id" :value="evento.id">
                  {{ evento.evento }} - {{ formatearFecha(evento.fecha) }}
                </option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group readonly-group">
                <label>Fecha del Evento</label>
                <input type="text" :value="eventoSeleccionado ? formatearFecha(eventoSeleccionado.fecha) : ''" readonly>
              </div>
              <div class="form-group readonly-group">
                <label>Ubicación del Evento</label>
                <input type="text" :value="eventoSeleccionado ? `${eventoSeleccionado.lugar}, ${eventoSeleccionado.ciudad}` : ''" readonly>
              </div>
            </div>
            <div class="form-group">
              <label for="cantidad">Cantidad de Entradas (máx. 6)</label>
              <input type="number" id="cantidad" v-model.number="form.entrada.cantidad" min="1" max="6" required>
            </div>
          </fieldset>

          <!-- SECCIÓN DATOS DE PAGO -->
          <fieldset>
            <legend>3. Datos de Pago</legend>
            <div class="form-group">
              <label for="tarjetaNumero">Número de Tarjeta</label>
              <input type="text" id="tarjetaNumero" v-model="form.pago.numeroTarjeta" placeholder="•••• •••• •••• ••••" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="tarjetaVencimiento">Vencimiento (MM/AA)</label>
                <input type="text" id="tarjetaVencimiento" v-model="form.pago.vencimiento" placeholder="MM/AA" required>
              </div>
              <div class="form-group">
                <label for="tarjetaCVV">CVV</label>
                <input type="text" id="tarjetaCVV" v-model="form.pago.cvv" placeholder="123" required>
              </div>
            </div>
            <div class="form-group">
              <label for="tarjetaNombre">Nombre en la Tarjeta</label>
              <input type="text" id="tarjetaNombre" v-model="form.pago.nombreEnTarjeta" placeholder="Como aparece en la tarjeta" required>
            </div>
          </fieldset>
          
          <button type="submit" class="btn btn-primary submit-button">Proceder al Pago</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
// Importamos los datos JSON locales
import eventosData from '@/data/eventos.json';
import paisesData from '@/data/paises.json';
// Importamos los datos de los tipos de entrada desde el nuevo archivo .js
import { tiposDeEntradas } from '@/data/tiposDeEntradas.js';

export default {
  name: 'ComprarTicketView',
  data() {
    return {
      eventos: eventosData,
      paises: paisesData,
      tiposDeEntradas: tiposDeEntradas, // Usamos los datos importados
      form: {
        comprador: {
          nombreCompleto: '',
          email: '',
          telefono: '',
          fechaNacimiento: '',
          pais: '',
        },
        evento: {
          id: '', // Guardamos el ID del evento seleccionado
        },
        entrada: {
          tipo: '', // Se rellenará desde el parámetro de la URL
          cantidad: 1,
        },
        pago: {
          numeroTarjeta: '',
          vencimiento: '',
          cvv: '',
          nombreEnTarjeta: '',
        },
      }
    };
  },
  computed: {
    tipoDeEntradaSeleccionado() {
      const tipoId = this.$route.params.tipoDeEntrada;
      if (!tipoId || !this.tiposDeEntradas) return null;
      return this.tiposDeEntradas.find(entrada => entrada.id === tipoId);
    },
    eventoSeleccionado() {
      if (!this.form.evento.id) return null;
      return this.eventos.find(evento => evento.id === this.form.evento.id);
    }
  },
  watch: {
    // Cuando cambia el evento, reseteamos algunas cosas si es necesario
    'form.evento.id'() {
      // Podríamos añadir lógica aquí, pero por ahora no es necesario
    }
  },
  methods: {
    formatearFecha(fechaISO) {
      if (!fechaISO) return '';
      const opciones = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
      return new Date(fechaISO).toLocaleDateString('es-ES', opciones);
    },
    procesarCompra() {
      // En el futuro, aquí irá la validación completa antes de procesar
      console.log('Datos del formulario:', this.form);
      alert('¡Compra procesada! (Simulación)');
    }
  },
  created() {
    // Cuando el componente es creado, verificamos el tipo de entrada desde la URL
    if (this.tipoDeEntradaSeleccionado) {
      // Pre-llenamos el tipo de entrada en nuestro formulario
      this.form.entrada.tipo = this.tipoDeEntradaSeleccionado.tipo;
    } else {
      // Si el ID del tipo de entrada en la URL no es válido, redirigimos
      console.error("Tipo de entrada no válido en la URL.");
      this.$router.push('/entradas'); // Redirige a la página de selección de entradas
    }
  }
}
</script>

<style scoped>
/* Estilos para el formulario. Puedes tomar la base de tu ContactoView.vue */
.comprar-ticket-page-content {
  padding: 2rem 0 3rem 0;
}
#form-compra-entradas h1, #form-compra-entradas p {
  text-align: center;
  margin-bottom: 0.5rem;
}
#form-compra-entradas p {
  color: var(--color-text-medium);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.ticket-form {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-background-surface-dark);
  padding: 2rem;
  border-radius: 8px;
}

.ticket-form fieldset {
  border: 1px solid var(--color-border-dark);
  padding: 1.5rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}
.ticket-form legend {
  padding: 0 0.5em;
  font-weight: bold;
  color: var(--color-accent-light-blue);
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1.2rem;
}
.form-group:last-child {
    margin-bottom: 0;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
/* Los inputs y selects heredan estilos globales de estilos.css */

.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}

.readonly-group input {
  background-color: var(--color-background-body-dark);
  cursor: not-allowed;
  color: var(--color-text-medium);
  border-style: dashed;
}

.submit-button {
  width: 100%;
  padding: 1em;
  font-size: 1.1rem;
}
</style>