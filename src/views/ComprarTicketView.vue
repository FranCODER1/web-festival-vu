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
            <div class="form-group" :class="feedbackClass('nombreCompleto')">
              <label for="nombreCompleto">Nombre Completo</label>
              <input type="text" id="nombreCompleto" v-model.trim="form.comprador.nombreCompleto" placeholder="Ej: Juan Pérez" required>
              <p v-if="errors.nombreCompleto" class="error-message">{{ errors.nombreCompleto }}</p>
            </div>
            <div class="form-group" :class="feedbackClass('email')">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model.trim="form.comprador.email" placeholder="ejemplo@correo.com" required>
              <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
            </div>
            <div class="form-group" :class="feedbackClass('telefono')">
              <label for="telefono">Número de Teléfono</label>
              <input type="tel" id="telefono" v-model.trim="form.comprador.telefono" placeholder="Ej: 1122334455 (10 dígitos)" required>
              <p v-if="errors.telefono" class="error-message">{{ errors.telefono }}</p>
            </div>
            <div class="form-group" :class="feedbackClass('fechaNacimiento')">
              <label for="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="text" id="fechaNacimiento" v-model.trim="form.comprador.fechaNacimiento" placeholder="dd/mm/aaaa" required>
              <p v-if="errors.fechaNacimiento" class="error-message">{{ errors.fechaNacimiento }}</p>
            </div>
            <div class="form-group" :class="feedbackClass('pais')">
              <label for="pais">País de Residencia</label>
              <select id="pais" v-model="form.comprador.pais" required>
                <option disabled value="">Selecciona tu país</option>
                <option v-for="pais in paises" :key="pais.iso2" :value="pais.nameES">{{ pais.nameES }}</option>
              </select>
              <p v-if="errors.pais" class="error-message">{{ errors.pais }}</p>
            </div>
          </fieldset>

          <!-- SECCIÓN DATOS DEL EVENTO -->
          <fieldset>
            <legend>2. Elige tu Evento y Cantidad</legend>
            <div class="form-group" :class="feedbackClass('evento')">
              <label for="evento">Selecciona el Evento</label>
              <select id="evento" v-model="form.evento.id" required>
                <option disabled value="">Selecciona un evento</option>
                <option v-for="evento in eventos" :key="evento.id" :value="evento.id">
                  {{ evento.evento }} - {{ formatearFecha(evento.fecha) }}
                </option>
              </select>
              <p v-if="errors.evento" class="error-message">{{ errors.evento }}</p>
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
            <div class="form-group" :class="feedbackClass('tipoEntrada')">
              <label for="tipoEntrada">Tipo de Entrada</label>
              <select id="tipoEntrada" v-model="form.entrada.tipo" :disabled="!form.evento.id" required>
                <option disabled value="">Selecciona un tipo</option>
                <option v-for="(precio, tipo) in preciosDelEvento" :key="tipo" :value="tipo">{{ tipo }}</option>
              </select>
              <p v-if="errors.tipoEntrada" class="error-message">{{ errors.tipoEntrada }}</p>
            </div>
            <div class="form-group" :class="feedbackClass('cantidad')">
              <label for="cantidad">Cantidad de Entradas (máx. 6)</label>
              <input type="number" id="cantidad" v-model.number="form.entrada.cantidad" min="1" max="6" required>
              <p v-if="errors.cantidad" class="error-message">{{ errors.cantidad }}</p>
            </div>
          </fieldset>

          <!-- NUEVO: Fieldset para el Resumen de Compra -->
          <fieldset v-if="form.evento.id && form.entrada.tipo && form.entrada.cantidad > 0" class="summary-fieldset">
            <legend>Resumen de tu Compra</legend>
            <div class="summary-details">
              <div class="summary-item">
                <span class="summary-label">Evento:</span>
                <span class="summary-value">{{ eventoSeleccionado.evento }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Fecha:</span>
                <span class="summary-value">{{ formatearFecha(eventoSeleccionado.fecha) }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Ubicación:</span>
                <span class="summary-value">{{ eventoSeleccionado.lugar }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Tipo de Entrada:</span>
                <span class="summary-value">{{ form.entrada.tipo }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Cantidad:</span>
                <span class="summary-value">{{ form.entrada.cantidad }}</span>
              </div>
              <div class="summary-item total-summary">
                <span class="summary-label">Total a Pagar:</span>
                <span class="summary-value price-amount">{{ precioTotal }}</span>
              </div>
            </div>
          </fieldset>

          <!-- SECCIÓN DATOS DE PAGO -->
          <fieldset>
            <legend>3. Datos de Pago</legend>
            <div class="form-group card-number-wrapper" :class="feedbackClass('numeroTarjeta')">
              <label for="tarjetaNumero">Número de Tarjeta</label>
              <div class="input-with-logo-wrapper">
                <input type="text" id="tarjetaNumero" v-model.trim="form.pago.numeroTarjeta" placeholder="•••• •••• •••• ••••" required>
                <img v-if="detectedCardType" :src="cardLogo" alt="Logo de tarjeta" class="card-logo">
              </div>
              <p v-if="errors.numeroTarjeta" class="error-message">{{ errors.numeroTarjeta }}</p>
            </div>
            <div class="form-row">
              <div class="form-group" :class="feedbackClass('vencimiento')">
                <label for="tarjetaVencimiento">Vencimiento (MM/AA)</label>
                <input type="text" id="tarjetaVencimiento" v-model.trim="form.pago.vencimiento" placeholder="MM/AA" required>
                <p v-if="errors.vencimiento" class="error-message">{{ errors.vencimiento }}</p>
              </div>
              <div class="form-group" :class="feedbackClass('cvv')">
                <label for="tarjetaCVV">CVV</label>
                <input type="text" id="tarjetaCVV" v-model.trim="form.pago.cvv" placeholder="123" required>
                <p v-if="errors.cvv" class="error-message">{{ errors.cvv }}</p>
              </div>
            </div>
            <div class="form-group" :class="feedbackClass('nombreEnTarjeta')">
              <label for="tarjetaNombre">Nombre en la Tarjeta</label>
              <input type="text" id="tarjetaNombre" v-model.trim="form.pago.nombreEnTarjeta" placeholder="Como aparece en la tarjeta" required>
              <p v-if="errors.nombreEnTarjeta" class="error-message">{{ errors.nombreEnTarjeta }}</p>
            </div>
          </fieldset>
          
          <div class="submit-section">
            <p v-if="!isFormFullyValidated && submitAttempted" class="general-error-message">
              Por favor, corrige los errores antes de continuar.
            </p>
            <button type="submit" class="btn btn-primary submit-button" :disabled="!isFormValidOnSubmit">
              Proceder al Pago
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import eventosData from '@/data/eventos.json';
import paisesData from '@/data/paises.json';
import { tiposDeEntradas } from '@/data/tiposDeEntradas.js';

export default {
  name: 'ComprarTicketView',
  data() {
    return {
      eventos: [],
      paises: [],
      tiposDeEntradas: [],
      submitAttempted: false,
      detectedCardType: null,
      form: {
        comprador: { nombreCompleto: '', email: '', telefono: '', fechaNacimiento: '', pais: '' },
        evento: { id: '' },
        entrada: { tipo: '', cantidad: 1 },
        pago: { numeroTarjeta: '', vencimiento: '', cvv: '', nombreEnTarjeta: '' },
      },
      errors: {
        nombreCompleto: null, email: null, telefono: null, fechaNacimiento: null, pais: null,
        evento: null, tipoEntrada: null, cantidad: null,
        numeroTarjeta: null, vencimiento: null, cvv: null, nombreEnTarjeta: null,
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
    },
    preciosDelEvento() {
      return this.eventoSeleccionado ? this.eventoSeleccionado.precios : {};
    },
    precioTotal() {
      if (!this.eventoSeleccionado || !this.form.entrada.tipo || this.form.entrada.cantidad < 1) return 0;
      const precioUnitario = this.eventoSeleccionado.precios[this.form.entrada.tipo];
      if (typeof precioUnitario !== 'number') return 0;
      const total = precioUnitario * this.form.entrada.cantidad;
      const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: this.eventoSeleccionado.moneda || 'ARS' });
      return formatter.format(total);
    },
    cardLogo() {
      if (!this.detectedCardType) return '';
      try {
        return require(`@/assets/img/cards/${this.detectedCardType}.png`);
      } catch (e) {
        console.warn(`No se encontró el logo para: ${this.detectedCardType}`);
        return '';
      }
    },
    isFormValidOnSubmit() {
      const noErrors = Object.values(this.errors).every(error => error === '');
      const allFieldsFilled = 
        this.form.comprador.nombreCompleto && this.form.comprador.email && this.form.comprador.telefono &&
        this.form.comprador.fechaNacimiento && this.form.comprador.pais && this.form.evento.id &&
        this.form.entrada.tipo && this.form.entrada.cantidad && this.form.pago.numeroTarjeta &&
        this.form.pago.vencimiento && this.form.pago.cvv && this.form.pago.nombreEnTarjeta;
      return noErrors && allFieldsFilled;
    },
    isFormFullyValidated() {
      return Object.values(this.errors).every(error => error === '');
    }
  },
  watch: {
    'form.comprador.nombreCompleto'() { this.validateNombreCompleto(); },
    'form.comprador.email'() { this.validateEmail(); },
    'form.comprador.telefono'() { this.validateTelefono(); },
    'form.comprador.fechaNacimiento'() { this.validateFechaNacimiento(); },
    'form.comprador.pais'() { this.validateSimpleRequired('pais', 'País'); },
    'form.evento.id'() { this.validateSimpleRequired('evento', 'Evento'); this.form.entrada.tipo = ''; },
    'form.entrada.tipo'() { this.validateSimpleRequired('tipoEntrada', 'Tipo de entrada'); },
    'form.entrada.cantidad'() { this.validateCantidad(); },
    'form.pago.numeroTarjeta'(newValue) {
      const value = newValue.replace(/\s/g, '');
      if (/^4/.test(value)) { this.detectedCardType = 'visa'; } 
      else if (/^5[1-5]/.test(value)) { this.detectedCardType = 'mastercard'; } 
      else if (/^3[47]/.test(value)) { this.detectedCardType = 'amex'; } 
      else { this.detectedCardType = null; }
      this.validateNumeroTarjeta();
    },
    'form.pago.vencimiento'() { this.validateVencimiento(); },
    'form.pago.cvv'() { this.validateCvv(); },
    'form.pago.nombreEnTarjeta'() { this.validateNombreEnTarjeta(); },
  },
  methods: {
    feedbackClass(fieldName) {
      if (this.errors[fieldName] === null) return '';
      return this.errors[fieldName] === '' ? 'has-success' : 'has-error';
    },
    validateNombreCompleto() {
      const value = this.form.comprador.nombreCompleto;
      if (!value) { this.errors.nombreCompleto = "El nombre es requerido."; return false; }
      if (value.length < 3) { this.errors.nombreCompleto = 'El nombre debe tener al menos 3 caracteres.'; return false; }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { this.errors.nombreCompleto = 'El nombre solo puede contener letras y espacios.'; return false; }
      this.errors.nombreCompleto = ''; return true;
    },
    validateEmail() {
      const value = this.form.comprador.email;
      if (!value) { this.errors.email = "El correo electrónico es requerido."; return false; }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) { this.errors.email = 'El formato del correo electrónico no es válido.'; return false; }
      this.errors.email = ''; return true;
    },
    validateTelefono() {
      const value = this.form.comprador.telefono;
      if (!value) { this.errors.telefono = "El teléfono es requerido."; return false; }
      if (!/^\d{10}$/.test(value)) { this.errors.telefono = 'El teléfono debe contener exactamente 10 dígitos.'; return false; }
      this.errors.telefono = ''; return true;
    },
    validateFechaNacimiento() {
      const value = this.form.comprador.fechaNacimiento;
      if (!value) { this.errors.fechaNacimiento = "La fecha de nacimiento es requerida."; return false; }
      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!regex.test(value)) { this.errors.fechaNacimiento = 'El formato debe ser dd/mm/aaaa.'; return false; }
      const [, dia, mes, anio] = value.match(regex);
      const fechaNac = new Date(`${anio}-${mes}-${dia}`);
      if (isNaN(fechaNac.getTime())) { this.errors.fechaNacimiento = 'La fecha no es válida.'; return false; }
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
      if (edad < 18) { this.errors.fechaNacimiento = 'Debes ser mayor de 18 años para comprar.'; return false; }
      this.errors.fechaNacimiento = ''; return true;
    },
    validateCantidad() {
      const value = this.form.entrada.cantidad;
      if (value < 1 || value > 6) { this.errors.cantidad = 'La cantidad debe ser entre 1 y 6.'; return false; }
      this.errors.cantidad = ''; return true;
    },
    validateNumeroTarjeta() {
      const value = this.form.pago.numeroTarjeta.replace(/\s/g, '');
      if (!value) { this.errors.numeroTarjeta = 'El número de tarjeta es requerido.'; return false; }
      if (!/^\d{16}$/.test(value)) { this.errors.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos.'; return false; }
      this.errors.numeroTarjeta = ''; return true;
    },
    validateVencimiento() {
      const value = this.form.pago.vencimiento;
      if (!value) { this.errors.vencimiento = 'La fecha de vencimiento es requerida.'; return false; }
      const regex = /^(\d{2})\/(\d{2})$/;
      if (!regex.test(value)) { this.errors.vencimiento = 'El formato debe ser MM/AA.'; return false; }
      const [, mes, anio] = value.match(regex);
      const mesNum = parseInt(mes, 10);
      const anioNum = parseInt(`20${anio}`, 10);
      if (mesNum < 1 || mesNum > 12) { this.errors.vencimiento = 'El mes no es válido.'; return false; }
      const hoy = new Date();
      const fechaVenc = new Date(anioNum, mesNum, 0); 
      if (fechaVenc < hoy) { this.errors.vencimiento = 'La tarjeta ha expirado.'; return false; }
      this.errors.vencimiento = ''; return true;
    },
    validateCvv() {
        const value = this.form.pago.cvv;
        if (!value) { this.errors.cvv = 'El CVV es requerido.'; return false; }
        if (!/^\d{3,4}$/.test(value)) { this.errors.cvv = 'El CVV debe tener 3 o 4 dígitos.'; return false; }
        this.errors.cvv = ''; return true;
    },
    validateNombreEnTarjeta() {
        const value = this.form.pago.nombreEnTarjeta;
        if (!value) { this.errors.nombreEnTarjeta = "El nombre es requerido."; return false; }
        if (value.length < 3) { this.errors.nombreEnTarjeta = 'El nombre debe tener al menos 3 caracteres.'; return false; }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { this.errors.nombreEnTarjeta = 'El nombre solo puede contener letras y espacios.'; return false; }
        this.errors.nombreEnTarjeta = ''; return true;
    },
    validateSimpleRequired(field, fieldName) {
        let value;
        if (field === 'pais') value = this.form.comprador.pais;
        else if (field === 'evento') value = this.form.evento.id;
        else if (field === 'tipoEntrada') value = this.form.entrada.tipo;

        if (!value) { this.errors[field] = `Debes seleccionar un ${fieldName.toLowerCase()}.`; return false; }
        this.errors[field] = ''; return true;
    },
    validateAllFields() {
        const validations = [
            this.validateNombreCompleto(), this.validateEmail(), this.validateTelefono(), this.validateFechaNacimiento(),
            this.validateSimpleRequired('pais', 'País'), this.validateSimpleRequired('evento', 'Evento'),
            this.validateSimpleRequired('tipoEntrada', 'Tipo de entrada'), this.validateCantidad(),
            this.validateNumeroTarjeta(), this.validateVencimiento(), this.validateCvv(), this.validateNombreEnTarjeta()
        ];
        return validations.every(isValid => isValid);
    },
    formatearFecha(fechaISO) {
      if (!fechaISO) return '';
      const opciones = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
      return new Date(fechaISO).toLocaleDateString('es-ES', opciones);
    },
    procesarCompra() {
      this.submitAttempted = true;
      const isFormValid = this.validateAllFields();
      if (isFormValid) {
        console.log('Formulario válido. Enviando datos:', this.form);
        alert('¡Compra procesada con éxito! (Simulación)');
      } else {
        console.log('Formulario inválido. No se envía.');
      }
    }
  },
  created() {
    this.eventos = eventosData.default || eventosData;
    this.paises = paisesData.default || paisesData;
    this.tiposDeEntradas = tiposDeEntradas;

    if (this.tipoDeEntradaSeleccionado) {
      this.form.entrada.tipo = this.tipoDeEntradaSeleccionado.tipo;
    } else {
      console.error("Tipo de entrada no válido en la URL.");
      this.$router.push('/entradas');
    }
  }
}
</script>

<style scoped>
.comprar-ticket-page-content { padding: 2rem 0 3rem 0; }
#form-compra-entradas h1, #form-compra-entradas > div > p { text-align: center; margin-bottom: 0.5rem; }
#form-compra-entradas > div > p { color: var(--color-text-medium); font-size: 1.1rem; margin-bottom: 2.5rem; }
.ticket-form { max-width: 800px; margin: 0 auto; background-color: var(--color-background-surface-dark); padding: 2rem; border-radius: 8px; }
.ticket-form fieldset { border: 1px solid var(--color-border-dark); padding: 1.5rem; border-radius: 4px; margin-bottom: 2rem; }
.ticket-form legend { padding: 0 0.5em; font-weight: bold; color: var(--color-accent-light-blue); font-size: 1.2rem; }
.form-group { margin-bottom: 1.5rem; } 
.form-group:last-child { margin-bottom: 0; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.form-row { display: flex; gap: 1rem; }
.form-row .form-group { flex: 1; }
.readonly-group input { background-color: var(--color-background-body-dark); cursor: not-allowed; color: var(--color-text-medium); border-style: dashed; }
.submit-section { margin-top: 1.5rem; }
.submit-button { width: 100%; padding: 1em; font-size: 1.1rem; transition: background-color 0.3s ease, opacity 0.3s ease; }
.submit-button:disabled { background-color: var(--color-border-dark); border-color: var(--color-border-dark); cursor: not-allowed; opacity: 0.6; }
.submit-button:disabled:hover { transform: none; box-shadow: none; background-color: var(--color-border-dark); }
.error-message { color: var(--color-primary-red); font-size: 0.8rem; margin-top: 0.35rem; min-height: 1em; }
.general-error-message { text-align: center; color: var(--color-primary-red); margin-bottom: 1rem; background-color: rgba(var(--rgb-primary-red), 0.1); padding: 0.75em; border-radius: 4px; }
.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea { border-color: var(--color-primary-red); background-color: rgba(var(--rgb-primary-red), 0.05); }
.form-group.has-error input:focus, .form-group.has-error select:focus, .form-group.has-error textarea:focus { box-shadow: 0 0 0 3px rgba(var(--rgb-primary-red), 0.3); }
.form-group.has-success input, .form-group.has-success select, .form-group.has-success textarea { border-color: #28a745; }
.form-group.has-success input:focus, .form-group.has-success select:focus, .form-group.has-success textarea:focus { box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3); }

/* Resumen de Compra */
.summary-fieldset { border-color: var(--color-accent-light-blue); background-color: var(--color-background-body-dark); }
.summary-fieldset legend { color: var(--color-accent-light-blue); }
.summary-details { display: flex; flex-direction: column; gap: 0.8rem; }
.summary-item { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border-dark); }
.summary-item:last-child { border-bottom: none; }
.summary-label { color: var(--color-text-medium); font-size: 0.9rem; }
.summary-value { color: var(--color-text-light); font-weight: 500; text-align: right; }
.summary-item.total-summary { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-primary-red); border-bottom: none; }
.total-summary .summary-label, .total-summary .summary-value { font-size: 1.3rem; font-weight: bold; }
.total-summary .summary-value { color: var(--color-primary-red); }

/* Detección de tarjeta */
.input-with-logo-wrapper { position: relative; }
#tarjetaNumero { padding-right: 60px !important; }
.card-logo {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  height: 28px !important;
  width: auto !important;
  max-width: 40px !important;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: 0.9;
}
.form-group input[type="number"] {
  width: 100%;
  /* Copiamos los estilos base de los otros inputs si es necesario */
  padding: 0.8em;
  border: 1px solid var(--color-border-dark);
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  background-color: var(--color-background-body-dark); 
  color: var(--color-text-light); 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input[type="number"]:focus {
    outline: none;
    border-color: var(--color-primary-red);
    box-shadow: 0 0 0 3px rgba(var(--rgb-primary-red), 0.3);
}
</style>