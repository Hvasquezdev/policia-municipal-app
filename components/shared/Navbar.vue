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
            <a v-scroll-to="'#about-section'" class="navbar-item" href="#">
              Sobre nosotros
            </a>
            <a v-scroll-to="'#service-section'" class="navbar-item" href="#">
              Servicios
            </a>
            <a v-scroll-to="'#directiva-section'" class="navbar-item" href="#">
              Directiva
            </a>
            <a class="navbar-item" href="#">
              Multas
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="bd-tw-button button is-warning is-outlined" href="#">
                    <span class="icon">
                      <i class="fas fa-sign-in-alt"></i>
                    </span>
                    <span>
                      Ingresar
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navActive: false
    }
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
