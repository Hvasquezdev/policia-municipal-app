<template>
<div class="column is-fullwidth">
  <h1 class="title">Lista de multas registradas</h1>
  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle">
          <strong>{{ multas.length }}</strong> Multas
        </p>
      </div>

      <p class="level-item">
        <router-link to="/dashboard" class="button is-success" href="#">Registrar multa</router-link>
      </p>
    </div>
    <div class="level-right">
    </div>
  </nav>

  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Multa</th>
        <th class="is-hidden-mobile">Descripcion</th>
        <th>Precio</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>ID</th>
        <th>Multa</th>
        <th class="is-hidden-mobile">Descripcion</th>
        <th>Precio</th>
        <th>Opciones</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="(multa, index) in multas" :key="index">
        <td>
          <strong>{{ index +1 }}</strong>
        </td>
        <td>
          {{ multa.Nombre }}
        </td>
        <td class="is-hidden-mobile">
          {{ multa.Descripcion }}
        </td>
        <td>
          Bs.S {{ multa.Precio }}
        </td>
        <td>
          <button class="button is-warning is-small">Editar</button>
        </td>
      </tr>
    </tbody>
  </table>

  <spinner-component v-if="multas.length == 0"/>
</div>

  <!-- <div class="column is-12">
    <div class="pricing-table is-horizontal">

      <div class="pricing-plan is-warning table-active border" v-for="(multa, index) in multas" :key="index">
        <div class="plan-header">{{ multa.Nombre }}</div>
        <div class="plan-items">
          <div class="plan-item">{{ multa.Descripcion }}</div>
        </div>
        <div class="plan-footer">
          <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">Bs.s</span>{{ multa.Precio }}</span></div>
          <button class="button is-fullwidth">Editar</button>
        </div>
      </div>

    </div>
  </div> -->
</template>

<!-- Script With JavaScript -->
<script>
import SpinnerComponent from '@/components/Spinner'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    const AuthStr = 'Bearer '.concat(this.token);
    const URL = 'http://localhost:3001/multas';
    axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
      this.multas = response.data;
    }).catch(error => {
      console.error(error);
    });   
  },
  data() {
    return {
      multas: []
    }
  },
  computed: {
    ...mapGetters({
      token: 'isAuthenticated'
    })
  }
}
</script>


<style lang="scss" scoped>
@import '../../assets/css/multas.css';

.plan-items {
  columns: auto !important;
  column-gap: 0 !important;

  .plan-item {
    overflow-wrap: break-word !important;
  }
}
</style>
