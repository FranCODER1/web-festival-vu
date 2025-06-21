// src/views/GraciasContactoView.vue
<template>
  <main class="gracias-page-content">
    <div class="container">
      <section class="mensaje-agradecimiento">
        <h1>¡Gracias por tu Mensaje!</h1>
        <p>Hemos recibido tu consulta y nos pondremos en contacto contigo a la brevedad si es necesario.</p>
        <p>Mientras tanto, puedes seguir explorando el festival:</p>
        <div class="acciones-gracias">
          <router-link to="/" class="btn btn-primary">Volver al Inicio</router-link>
          <router-link to="/artistas" class="btn btn-secondary">Ver Artistas</router-link>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'GraciasContactoView'
}
</script>

<style scoped>
.gracias-page-content {
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px); /* Ajusta 120px según altura de tu nav+footer */
}

.mensaje-agradecimiento {
  text-align: center;
  background-color: var(--color-background-surface-dark);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border-dark);
  box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.2);
  max-width: 600px;
  margin: 0 auto;
}

.mensaje-agradecimiento h1 {
  color: var(--color-accent-light-blue);
  margin-bottom: 1.5rem;
}

.mensaje-agradecimiento p {
  font-size: 1.1rem;
  color: var(--color-text-medium);
  margin-bottom: 1.5rem;
}

.acciones-gracias {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>