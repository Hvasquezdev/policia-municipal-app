<template>
  <div id="home">
    <section class="hero is-dark is-large top-banner" id="top-banner">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-weight-bold is-size-2-tablet">
            Instituto Autonomo de Policia Municipal
          </h1>
          <h2 class="subtitle has-text-weight-light is-size-3-tablet">
            Patrulleros de Angostura
          </h2>
        </div>
      </div>
    </section>

    <AboutComponent />

    <ContactComponent />

    <DirectivaComponent />

  </div>
</template>

<script>
import AboutComponent from '@/components/Home/About'
import ContactComponent from '@/components/Home/Contact'
import DirectivaComponent from '@/components/Home/Directiva';

export default {
  components: {
    AboutComponent,
    ContactComponent,
    DirectivaComponent
  }
}
</script>

<style>
  .hero.top-banner {
    font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif !important;
    background-image: url('~/assets/fondo-policia-2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 769px){
    .hero.is-large .hero-body {
        padding-bottom: 14rem;
        padding-top: 14rem;
    }
  }
</style>

