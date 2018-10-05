<template>
  <div>
    <div class="hero is-bold is-fullheight" v-if="!tokenData">
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

                <form @submit.prevent="register">
                  <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left">
                      <input type="text" 
                              placeholder="Nombre" 
                              class="input is-medium" 
                              autofocus="" 
                              v-model="user.nombre"
                              v-validate="'required|alpha'" 
                              name="nombre" 
                              :class="{'is-danger': errors.first('nombre')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>

                    <div class="control is-expanded has-icons-left">
                      <input type="text" 
                              placeholder="Apellido" 
                              class="input is-medium" 
                              v-model="user.apellido"
                              v-validate="'required|alpha'" 
                              name="apellido" 
                              :class="{'is-danger': errors.first('apellido')}">
                      <span class="icon is-small is-left">
                        <i class="far fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="email" 
                              placeholder="Ingresa tu email" 
                              class="input is-medium" 
                              v-model="user.email"
                              v-validate="'required|email'" 
                              name="email" 
                              :class="{'is-danger': errors.first('email')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left">
                      <input type="number" 
                              placeholder="Cedula de identidad" 
                              class="input is-medium" 
                              v-model="user.cedula"
                              v-validate="'required|numeric'"
                              name="cedula"
                              :class="{'is-danger': errors.first('cedula')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-address-card"></i>
                      </span>
                    </div>

                    <div class="control is-expanded has-icons-left">
                      <input type="number" 
                              placeholder="Numero de telefono" 
                              class="input is-medium" 
                              v-model="user.telefono"
                              v-validate="'required|min:7|numeric'"
                              name="telefono"
                              :class="{'is-danger': errors.first('telefono')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-phone"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left">
                      <input type="number" 
                              placeholder="Licencia de conducir" 
                              class="input is-medium" 
                              v-model="user.licencia"
                              v-validate="'required|numeric'"
                              name="licencia"
                              :class="{'is-danger': errors.first('licencia')}">
                      <span class="icon is-small is-left">
                        <i class="far fa-address-card"></i>
                      </span>
                    </div>

                    <div class="control is-expanded has-icons-left">
                      <input type="text" 
                              placeholder="Placa del vehiculo" 
                              class="input is-medium" 
                              v-model="user.placa"
                              v-validate="'required|alpha_num'"
                              name="placa"
                              :class="{'is-danger': errors.first('placa')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-car"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="password" 
                              placeholder="Contraseña" 
                              class="input is-medium" 
                              v-model="user.pass"
                              v-validate="'required|min:6'"
                              name="password"
                              :class="{'is-danger': errors.first('password')}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <button class="button is-block is-success is-medium is-fullwidth" 
                            :disabled="errors.any() || !isValid || authStatus === 'loading' || authStatus === 'register_success'">
                      <span v-if="authStatus !== 'loading' && authStatus !== 'register_success'">Registrarse</span>
                      <i class="fas fa-spinner fa-pulse" v-if="authStatus == 'loading'"></i>
                      <span v-if="authStatus == 'register_success'">
                        <i class="far fa-check-circle"></i>
                        Registro exitoso, procesando...
                      </span>
                    </button>
                  </div>

                  <hr v-if="registerError">
                  <p class="help is-danger subtitle is-5 has-text-weight-normal" v-if="registerError">
                    {{ registerError.message }}
                  </p>
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

    <spinner-component v-if="tokenData"/>
  </div>
</template>

<script>
import SpinnerComponent from '@/components/Spinner'
import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  components: {
    SpinnerComponent
  },

  layout: 'login',

  mounted() {
    let tokenString = Cookie.get('user-data')
    if(typeof tokenString !== 'undefined'){
      this.$router.push('/');
    } else {
      this.tokenData = false;
    }
  },

  layout: 'login',

  data() {
    return {
      tokenData: true,
      user: {
        id_user: 0,
        nombre: '',
        apellido: '',
        rol: 'Usuario',
        estado: 'Activo',
        cedula: '',
        email: '',
        licencia: null,
        placa: '',
        telefono: null,
        pass: '',
      },
      registerError: ''
    }
  },

  methods: {
    register() {
      this.$validator.validateAll().then(res => {

        if (!res) { 
          alert('Rellene todos los campos');
          return;
        }

        this.$store.dispatch('REGISTER_USER', this.user).then(() => {
          if(this.authStatus === 'register_success') {
            this.registerError = '';
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        }).catch(err => {
          this.registerError = err;
        });
      });
    }
  },

  computed: {
    isValid() {
      return this.user.nombre && this.user.apellido && this.user.email && this.user.telefono && this.user.cedula && this.user.licencia && this.user.placa && this.user.pass
    },
    authStatus() {
      return this.$store.getters.authStatus
    } 
  }
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

