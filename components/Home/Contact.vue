<template>
  <section class="section has-background-dark is-medium" id="service-section">
    <div class="container has-text-centered">
      <h2 class="title has-text-weight-normal has-text-white">Contactanos</h2>  

      <div class="columns is-multiline">
        <div class="column">
          <div class="box box-contact">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered">
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <strong>Email:</strong>
                    <br>
                    Correo@correo.com
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column">
          <div class="box box-contact">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered">
                    <span class="icon">
                      <i class="fas fa-phone"></i>
                    </span>
                    <strong>Telefono:</strong>
                    <br>
                    0285-xxxxxxx
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="column">
          <div class="box box-contact">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered">
                    <span class="icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                    <strong>Encuentranos en:</strong>
                    <br>
                    Av. España, Frente a la farmacia España
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
  background-image: url('~/assets/mapa2.png');
  background-position: center;
  
  background-repeat: no-repeat;
}

.box-contact {
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

@import '~/assets/css/tooltip.css';
</style>
