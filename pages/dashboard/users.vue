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
              <a class="button is-small is-warning">Editar</a>
              <a class="button is-small is-danger delete-user">Borrar</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="hollow-dots-spinner" v-if="users.length == 0">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    axios.get('http://localhost:3001/').then(response => this.users = response.data)
  },
  data() {
    return {
      users: []
    }
  }
}
</script>

<style lang="scss" scoped>
.hollow-dots-spinner, .hollow-dots-spinner * {
  box-sizing: border-box;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 50px;
}

.hollow-dots-spinner {
  height: 15px;
  width: calc(30px * 3);
}

.hollow-dots-spinner .dot {
  width: 15px;
  height: 15px;
  margin: 0 calc(15px / 2);
  border: calc(15px / 5) solid hsl(141, 71%, 48%);
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);

}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
