<template>
<div class="column">
<div class="columns is-multiline">
  <div class="column is-12 container">
    <h2 class="title is-3">Lista de multas registradas</h2>
  </div>

  <div class="column is-12">
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
  </div>
</div>
</div>
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
