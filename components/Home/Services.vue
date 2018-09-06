<template>
  <section class="section" id="service-section">
    <div class="container has-text-centered">
      <h2 class="title has-text-weight-normal has-text-white">Servicios a la comunidad</h2>  
      
      <div class="columns is-multiline is-flex">
        <div class="column is-4-widescreen is-12-mobile is-6-tablet">
          <div class="box box-service">
            <article class="media">
              <div class="media-left">
                <i class="fas fa-caret-right"></i>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>                    
                    Proteger el libre ejercicio de los derechos humanos, 
                    las libertades públicas y la paz social.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column is-4">
          <div class="box box-service">
            <article class="media">
              <div class="media-left">
                <i class="fas fa-caret-right"></i>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    Prevenir la comisión de delitos.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column is-4-widescreen is-12-mobile is-6-tablet">
          <div class="box box-service">
            <article class="media">
              <div class="media-left">
                <i class="fas fa-caret-right"></i>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    Apoyar el cumplimiento de las decisiones de autoridad competente.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column is-4-widescreen is-12-mobile is-6-tablet">
          <div class="box box-service">
            <article class="media">
              <div class="media-left">
                <i class="fas fa-caret-right"></i>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    Controlar y vigilar las vías de circulación y el tránsito.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column is-4-widescreen is-12-mobile is-6-tablet">
          <div class="box box-service">
            <article class="media">
              <div class="media-left">
                <i class="fas fa-caret-right"></i>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    Facilitar la resolución de conflictos mediante el diálogo, la mediación y la conciliación.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  background-image: url('~/assets/services-fondo.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.box-service {
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(10, 10, 10, 0.15);
  border: 1px solid hsl(48, 100%, 67%);
  transition-duration: .3s;

  &:hover {
    -webkit-transform: scale(1.02) rotate(1.2deg);
    transform: scale(1.02) rotate(1.2deg);
    -webkit-box-shadow: 0 1px 5px rgba(36, 36, 36, 0.2);
            box-shadow: 0 1px 5px rgba(36, 36, 36, 0.2);
  }

  .content p {
    font-size: 18px;
  }
}
</style>
