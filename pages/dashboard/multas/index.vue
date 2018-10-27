<template>
  <div class="column is-fullwidth">
    <h1 class="title">Lista de Usuarios</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle">
            <strong>1</strong> Usuarios
          </p>
        </div>

        <p class="level-item">
          <router-link to="/dashboard" class="button is-success" href="#">Registrar Usuario</router-link>
        </p>

        <div class="level-item is-hidden-tablet-only">
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

    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th>Usuario</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Multa</th>
          <th>Usuario</th>
          <th class="is-hidden-mobile">Fecha</th>
          <th class="is-hidden-mobile">Precio</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>
        <!-- <tr v-for="(user, index) in filterUser" :key="index">
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
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
