<template>
  <main class="gracias-page-content">
    <div class="container">
      <section class="mensaje-agradecimiento">
        <h1>¡Gracias por tu Compra!</h1>
        <p>Tu solicitud ha sido procesada con éxito. Recibirás un correo electrónico con los detalles de tus entradas y los siguientes pasos.</p>
        <p>¡Nos vemos en el festival!</p>
        <div class="acciones-gracias">
          <router-link to="/" class="btn btn-primary">Volver al Inicio</router-link>
          <router-link to="/cronograma" class="btn btn-secondary">Ver Cronograma</router-link>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'GraciasCompraView'
}
</script>

<style scoped>
.gracias-page-content {
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px); /* Ajusta 120px a la altura de tu nav+footer si es diferente */
}

.mensaje-agradecimiento {
  text-align: center;
  background-color: var(--color-background-surface-dark);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-accent-light-blue); /* Borde azul para destacar */
  box-shadow: 0 5px 15px rgba(var(--rgb-black), 0.2);
  max-width: 600px;
  margin: 0 auto;
}

.mensaje-agradecimiento h1 {
  color: var(--color-primary-red); /* Título en rojo para que coincida con la acción de compra */
  margin-bottom: 1.5rem;
}

.mensaje-agradecimiento p {
  font-size: 1.1rem;
  color: var(--color-text-medium);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.acciones-gracias {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>