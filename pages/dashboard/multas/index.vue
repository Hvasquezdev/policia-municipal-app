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
        <router-link to="/dashboard/multas/nueva" class="button is-success" href="#">Registrar multa</router-link>
      </p>
    </div>
    <div class="level-right">
    </div>
  </nav>

  <div class="notification is-danger-outlined" v-if="deleteMsg">
    <button class="delete" @click="deleteMsg = !deleteMsg"></button>
    ¿Seguro que desea eliminar la multa de: <strong>{{ multaSelec.nombre }}</strong>?
    <div class="buttons" style="margin-top: 10px;">
      <button class="button is-danger is-outlined" @click="deleteMulta(multaSelec.id)">
        <span>Eliminar</span>
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
      </button>
      <button class="button is-success is-outlined" @click="deleteMsg = !deleteMsg">
        <span>Cancelar</span>
        <span class="icon is-small">
          <i class="fas fa-check"></i>
        </span>
      </button>
    </div>
  </div>

  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>Multa</th>
        <th class="is-hidden-mobile">Descripcion</th>
        <th>Precio</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>#</th>
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
          <div class="buttons">
            <router-link :to="{ path: `/dashboard/multas/${multa.ID}`}" class="button is-warning is-small">Editar</router-link>
            <button class="button is-danger is-small" @click="setSelectedMulta(multa.ID, multa.Nombre)" :disabled="deleteMsg">Eliminar</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <hr>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" title="Esta es la primera pagina" disabled>Anterior</a>
    <a class="pagination-next is-static" title="No hay mas paginas" disabled>Siguiente</a>
    <ul class="pagination-list">
      <li><a class="pagination-link is-current">1</a></li>
    </ul>
  </nav>
  <spinner-component v-if="multas.length == 0"/>
</div>
</template>

<!-- Script With JavaScript -->
<script>
import SpinnerComponent from '@/components/Spinner'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: {
    SpinnerComponent
  },
  mounted() {
    this.getMultas();
  },
  data() {
    return {
      multas: [],
      deleteMsg: false,
      multaSelec: {
        id: null,
        nombre: ''
      }
    }
  },
  methods: {
    setSelectedMulta(id, nombre) {
      this.multaSelec.id = id;
      this.multaSelec.nombre = nombre;
      this.deleteMsg = true;
    },
    deleteMulta(id) {
      const AuthStr = 'Bearer '.concat(this.token);
      const URL = `http://localhost:3001/multas/${id}`;
      axios.delete(URL, { headers: { Authorization: AuthStr } }).then(response => {
        this.deleteMsg = false;
        this.multaSelec = {
          id: null,
          nombre: ''
        }
        this.getMultas();
      }).catch(error => {
        console.error(error);
      });  
    },
    getMultas() {
      const AuthStr = 'Bearer '.concat(this.token);
      const URL = 'http://localhost:3001/multas';
      axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
        this.multas = response.data;
      }).catch(error => {
        console.error(error);
      }); 
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
.is-danger-outlined {
  border: 2px solid hsl(348, 100%, 61%);
}
</style>
