<template>
  <div class="column">
    <h1 class="title">Lista de Usuarios</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle">
            <strong>3</strong> Usuarios
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

    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Cedula</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Cedula</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>
            <strong>1</strong>
          </td>
          <td>
            Hector
          </td>
          <td>
            Vasquez
          </td>
          <td>
            <code>Hvasquezdev@gmail.com</code>
          </td>
          <td>
            26569960
          </td>
          <td>
            <div class="buttons">
              <a class="button is-small is-warning" href="edit-customer.html">Editar</a>
              <a class="button is-small is-danger delete-user">Borrar</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
