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
          <router-link to="/dashboard" class="button is-success" href="#">Registrar Usuario</router-link>
        </p>

        <div class="level-item is-hidden-tablet-only">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Cedula, Email">
            </p>
            <p class="control">
              <button class="button is-outlined is-info">
                Buscar
              </button>
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
        <tr v-for="(user, index) in users" :key="index">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <spinner-component v-if="users.length == 0"/>
  </div>
</template>

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
      users: []
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
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
