<template>
  <div v-if="showPage === true">
    <div class="hero is-bold is-fullheight">
      <div class="bg-dark"></div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-multiline">
            <div class="column is-6 is-offset-3">
              <h2 class="title is-3 has-text-weight-normal has-text-white">Ingresar</h2>
              <p class="subtitle has-text-light">Por favor inicia sesion para continuar</p>

              <div class="box">
                <figure class="avatar">
                  <img src="https://image.flaticon.com/icons/svg/149/149452.svg">
                </figure>

                <form @submit.prevent="login">
                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="email" 
                              placeholder="Ingresa tu email" 
                              class="input is-large" 
                              autofocus="" 
                              v-model="user.email"
                              v-validate="'required|email'"
                              name="loginEmail"
                              :class="{'is-danger': errors.first('loginEmail') || authStatus === 401}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input type="password" 
                              placeholder="Contraseña" 
                              class="input is-large" 
                              v-model="user.password"
                              v-validate="'required'"
                              name="loginPass"
                              :class="{'is-danger': errors.first('loginPass') || authStatus === 401}">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <button class="button is-block is-success is-medium is-fullwidth" :disabled="errors.any() || !isValid || authStatus == 'loading'">
                      Iniciar Sesion
                    </button>
                  </div>
                </form>
              </div>
                <p class="has-text-weight-semibold">
                  <nuxt-link to="/register" class="has-text-warning">Registrate</nuxt-link> &nbsp;·&nbsp;
                  <a href="#" class="has-text-warning">Recuperar Contraseña</a> &nbsp;·&nbsp;
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
import Cookie from 'js-cookie'

export default {
  created() {
    let token = Cookie.get('user-token')
    let tokenData = Cookie.get('user-data')
    if(typeof tokenData !== 'undefined' || typeof token !== 'undefined') {
      this.$router.push('/')
    } else {
      this.showPage = true
    }
  },

  layout: 'login',

  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      showPage: false
    }
  },

  methods: {
    login() {
      this.$validator.validateAll().then(res => {
        if(!res) {
          alert('Rellene todos los campos')
          return
        } 
        this.$store.dispatch('AUTH_REQUEST', {email: this.user.email, password: this.user.password}).then(() => {
          if(this.authStatus === 'success') {
            this.$router.push('/')
          }
        })
      })
    }
  },

  computed: {
    isValid() {
      return this.user.email && this.user.password
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

