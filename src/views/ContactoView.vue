// src/views/ContactoView.vue
<template>
  <main class="contacto-page-content">
    <div class="container">
      <section id="titulo-contacto">
        <h1>Ponete en Contacto</h1>
        <p>Si tienes preguntas, sugerencias o quieres colaborar con el festival, no dudes en escribirnos. ¡Estamos aquí para ayudarte!</p>
      </section>

      <div class="contacto-layout">
        <section id="info-contacto" class="info-directa">
          <h2>Nuestros Canales</h2>
          <p><strong>Email:</strong> <a href="mailto:info@sonidosdelaciudad.com" title="Enviar correo a info@sonidosdelaciudad.com">info@sonidosdelaciudad.com</a></p>
          <p><strong>Teléfono (solo prensa):</strong> <a href="tel:+541112345678">+54 11 1234-5678</a></p>
          <p><strong>Redes Sociales:</strong></p>
          <ul class="lista-redes">
            <li><a href="https://www.facebook.com/franco.rivero.7967/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-square"></i> Facebook</a></li>
            <li><a href="https://www.instagram.com/p/DJhlXBevOy0/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </section>

        <section id="formulario-contacto" class="formulario-wrapper">
          <h2>Formulario de Contacto</h2>
          <form @submit.prevent="enviarFormulario" name="contacto-festival" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contacto-festival" />
            <p class="hidden-field" style="display:none;">
              <label>No llenar este campo si eres humano: <input name="bot-field" v-model="formData['bot-field']" /></label>
            </p>

            <div>
              <label for="nombre">Nombre Completo:</label>
              <input type="text" id="nombre" name="nombre" v-model="formData.nombre" required placeholder="Ej: Ana Pérez">
            </div>
            <div>
              <label for="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" v-model="formData.email" required placeholder="Ej: ana.perez@correo.com">
            </div>
            <div>
              <label for="asunto">Asunto:</label>
              <input type="text" id="asunto" name="asunto" v-model="formData.asunto" required list="sugerencias-asunto">
              <datalist id="sugerencias-asunto">
                <option value="Consulta General"></option>
                <option value="Propuesta Artística"></option>
                <option value="Prensa y Difusión"></option>
                <option value="Problema con Entradas"></option>
                <option value="Sugerencias"></option>
              </datalist>
            </div>
            <div>
              <label for="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" rows="5" v-model="formData.mensaje" required placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>
            <div>
              <label for="tipo-contacto">Motivo principal de contacto:</label>
              <select id="tipo-contacto" name="tipo-contacto" v-model="formData.tipoContacto">
                <option value="">-- Selecciona una opción --</option>
                <option value="info_general">Información General</option>
                <option value="prop_artista">Propuesta Artística</option>
                <option value="prensa">Prensa</option>
                <option value="sponsor">Sponsorización</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <fieldset>
              <legend>¿Cómo prefieres que te contactemos?</legend>
              <label class="radio-label">
                <input type="radio" id="contact_email" name="preferencia_contacto" value="email" v-model="formData.preferenciaContacto">
                Email
              </label>
              <label class="radio-label">
                <input type="radio" id="contact_telefono" name="preferencia_contacto" value="telefono" v-model="formData.preferenciaContacto">
                Teléfono (si lo proporcionaste)
              </label>
            </fieldset>
            
            <div v-if="mensajeError" class="mensaje-error">
              {{ mensajeError }}
            </div>
            <div v-if="mensajeEnviado" class="mensaje-confirmacion">
              ¡Gracias! Tu mensaje ha sido enviado.
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
              </button>
              <button type="button" @click="limpiarFormulario" class="btn btn-outline" :disabled="isSubmitting">Limpiar Formulario</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContactoView',
  data() {
    return {
      formData: {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        tipoContacto: '',
        preferenciaContacto: 'email',
        'form-name': 'contacto-festival', // IMPORTANTE: Coincide con el name del form HTML
        'bot-field': '' // Campo Honeypot
      },
      isSubmitting: false, // Para deshabilitar el botón durante el envío
      mensajeEnviado: false,
      mensajeError: ''
    };
  },
  methods: {
    encode(data) { // Helper para codificar los datos del formulario
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    async enviarFormulario() {
      if (this.isSubmitting) return; // Evitar envíos múltiples
      this.isSubmitting = true;
      this.mensajeError = '';
      this.mensajeEnviado = false;

      // Validación básica (la mejoraremos en la Parte 2)
      if (!this.formData.nombre || !this.formData.email || !this.formData.mensaje) {
        this.mensajeError = "Por favor, completa los campos obligatorios (Nombre, Email, Mensaje).";
        this.isSubmitting = false;
        return;
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
          this.mensajeError = "Por favor, ingresa un correo electrónico válido.";
          this.isSubmitting = false;
          return;
      }


      try {
        const response = await fetch("/", { // Netlify procesa envíos a la URL raíz del sitio
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({ 
            "form-name": this.formData['form-name'], // Asegúrate que el nombre del form se envíe
            "bot-field": this.formData['bot-field'], // Honeypot
            nombre: this.formData.nombre,
            email: this.formData.email,
            asunto: this.formData.asunto,
            mensaje: this.formData.mensaje,
            tipoContacto: this.formData.tipoContacto,
            preferencia_contacto: this.formData.preferenciaContacto // Nota: Netlify usa el 'name' del input
          })
        });

        if (response.ok) {
          this.mensajeEnviado = true;
          this.limpiarFormulario(); // Limpia el formulario después del éxito
        } else {
          // Intenta obtener un mensaje de error de la respuesta si es posible
          const errorData = await response.text(); // O .json() si Netlify devuelve JSON
          this.mensajeError = `Hubo un problema al enviar tu mensaje. Código: ${response.status}. ${errorData}`;
          console.error("Error en el envío a Netlify:", response);
        }
      } catch (error) {
        console.error("Error de red o JavaScript al enviar formulario:", error);
        this.mensajeError = "Hubo un error de red al enviar tu mensaje. Inténtalo de nuevo.";
      } finally {
        this.isSubmitting = false;
      }
    },
    limpiarFormulario() {
      this.formData.nombre = '';
      this.formData.email = '';
      this.formData.asunto = '';
      this.formData.mensaje = '';
      this.formData.tipoContacto = '';
      this.formData.preferenciaContacto = 'email';
      this.formData['bot-field'] = ''; // También limpia el honeypot
      // this.mensajeEnviado = false; // No resetear este, se oculta con timeout
      setTimeout(() => {
        this.mensajeEnviado = false;
      }, 5000);
    }
  }
}
</script>

<style scoped>
.contacto-page-content {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

#titulo-contacto h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-primary-red);
  font-size: 2.5rem;
}
#titulo-contacto > .container > p { /* Párrafo introductorio */
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.contacto-layout {
  display: grid;
  grid-template-columns: 1fr; /* Apilado por defecto */
  gap: 2rem;
}

@media (min-width: 768px) { /* Dos columnas en pantallas más grandes */
  .contacto-layout {
    grid-template-columns: 1fr 2fr; /* Info a la izquierda, formulario a la derecha más grande */
  }
}

.info-directa, .formulario-wrapper {
  padding: 1.5rem;
  background-color: var(--color-background-surface-dark);
  border-radius: 8px;
  border: 1px solid var(--color-border-dark);
}

.info-directa h2, .formulario-wrapper h2 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-dark);
  padding-bottom: 0.5rem;
}

.info-directa p {
    margin-bottom: 0.8rem;
}
.info-directa p strong {
    color: var(--color-text-light);
}

.lista-redes {
    list-style: none;
    padding-left: 0;
}
.lista-redes li {
    margin-bottom: 0.5rem;
}
.lista-redes li a {
    color: var(--color-text-medium);
    text-decoration: none;
    transition: color 0.3s ease;
}
.lista-redes li a:hover {
    color: var(--color-primary-red);
}
.lista-redes li i { /* Para iconos de Font Awesome */
    margin-right: 0.5em;
    color: var(--color-accent-light-blue);
    width: 1.2em; /* Para alinear iconos */
    text-align: center;
}


/* Estilos del formulario (muchos vienen de estilos.css global para inputs, labels) */
#formulario-contacto form div,
#formulario-contacto form fieldset {
  margin-bottom: 1.2rem; /* Un poco menos de margen */
}
/* Label y input ya deberían tener estilos globales */

#formulario-contacto fieldset {
  padding: 1em 1.2em;
}
#formulario-contacto legend {
  padding: 0 0.5em;
}

.radio-label { /* Para mejor alineación y clickeabilidad de radios */
    display: block; /* O inline-block con margen si los quieres en línea */
    margin-bottom: 0.5rem;
    cursor: pointer;
}
.radio-label input[type="radio"] {
    margin-right: 0.5em;
    vertical-align: middle;
}

.form-actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap; /* Para que los botones se apilen en móvil si no caben */
}
/* Estilos para .btn y .btn-primary ya están en global */
.btn-outline { /* Estilo para el botón de limpiar */
    background-color: transparent;
    color: var(--color-accent-light-blue);
    border: 1px solid var(--color-accent-light-blue);
}
.btn-outline:hover {
    background-color: var(--color-accent-light-blue);
    color: var(--color-background-surface-dark);
}

.mensaje-confirmacion {
    margin-top: 1.5rem;
    padding: 1em;
    background-color: rgba(var(--color-accent-light-blue), 0.2);
    border: 1px solid var(--color-accent-light-blue);
    color: var(--color-text-light);
    border-radius: 4px;
    text-align: center;
}

@media (max-width: 768px) {
  #titulo-contacto h1 {
    font-size: 2rem;
  }
   .info-directa h2, .formulario-wrapper h2 {
    font-size: 1.5rem; /* Ajustar tamaño de H2 en secciones */
  }
}

.mensaje-error {
    margin-top: 1.5rem;
    padding: 1em;
    background-color: rgba(var(--color-primary-red), 0.15); /* Fondo rojo claro */
    border: 1px solid var(--color-primary-red);
    color: var(--color-primary-red); /* Texto rojo */
    border-radius: 4px;
    text-align: center;
}
.hidden-field { /* Para asegurar que el honeypot esté realmente oculto */
    display: none !important;
    visibility: hidden !important;
    position: absolute !important;
    left: -9999px !important;
}
</style>