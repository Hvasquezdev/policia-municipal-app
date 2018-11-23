<template>
<div class=" multas-section">
  <div class="hero is-success has-background-grey-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Listado de multas
        </h1>
        <h2 class="subtitle has-text-weight-light">
          Informate sobre las multas de transito actuales
        </h2>
      </div>
    </div>
  </div>

  <div class="container mt-5 mb-5">
    <div class="columns is-multiline">

      <div class="column is-12">
        <div class="pricing-table is-horizontal">

          <div class="pricing-plan is-dark table-active border" v-for="(multa, index) in multas" :key="index">
            <div class="plan-header">{{ multa.Nombre }}</div>
            <div class="plan-items">
              <p>
                {{ multa.Descripcion }}
              </p>
            </div>
            <div class="plan-footer">
              <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">Bs.s</span>{{ multa.Precio }}</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    this.getMultas();
  },
  data() {
    return {
      multas: []
    }
  },
  methods: {
    getMultas() {
      const URL = 'http://localhost:3001/multas';
      axios.get(URL).then(response => {
        this.multas = response.data;
      }).catch(error => {
        console.error(error);
      }); 
    }
  }
}
</script>


<style scoped>
@import '~/assets/css/multas.css';
.hero {
  padding-top: 53px;
}

.mt-5 {
  margin-top: 5rem;
}

.mb-5 {
  margin-bottom: 5rem;
}

.multas-section {
  background: radial-gradient(circle, #d7d7d7, #d7d7d7 1px, #fff 0, #fff);
  background-size: 28px 28px;
}

.plan-items {
  display: flex !important; 
  justify-content: center;
  align-items: center;
}
</style>
