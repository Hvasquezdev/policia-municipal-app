<template>
  <div class="column is-fullwidth">
    <h1 class="title">Lista de multas recibidas</h1>
    <!-- <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <button class="button is-success" @click="generatePDF">Generar PDF</button>
        </div>
      </div>
      <div class="level-right">
      </div>
    </nav> -->

    <table class="table is-hoverable is-fullwidth" id="multasTable" v-if="facturas">
      <thead>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Estado</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(data, index) in facturas.factura" :key="index">
          <td>
            <strong>{{ index +1 }}</strong>
          </td>
          <td>
            {{ facturas.multa[index].Nombre }}
          </td>
          <td class="is-hidden-mobile">
            {{ data.Fecha_Emision.split('T')[0].split('-').reverse().join('-') }}
          </td>
          <td class="is-hidden-mobile">
            Bs.S {{ facturas.multa[index].Precio }}
          </td>
          <td>
            <span class="tag is-warning" v-if="data.Estado_Factura === 'Pendiente'">Pendiente</span>
            <span class="tag is-danger" v-if="data.Estado_Factura === 'Activa'">Multa activa</span>
            <span class="tag is-danger" v-if="data.Estado_Factura === 'Rechazado'">Rechazado</span>
            <span class="tag is-success" v-if="data.Estado_Factura === 'Correcto'">Pagada</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="notification" v-else>
      No se han realizado multas
    </div>
    <hr>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <a class="pagination-previous" title="Esta es la primera pagina" disabled>Anterior</a>
      <a class="pagination-next is-static" title="No hay mas paginas" disabled>Siguiente</a>
      <ul class="pagination-list">
        <li><a class="pagination-link is-current">1</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.getSolicitudPago();
  },
  data() {
    return {
      search: '',
      facturas: [],
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      mesActual: new Date().toLocaleDateString().split('/')[1].split('')[0] == '0' ? new Date().toLocaleDateString().split('/')[1].split('')[1] : new Date().toLocaleDateString().split('/')[1],
      messs: '01'
    }
  },
  methods: {
    getSolicitudPago() {
      const AuthStr = 'Bearer '.concat(this.token);
      const ID = this.profileData.sub;
      axios.get(`http://localhost:3001/facturas/${ID}`, {headers: {Authorization: AuthStr}}).then(response => {
        console.log(response)
        this.facturas = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    generatePDF() {
      this.$myInjectedFunction(this.facturas)
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
