<template>
  <div class="column">
    <div class="level">
      <div class="level-left">
        <h1 class="title is-3">
          <span class="has-text-grey-light">Hola </span> <strong>{{ profileData.nombre }} </strong> <span class="tag is-warning">{{ profileData.rol }}</span>
        </h1>
      </div>
    </div>
  <hr>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="title is-3 has-text-weight-normal" v-if="profileData.rol === 'Administrador'">Solicitudes de pago vigentes</h2>
        <h2 class="title is-3 has-text-weight-normal" v-if="profileData.rol === 'Usuario'">Multas pendientes</h2>
      </div>
  
    <!-- If the user is admin and we have invoice request show this list -->
      <div class="column is-12-tablet is-6-desktop is-4-fullhd" v-for="(multa, index) in solicitudPagoMultas.factura" :key="index" 
            v-if="solicitudPagoMultas && multa.Estado_Factura == 'Pendiente'">
        <div class="card">
          <div class="card-content">
            <h3 class="title is-4">
              <a href="#">ID: {{ multa.ID }}</a> - 
              <span class="has-text-weight-normal">
                {{ solicitudPagoMultas.user[index].nombre }} 
                {{ solicitudPagoMultas.user[index].apellido }}
              </span>
            </h3>

            <div class="level">
              <div class="level-left">
                <div>
                  <p class="title is-5 is-marginless">
                    <span>Multa de {{ solicitudPagoMultas.multa[index].Nombre }}</span>
                  </p>
                  <small>
                    Multado el {{ multa.Fecha_Emision }}
                  </small>
                </div>
              </div>
              <div class="level-right">
                <div class="has-text-right">
                  <p class="title is-5 is-marginless">
                    Bs.S {{ solicitudPagoMultas.multa[index].Precio }}
                  </p>
                  <span class="tag is-warning" v-if="multa.Estado_Factura">{{ multa.Estado_Factura }}</span>
                </div>
              </div>
            </div>
  
            <a class="button is-success is-fullwidth" href="#" @click="toggleModal(solicitudPagoMultas.user[index])">Confirmar pago</a>
          </div>
        </div>
      </div>
      
      <!-- If the user is not admin and he haves invoices show this list -->
      <div class="column is-12-tablet is-6-desktop is-4-fullhd" v-for="(factura, index) in facturaMultas.factura" :key="index" 
            v-if="facturaMultas">
        <div class="card">
          <div class="card-content">
            <h3 class="title is-4">
              <a href="#">ID: {{ factura.ID }}</a>
            </h3>

            <div class="level">
              <div class="level-left">
                <div>
                  <p class="title is-5 is-marginless">
                    <span>Multa de {{ facturaMultas.multa[index].Nombre }}</span>
                  </p>
                  <small>
                    Multado el fecha {{ factura.Fecha_Emision }}
                  </small>
                </div>
              </div>
              <div class="level-right">
                <div class="has-text-right">
                  <p class="title is-5 is-marginless">
                    Bs.S {{ facturaMultas.multa[index].Precio }}
                  </p>
                  <span class="tag is-warning" v-if="factura.Estado_Factura === 'Pendiente'">{{ factura.Estado_Factura }}</span>
                  <span class="tag is-success" v-if="factura.Estado_Factura === 'Activo'">{{ factura.Estado_Factura }}</span>
                </div>
              </div>
            </div>
  
            <a class="button is-success is-fullwidth" href="#" @click="toggleModal">Pagar Multa</a>
          </div>
        </div>
      </div>
      <!-- Else show this msg -->
      <div class="column is-12" v-else>
        <h3 class="subtitle is-4 has-text-grey">
          No hay solicitudes de pago activas
        </h3>
      </div>

      <modal-component :show="showModal" 
                        :user="profileData" 
                        :data="modalData"
                        v-on:toggle="toggleModal"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ModalComponent from '@/components/dashboard/Modal'

export default {
  components: {
    ModalComponent
  },
  mounted() {
    if(this.profileData.rol === 'Usuario') {
      this.getFacturas();
    } else {
      this.getSolicitudPago();
    }
  },
  data() {
    return {
      solicitudPagoMultas: [],
      facturaMultas: [],
      showModal: false,
      modalData: ''
    }
  },
  methods: {
    getSolicitudPago() {
      const AuthStr = 'Bearer '.concat(this.token);
      axios.get('http://localhost:3001/facturas', {headers: {Authorization: AuthStr}}).then(response => {
        console.log(response)
        this.solicitudPagoMultas = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    getTest() {
      return 'Hola'
    },
    getFacturas() {
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.profileData.sub;
      axios.get(`http://localhost:3001/facturas/${ID}`, {headers: {Authorization: AuthStr}}).then(response => {
        console.log(response)
        this.facturaMultas = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    toggleModal(data) {
      this.showModal = !this.showModal;
      if(data) {
        this.modalData = data;
      }
    }
  },
  computed: {
    ...mapGetters({
      profileData: 'stateProfile',
      token: 'isAuthenticated'
    })
  }
}
</script>
