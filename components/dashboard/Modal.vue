<template>
  <div class="modal" :class="{'is-active': show}">
    <div class="modal-background"></div>
    <!-- If the user isn't Admin -->
    <div class="modal-content" v-if="user.rol === 'Usuario'">
      <div class="box">
        <form>
          <h2 class="has-text-centered title is-2 has-text-weight-light">Comprobante de pago</h2>
          <hr>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="number" placeholder="Comprobante" v-model="comprobante">
            </div>
          </div>

          <pre>
            Comprobante data: {{ comprobante }}
          </pre>

          <div class="field">
            <div class="control">
              <button class="button is-success is-fullwidth is-large">Enviar Comprobante</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- If the user is Admin -->
    <div class="modal-content" v-if="user.rol === 'Administrador'">
      <div class="box">
        <form>
          <h2 class="has-text-centered title is-2 has-text-weight-light">Comprobante de pago</h2>
          <hr>
          <div class="field">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-success is-medium">Usuario</span>
                <span class="tag is-dark is-medium">{{ data.nombre }} {{ data.apellido }}</span>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="notification is-warning">
              <strong>Comprobante:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, mollitia?
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success is-fullwidth is-large">Confirmar Comprobante</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <a class="modal-close is-large" aria-label="close" @click="closeModal"></a>
  </div>
</template>

<script>
export default {
  props: ['show', 'user', 'data'],
  methods: {
    closeModal() {
      this.$emit('toggle');
    }
  },
  data() {
    return {
      comprobante: ''
    }
  }
}
</script>