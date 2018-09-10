<template>
<div class="section">
  <div class="columns">
    <div class="column is-4-tablet is-3-desktop is-2-widescreen has-background-light">
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
</div>
</template>

<script>
export default {
  layout: 'default'
}
</script>


<style lang="scss" scoped>
.section {
  padding-top: 100px;
}
</style>
