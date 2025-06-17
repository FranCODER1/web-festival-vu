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
          <form @submit.prevent="enviarFormulario">
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
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
              <button type="button" @click="limpiarFormulario" class="btn btn-outline">Limpiar Formulario</button>
            </div>
          </form>
          <p v-if="mensajeEnviado" class="mensaje-confirmacion">¡Gracias! Tu mensaje ha sido enviado.</p>
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
        preferenciaContacto: 'email' // Valor por defecto
      },
      mensajeEnviado: false
    };
  },
  methods: {
    enviarFormulario() {
      // Aquí iría la lógica para enviar el formulario
      // Por ejemplo, usando fetch() o axios para enviarlo a un backend o servicio
      console.log('Datos del formulario:', this.formData);
      
      // Simulación de envío exitoso
      this.mensajeEnviado = true;
      // Opcional: Limpiar formulario después de un envío exitoso
      // this.limpiarFormulario(); 
      
      // Opcional: Ocultar el mensaje después de unos segundos
      setTimeout(() => {
        this.mensajeEnviado = false;
      }, 5000); // 5 segundos
    },
    limpiarFormulario() {
      this.formData = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        tipoContacto: '',
        preferenciaContacto: 'email'
      };
      this.mensajeEnviado = false; // También resetea el mensaje de confirmación
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
</style>