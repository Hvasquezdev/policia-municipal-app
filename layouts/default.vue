<template>
  <div>
    <NavbarComponent />
    <nuxt/>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/shared/Navbar'
import FooterComponent from '@/components/shared/Footer'

export default {
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>


<style>

</style>

