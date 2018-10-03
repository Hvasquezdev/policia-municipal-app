<template>
<div class="section">
  <div class="columns is-multiline" v-if="tokenData">
    <div class="column is-12-tablet is-3-desktop is-2-widescreen has-background-light">
      <nav class="menu">
        <p class="menu-label">
          Menu
        </p>

        <ul class="menu-list">
          <li>
            <nuxt-link to="/dashboard">
              <span class="icon">
                <i class="fas fa-tachometer-alt"></i>
              </span>
              Dashboard
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/dashboard/users">
              <span class="icon">
                <i class="fas fa-users"></i>
              </span>
              Usuarios
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/dashboard/multas">
              <span class="icon">
                <i class="far fa-list-alt"></i>
              </span>
              Multas
            </nuxt-link>
          </li>
        </ul>
      </nav>
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
</style>
