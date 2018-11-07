<template>
  <div class="column is-fullwidth">
    <h1 class="title">Lista de Usuarios</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle">
            <strong>{{ users.length }}</strong> Usuarios
          </p>
        </div>

        <p class="level-item">
          <router-link to="/dashboard/users/nuevo" class="button is-success">Registrar usuario</router-link>
        </p>

        <div class="level-item">
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Buscar: Nombre" v-model="search">
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
      </div>
    </nav>

    <table class="table is-hoverable is-fullwidth" v-if="users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th class="is-hidden-mobile">Email</th>
          <th class="is-hidden-mobile">Cedula</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th class="is-hidden-mobile">Email</th>
          <th class="is-hidden-mobile">Cedula</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(user, index) in filterUser" :key="index">
          <td>
            <strong>{{ index +1 }}</strong>
          </td>
          <td>
            {{ user.nombre }}
          </td>
          <td>
            {{ user.apellido }}
          </td>
          <td class="is-hidden-mobile">
            <code>{{ user.email }}</code>
          </td>
          <td class="is-hidden-mobile">
            {{ user.cedula }}
          </td>
          <td>
            <div class="buttons">
              <router-link :to="{ path: `/dashboard/users/${user.ID}`}" class="button is-small is-warning">Editar</router-link>
              <router-link :to="{ path: `/dashboard/factura/${user.ID}`}" class="button is-small is-danger">Multar</router-link>
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
    <spinner-component v-if="users.length == 0"/>
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
    this.getUsers();
  },
  data() {
    return {
      users: [],
      search: ''
    }
  },
  methods: {
    getUsers () {
      const AuthStr = 'Bearer '.concat(this.token);
      const URL = 'http://localhost:3001/';
      axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
        this.users = response.data;
      }).catch(error => {
        console.error(error);
      });
    }
  },
  computed: {
    ...mapGetters({
      token: 'isAuthenticated'
    }),
    filterUser() {
      return this.users.filter((user) => {
        return user.nombre.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
