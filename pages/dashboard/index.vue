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
        <h2 class="title is-3 has-text-weight-normal">Solicitudes de pago vigentes</h2>
      </div>
  
      <div class="column is-12-tablet is-6-desktop is-4-fullhd" v-for="(multa, index) in solicitudPagoMultas.factura" :key="index" v-if="solicitudPagoMultas">
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
                  <span class="tag is-warning">{{ multa.Estado_Factura }}</span>
                </div>
              </div>
            </div>
  
            <a class="button is-success is-fullwidth" href="#">Confirmar pago</a>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.getFacturas();
  },
  data() {
    return {
      solicitudPagoMultas: []
    }
  },
  methods: {
    getFacturas() {
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
