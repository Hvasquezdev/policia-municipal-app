<template>
  <div class="column is-fullwidth">
    <h1 class="title">Lista de multas realizadas</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle">
            Buscar multa
          </p>
        </div>

        <div class="level-item">
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Usuario" v-model="search">
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="select">
            <select >
              <option v-for="(mes, index) in meses" :key="index" :value="index+1">{{ mes }}</option>
            </select>
          </div>
        </div>
        
        <div class="level-item">
          <button class="button is-success" @click="generatePDF">Generar PDF</button>
        </div>
      </div>
    </nav>

    <table class="table is-hoverable is-fullwidth" v-if="facturas">
      <thead>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th>Usuario</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th>Usuario</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Estado</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(data, index) in filterUser" :key="index">
          <td>
            <strong>{{ index +1 }}</strong>
          </td>
          <td>
            {{ data.multa.Nombre }}
          </td>
          <td>
            {{ data.user.nombre }}
          </td>
          <td class="is-hidden-mobile">
            {{ data.factura.Fecha_Emision.split('T')[0].split('-').reverse().join('-') }}
          </td>
          <td class="is-hidden-mobile">
            Bs.S {{ data.multa.Precio }}
          </td>
          <td>
            <span class="tag is-warning" v-if="data.factura.Estado_Factura === 'Pendiente'">Pendiente por revisar</span>
            <span class="tag is-danger" v-if="data.factura.Estado_Factura === 'Activa'">Multa activa</span>
            <span class="tag is-success" v-if="data.factura.Estado_Factura === 'Correcto'">Pagada</span>
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
      multasData: [],
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      mesActual: new Date().toLocaleDateString().split('/')[1].split('')[0] == '0' ? new Date().toLocaleDateString().split('/')[1].split('')[1] : new Date().toLocaleDateString().split('/')[1],
      messs: '01'
    }
  },
  methods: {
    getSolicitudPago() {
      const AuthStr = 'Bearer '.concat(this.token);
      axios.get('http://localhost:3001/facturas', {headers: {Authorization: AuthStr}}).then(response => {
        for(let i = 0; i < response.data.factura.length; i++) {
          this.facturas.push(
            {
              factura: {...response.data.factura[i]},
              multa: response.data.multa[i],
              user: response.data.user[i]
            }
          )
        }
        console.log(this.multasData)
        // this.facturas = response.data
      }).catch(error => {
        console.error(error);
      });
    },
    generatePDF() {
      this.$myInjectedFunction()
    }
  },
  computed: {
    ...mapGetters({
      profileData: 'stateProfile',
      token: 'isAuthenticated'
    }),
    filterUser() {
      return this.facturas.filter((factura) => {
        return factura.user.nombre.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
}
</script>
