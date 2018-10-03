<template>
  <div class="column is-fullwidth">
    <h1 class="title">Editando a Nombre</h1>
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


    <div class="hollow-dots-spinner">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>
