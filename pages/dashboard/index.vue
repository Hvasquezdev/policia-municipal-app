<template>
  <div class="column">
    <div class="level">
      <div class="level-left">
        <h1 class="subtitle is-3">
          <span class="has-text-grey-light">Hola </span> <strong>Nombre Apellido </strong> <span class="tag is-warning">Administrador</span>
        </h1>
      </div>
    </div>
  
    <div class="columns is-multiline">
      <div class="column is-12-tablet is-6-widescreen">
        <div class="notification is-link has-text">
          <p class="title is-1">{{ solicitudPagoMultas.length }}</p>
          <p class="subtitle is-4">Solicitudes de pago</p>
        </div>
      </div>
  
      <div class="column is-12-tablet is-6-widescreen">
        <div class="notification is-success has-text">
          <p class="title is-1">{{ solicitudPagoMultas.length }}</p>
          <p class="subtitle is-4">Multas realizadas</p>
        </div>
      </div>
  
      <div class="column is-12-tablet is-6-desktop is-4-fullhd" v-for="(multa, index) in solicitudPagoMultas" :key="index">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              <a href="#">{{ multa.id }} </a> - <span class=" has-text-weight-normal">{{ multa.nombreUser }}</span>
            </h2>
  
            <div class="level">
              <div class="level-left">
                <div>
                  <p class="title is-5 is-marginless">
                    <span>{{ multa.nombre }}</span>
                  </p>
                  <small>
                    Multado el {{ multa.fecha }}
                  </small>
                </div>
              </div>
              <div class="level-right">
                <div class="has-text-right">
                  <p class="title is-5 is-marginless">
                    {{ multa.precio }}
                  </p>
                  <span class="tag is-warning">{{ multa.estado }}</span>
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
export default {
  data() {
    return {
      solicitudPagoMultas: [
        {
          id: 18231,
          nombreUser: 'Usuario',
          nombre: 'Multa de transito 1',
          fecha: '15 de Julio, 3:38pm',
          precio: `VEF 1.200.000,00`,
          estado: 'Pendiente' 
        },
        {
          id: 124123,
          nombreUser: 'Usuario 2',
          nombre: 'Multa de transito 2',
          fecha: '3 de marzo, 1:35pm',
          precio: `VEF 3.200.000,00`,
          estado: 'Pendiente' 
        },
        {
          id: 634123,
          nombreUser: 'Usuario 3',
          nombre: 'Multa de transito 3',
          fecha: '15 de enero, 11:30am',
          precio: `VEF 900.000,00`,
          estado: 'Pendiente' 
        }
      ]
    }
  }
}
</script>
