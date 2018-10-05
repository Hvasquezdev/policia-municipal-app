<template>
  <header class="main-navbar-container">
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item" href="#">
            <img src="@/assets/logo-policia.png" alt="Policia Municipal de Angostura">
            Policia Municipal
          </nuxt-link>
          <div class="navbar-burger burger" data-target="navbarMenuTarget" @click="navActive = !navActive">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarMenuTarget" class="navbar-menu" :class="{'is-active': navActive}">
          <div class="navbar-start">
            <nuxt-link to="/" v-scroll-to="'#about-section'" class="navbar-item" href="#">
              Sobre nosotros
            </nuxt-link>
            <nuxt-link to="/" v-scroll-to="'#service-section'" class="navbar-item" href="#">
              Servicios
            </nuxt-link>
            <nuxt-link to="/" v-scroll-to="'#directiva-section'" class="navbar-item" href="#">
              Directiva
            </nuxt-link>
            <nuxt-link to="/multas" class="navbar-item">
              Multas
            </nuxt-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable" v-if="tokenData">
              <a class="navbar-link">
                {{ tokenData.nombre }}
              </a>

              <div class="navbar-dropdown is-right">
                <nuxt-link to="/dashboard" class="navbar-item">
                  Perfil
                </nuxt-link>
                <hr class="navbar-divider">
                <a class="navbar-item has-text-danger" @click="logOut">
                  Cerrar Cesion
                </a>
              </div>
            </div>

            <div class="navbar-item" v-if="!tokenData">
              <div class="field">
                <div class="control">
                  <nuxt-link to="/login" class="bd-tw-button button is-success" href="#">
                    <span class="icon">
                      <i class="fas fa-sign-in-alt"></i>
                    </span>
                    <span>
                      Ingresar
                    </span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    const decodeToken = Cookie.get('user-data');
    const token = Cookie.get('user-token');
    if(typeof decodeToken !== 'undefined'){
      const tokenData = JSON.parse(decodeToken);
      this.setDecodeToken(tokenData);
      this.setToken(token);
    } else {
      this.setDecodeToken(null);
    }
  },
  data() {
    return {
      navActive: false,
      navStatus: false
    }
  },
  methods: {
    setDecodeToken(decodeToken) { this.$store.dispatch('TOKEN_DATA', decodeToken) },
    setToken(token) { this.$store.dispatch('SET_TOKEN', token) },
    logOut() { 
      this.$store.dispatch('AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      }) 
    }
  },
  computed: {
    ...mapGetters({
      tokenData: 'stateProfile'
    })
  }
}
</script>


<style lang="scss" scoped>
.main-navbar-container {
  position: absolute;
  width: 100%;
}

.navbar {
  box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);

  .navbar-brand {
    font-family: Kaushan Script, Helvetica Neue, Helvetica, Arial, cursive !important;
    font-size: 1.25rem;
    line-height: inherit;
  }

  .navbar-menu {
    font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif !important;
    font-size: 90%;
    font-weight: 400;
    letter-spacing: 1px;
  }
}

.dropdown {
  border: 1px solid transparent;
  border-radius: 5px;
}
</style>
