<template>
  <div>
    <div class="hero is-bold is-fullheight">
      <div class="bg-dark"></div>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-multiline">+
            <div class="column is-12-mobile">
              <div class="content">
                <h3 class="has-text-weight-light title is-4 has-text-white">Caracteristicas</h3>
                <ul class="has-text-light">
                  <li>Paga tus multas</li>
                  <li>Informate de las diferentes normativas</li>
                  <li>Busca las multas y sus precios</li>
                </ul>
              </div>
            </div>

            <div class="column is-7 is-12-mobile has-text-centered">
              <h2 class="title is-3 has-text-weight-normal has-text-white">Registrate</h2>
              <p class="subtitle has-text-light">Por favor ingresa todos tus datos para continuar</p>

              <div class="box">
                <figure class="avatar">
                  <img src="https://image.flaticon.com/icons/svg/149/149452.svg">
                </figure>

                <form>
                  <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left">
                      <input type="text" placeholder="Nombre" class="input is-medium" autofocus="">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>

                    <div class="control is-expanded has-icons-left">
                      <input type="text" placeholder="Apellido" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="far fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="email" placeholder="Ingresa tu email" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="number" placeholder="Cedula de identidad" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="fas fa-address-card"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left">
                      <input type="number" placeholder="Licencia de conducir" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="far fa-address-card"></i>
                      </span>
                    </div>

                    <div class="control is-expanded has-icons-left">
                      <input type="text" placeholder="Placa del vehiculo" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="fas fa-car"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="password" placeholder="Contraseña" class="input is-medium">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <button class="button is-block is-success is-fullwidth">
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
                <p class="has-text-weight-semibold">
                  <nuxt-link to="/login" class="has-text-warning">Iniciar Sesion</nuxt-link> &nbsp;·&nbsp;
                  <nuxt-link to="/" class="has-text-warning">Volver al Inicio</nuxt-link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login'
}
</script>

<style lang="scss" scoped>
.hero {

  position: relative;
  background-image: url('~/assets/fondo-policia-min.jpg') !important;

  .bg-dark {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: hsla(0, 0%, 21%, 0.63);
  }

  .hero-body {
    position: relative;
    z-index: 10;
  }

  .box {
    margin-top: 5rem;
  }

  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;

    img {
      padding: 5px;
      width: 128px;
      height: 128px;
      background: #fff;
      border-radius: 50%;
      -webkit-box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(10,10,10,.1);
      box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(10,10,10,.1);
    }
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 300;

    .subtitle {
      padding-top: 1rem;
    }
  }
}
</style>

