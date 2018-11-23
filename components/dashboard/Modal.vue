<template>
  <div class="modal" :class="{'is-active': show}">
    <div class="modal-background" @click="closeModal"></div>
    <!-- If the user isn't Admin -->
    <div class="modal-content" v-if="user.rol === 'Usuario'">
      <div class="box">
        <form @submit.prevent="enviarPago">
          <h2 class="has-text-centered title is-2 has-text-weight-light">Comprobante de pago</h2>
          <hr>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="text" placeholder="Comprobante" v-model="pagoInfo">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-success is-fullwidth is-large" :disabled="!pagoInfo">Enviar Comprobante</button>
            </div>
          </div>

          <div class="content" v-if="message">
            <ul>
              <li class="has-text-success">{{ message }}</li>
            </ul>
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
                <span class="tag is-dark is-medium" v-if="data">{{ data.user.nombre }} {{ data.user.apellido }}</span>
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
              <a @click="rechazarPago" class="button is-danger is-fullwidth is-medium" :disabled="!comprobante">Rechazar Pago</a>
            </div>
          </div>

          <div class="content" v-if="message">
            <ul>
              <li class="has-text-success">{{ message }}</li>
            </ul>
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
      comprobanteValue: null,
      pagoInfo: null,
      message: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('toggle');
    },
    closeModalWithReload() {
      this.$emit('sendData');
    },
    getComprobante() {
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.data.user.ID;
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
      const ID = this.data.factura;
      axios.put(`http://localhost:3001/factura/${ID}`, {headers: {Authorization: AuthStr}, estado: 'Correcto'}).then(response => {        
        if(response.status == 200) { // TODO: add animation for success status
          this.message = 'Pago confirmado correctamente';
          setTimeout(() => {
            this.closeModalWithReload();
            this.message = ''
          }, 1000);
        }
      }).catch(error => {
        console.error(error);
      });
    },
    rechazarPago() { // TODO: Set this method in the store
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.data.factura;
      axios.put(`http://localhost:3001/factura/${ID}`, {headers: {Authorization: AuthStr}, estado: 'Rechazado'}).then(response => {        
        if(response.status == 200) { // TODO: add animation for success status
          this.message = 'Pago rechazado correctamente';
          setTimeout(() => {
            this.closeModalWithReload();
            this.message = ''
          }, 1000);
        }
      }).catch(error => {
        console.error(error);
      });
    },
    enviarPago() {
      const AuthStr = 'Bearer '.concat(this.token);
      const pago = {
        userID: this.user.sub,
        comprobante: this.pagoInfo,
        facturaID: this.data.ID
      }

      if(this.data.estado == 'Rechazado') {
        axios.put(`http://localhost:3001/pago/${pago.facturaID}`, {headers: {Authorization: AuthStr}, comprobante: pago.comprobante}).then(response => {        
          if(response.status == 200) { // TODO: add animation for success status
            axios.put(`http://localhost:3001/factura/${pago.facturaID}`, {headers: {Authorization: AuthStr}, estado: 'Pendiente'}).then(response => {        
              if(response.status == 200) { // TODO: add animation for success status
                this.message = 'Comprobante enviado correctamente';
                setTimeout(() => {
                  this.closeModalWithReload();
                  this.message = ''
                }, 1000);
              }
            }).catch(error => {
              console.error(error);
            });
          }
        }).catch(error => {
          console.error(error);
        });        
      } else {
        axios.post('http://localhost:3001/pago', {headers: {Authorization: AuthStr}, pago}).then(response => {        
          if(response.status == 200) {
            axios.put(`http://localhost:3001/factura/${pago.facturaID}`, {headers: {Authorization: AuthStr}, estado: 'Pendiente'}).then(response => {        
              if(response.status == 200) { // TODO: add animation for success status
                this.message = 'Comprobante enviado correctamente';
                setTimeout(() => {
                  this.closeModalWithReload();
                  this.message = ''
                }, 1000);
              }
            }).catch(error => {
              console.error(error);
            });
          }
        }).catch(error => {
          console.error(error);
        });
      }
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