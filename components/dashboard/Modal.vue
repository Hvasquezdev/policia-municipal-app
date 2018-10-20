<template>
  <div class="modal" :class="{'is-active': show}">
    <div class="modal-background" @click="closeModal"></div>
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
        <form @submit.prevent="confirmarPago">
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
            <div class="notification is-warning" v-if="comprobante">
              <strong>Comprobante:</strong> {{ comprobante }}
            </div>

            <div class="notification is-warning" v-if="!comprobante">
              <strong>El comprobante no ha sido recibido.</strong>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control is-expanded">
              <button class="button is-success is-fullwidth is-medium">Confirmar Pago</button>
            </div>

            <div class="control is-expanded">
              <button class="button is-danger is-fullwidth is-medium" :disabled="!comprobante">Rechazar Pago</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <a class="modal-close is-large" aria-label="close" @click="closeModal"></a>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
  props: ['show', 'user', 'data'],
  data() {
    return {
      comprobanteValue: null
    };
  },
  methods: {
    closeModal() {
      this.$emit('toggle');
    },
    getComprobante() {
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.data.ID;
      let comprobante = this.comprobanteValue;
    
      axios.get(`http://localhost:3001/pago/${ID}`, {headers: {Authorization: AuthStr}}).then(response => {        
        if(response.data[0]) {
          this.comprobanteValue = response.data[0].comprobante;
        } else {
          this.comprobanteValue = null;
        }
        
      }).catch(error => {
        console.error(error);
      });
      return comprobante;
    },
    confirmarPago() { // TODO: Set this method in the store
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.data.ID;
    
      axios.put(`http://localhost:3001/factura/${ID}`, {headers: {Authorization: AuthStr}, estado: 'Correcto'}).then(response => {        
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    }
  },
  computed: {
    ...mapGetters({
      token: 'isAuthenticated'
    }),
    comprobante() {
      return this.show ? this.getComprobante() : null;
    }
  }
}
</script>