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
          {/* El action y method aquí son más para la semántica y fallback, Netlify se basa en el _form.html para la detección inicial y el JS para el envío */}
          <form @submit.prevent="enviarFormulario" name="contacto-festival" data-netlify="true" data-netlify-honeypot="bot-field" action="/contacto/gracias/">
            {/* Input oculto para el nombre del formulario que Netlify necesita */}
            <input type="hidden" name="form-name" value="contacto-festival" />
            {/* Campo Honeypot */}
            <p class="hidden-field" style="display:none;">
              <label>No llenar este campo si eres humano: <input name="bot-field" v-model="formData['bot-field']" /></label>
            </p>

            <div>
              <label for="nombre">Nombre Completo:</label>
              <input type="text" id="nombre" name="nombre" v-model="formData.nombre" placeholder="Ej: Ana Pérez">
              <span v-if="errors.nombre" class="error-text">{{ errors.nombre }}</span>
            </div>
            <div>
              <label for="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" v-model="formData.email" placeholder="Ej: ana.perez@correo.com">
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>
            <div>
              <label for="asunto">Asunto:</label>
              <input type="text" id="asunto" name="asunto" v-model="formData.asunto" list="sugerencias-asunto">
              <datalist id="sugerencias-asunto">
                <option value="Consulta General"></option>
                <option value="Propuesta Artística"></option>
                <option value="Prensa y Difusión"></option>
                <option value="Problema con Entradas"></option>
                <option value="Sugerencias"></option>
              </datalist>
              <span v-if="errors.asunto" class="error-text">{{ errors.asunto }}</span>
            </div>
            <div>
              <label for="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" rows="5" v-model="formData.mensaje" placeholder="Escribe tu mensaje aquí..."></textarea>
              <span v-if="errors.mensaje" class="error-text">{{ errors.mensaje }}</span>
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
              <span v-if="errors.tipoContacto" class="error-text">{{ errors.tipoContacto }}</span>
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
            
            <div v-if="mensajeErrorGeneral" class="mensaje-error">
              {{ mensajeErrorGeneral }}
            </div>
            {/* El mensaje de confirmación ya no es necesario aquí si rediriges a una página de gracias */}
            {/* <p v-if="mensajeEnviado" class="mensaje-confirmacion">¡Gracias! Tu mensaje ha sido enviado.</p> */}

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
        preferenciaContacto: 'email', // Valor por defecto
        'form-name': 'contacto-festival', // Necesario para Netlify
        'bot-field': '' // Campo Honeypot
      },
      isSubmitting: false,
      mensajeErrorGeneral: '',
      errors: { // Para errores específicos de cada campo
        nombre: '',
        email: '',
        asunto: '', // Aunque HTML 'required' lo maneja, podemos añadir mensaje
        mensaje: '',
        tipoContacto: ''
      }
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    validateForm() {
      // Resetear errores antes de cada validación
      this.errors = { nombre: '', email: '', asunto: '', mensaje: '', tipoContacto: '' };
      let isValid = true;

      if (!this.formData.nombre.trim()) {
        this.errors.nombre = 'El nombre completo es obligatorio.';
        isValid = false;
      }
      if (!this.formData.email.trim()) {
        this.errors.email = 'El correo electrónico es obligatorio.';
        isValid = false;
      } else {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(this.formData.email)) {
          this.errors.email = 'Por favor, ingresa un formato de correo electrónico válido.';
          isValid = false;
        }
      }
      if (!this.formData.asunto.trim()) {
        this.errors.asunto = 'El asunto es obligatorio.';
        // HTML5 'required' ya lo maneja, pero podemos añadir este mensaje si se quiere más control
        // isValid = false; // Descomentar si quieres forzar validación Vue incluso si HTML5 está
      }
      if (!this.formData.mensaje.trim()) {
        this.errors.mensaje = 'El mensaje es obligatorio.';
        isValid = false;
      }
      if (!this.formData.tipoContacto) {
        this.errors.tipoContacto = 'Por favor, selecciona un motivo de contacto.';
        isValid = false;
      }
      return isValid;
    },
async enviarFormulario() {
      this.mensajeErrorGeneral = ''; 
      if (!this.validateForm()) {
        this.isSubmitting = false; 
        return; 
      }

      if (this.isSubmitting) return;
      this.isSubmitting = true;
      
      const formDataEncoded = this.encode({ 
        "form-name": "contacto-festival", // Este es el nombre que Netlify espera
        "bot-field": this.formData['bot-field'],
        nombre: this.formData.nombre,
        email: this.formData.email,
        asunto: this.formData.asunto,
        mensaje: this.formData.mensaje,
        tipoContacto: this.formData.tipoContacto,
        preferencia_contacto: this.formData.preferenciaContacto 
      });

      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formDataEncoded
        });
        this.$router.push({ name: 'graciasContacto' }); 
      } catch (error) {
        console.error("Error de red o JavaScript al enviar formulario:", error);
        this.mensajeErrorGeneral = "Hubo un error de red al enviar tu mensaje. Por favor, revisa tu conexión e inténtalo de nuevo.";
      } finally {
        this.isSubmitting = false; 
      }
    },
    limpiarFormulario() {
      this.formData = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        tipoContacto: '',
        preferenciaContacto: 'email',
        'form-name': 'contacto-festival',
        'bot-field': ''
      };
      this.errors = { nombre: '', email: '', asunto: '', mensaje: '', tipoContacto: '' }; // También limpia los errores
      this.mensajeErrorGeneral = '';
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
#titulo-contacto > .container > p {
  text-align: center;
  color: var(--color-text-medium);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.contacto-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .contacto-layout {
    grid-template-columns: 1fr 2fr;
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

.info-directa p { margin-bottom: 0.8rem; }
.info-directa p strong { color: var(--color-text-light); }

.lista-redes { list-style: none; padding-left: 0; }
.lista-redes li { margin-bottom: 0.5rem; }
.lista-redes li a { color: var(--color-text-medium); text-decoration: none; transition: color 0.3s ease; }
.lista-redes li a:hover { color: var(--color-primary-red); }
.lista-redes li i { margin-right: 0.5em; color: var(--color-accent-light-blue); width: 1.2em; text-align: center; }

#formulario-contacto form div,
#formulario-contacto form fieldset {
  margin-bottom: 1.2rem;
}

.radio-label { display: block; margin-bottom: 0.5rem; cursor: pointer; }
.radio-label input[type="radio"] { margin-right: 0.5em; vertical-align: middle; }

.form-actions { margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap; }

.btn-outline {
  background-color: transparent;
  color: var(--color-accent-light-blue);
  border: 1px solid var(--color-accent-light-blue);
}
.btn-outline:hover {
  background-color: var(--color-accent-light-blue);
  color: var(--color-background-surface-dark);
}

.mensaje-error, .error-text { /* Unificado el estilo de error general y por campo */
  margin-top: 0.5rem; /* Ajustado para errores por campo */
  padding: 0.8em 1em;
  background-color: rgba(var(--color-primary-red), 0.15);
  border: 1px solid var(--color-primary-red);
  color: var(--color-primary-red);
  border-radius: 4px;
}
.error-text { /* Específico para errores de campo, más pequeño */
    font-size: 0.875em;
    padding: 0.4em 0.6em;
    margin-top: 0.25rem;
    background-color: transparent; /* Sin fondo para errores de campo inline */
    border: none; /* Sin borde para errores de campo inline */
    /* border-left: 3px solid var(--color-primary-red); /* O un indicador sutil */
    /* padding-left: 0.5em; */
}
.hidden-field { display: none !important; visibility: hidden !important; position: absolute !important; left: -9999px !important; }

@media (max-width: 768px) {
  #titulo-contacto h1 { font-size: 2rem; }
  .info-directa h2, .formulario-wrapper h2 { font-size: 1.5rem; }
}
</style>