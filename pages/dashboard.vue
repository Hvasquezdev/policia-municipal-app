<template>
<div class="section">
  <div class="columns is-multiline" v-if="tokenData">
    <div class="column is-12-tablet is-3-desktop is-2-widescreen has-background-light">
      <aside class="menu">
        <p class="menu-label">
          Menu
        </p>

        <ul class="menu-list">
          <li>
            <nuxt-link to="/dashboard" exact-active-class="is-active">
              <span class="icon">
                <i class="fas fa-tachometer-alt"></i>
              </span>
              Dashboard
            </nuxt-link>
          </li>
          <li v-if="tokenData.rol === 'Administrador'">
            <nuxt-link to="/dashboard/users" exact-active-class="is-active">
              <span class="icon">
                <i class="fas fa-users"></i>
              </span>
              Usuarios
            </nuxt-link>
          </li>
          <li v-if="tokenData.rol === 'Usuario'">
            <nuxt-link to="/dashboard/perfil" exact-active-class="is-active">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              Perfil
            </nuxt-link>
          </li>
          <li v-if="tokenData.rol === 'Administrador'">
            <nuxt-link to="/dashboard/multas" exact-active-class="is-active">
              <span class="icon">
                <i class="far fa-list-alt"></i>
              </span>
              Multas Registradas
            </nuxt-link>
          </li>
          <li v-if="tokenData.rol === 'Administrador'">
            <nuxt-link to="/dashboard/multasRealizadas" exact-active-class="is-active">
              <span class="icon">
                <i class="far fa-list-alt"></i>
              </span>
              Multas Realizadas
            </nuxt-link>
          </li>
          <li v-if="tokenData.rol === 'Usuario'">
            <nuxt-link to="/dashboard/multasRecibidas" exact-active-class="is-active">
              <span class="icon">
                <i class="far fa-list-alt"></i>
              </span>
              Multas Recibidas
            </nuxt-link>
          </li>
        </ul>
      </aside>
    </div> 
    <nuxt-child />
  </div>

  <spinner-component v-if="!tokenData"/>
</div>
</template>

<script>
import SpinnerComponent from '@/components/Spinner'
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  components: {
    SpinnerComponent
  },
  mounted() {
    let tokenString = Cookie.get('user-data')
    if(typeof tokenString !== 'undefined'){
      const tokenData = JSON.parse(tokenString)
      this.setTokenData(tokenData)
    } else {
      this.setTokenData(null)
      this.$router.push('/')
    }
  },
  layout: 'default',
  methods: {
    setTokenData(tokenData) { this.$store.dispatch('TOKEN_DATA', tokenData) }
  },
  computed: {
    ...mapGetters({
      tokenData: 'stateProfile'
    })
  }
}
</script>


<style lang="scss" scoped>
.section {
  padding-top: 100px;
}

.is-active-link {
  background: red !important;
}
</style>
