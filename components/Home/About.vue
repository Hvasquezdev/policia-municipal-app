<template>
  <section class="section" id="about-section">
    <div class="container">
      <div class="columns is-multiline">

        <div class="column is-12">
          <div class="blog-card is-width-100">
            <div class="meta">
              <div class="photo about1"></div>
            </div>
            <div class="description">
              <h2 class="has-text-weight-bold">Reseña historica de la institucion</h2>
              <p>
                El Instituto Autónomo de Policia del Municipio Heres se denomina Patrulleros de Angostura,
                creado mediante Ordenanza Municipal sancionada por el consejo municipal de Heres el 26 de septiembre del 2002. Esta es una insitución armada,
                de carácter civil, obediente y profesional, lo cual se manifiesta funcionalmente en su mando, personal, 
                dirección, estructura, cultura, estrategias, tacticas, equipamiento y dotacion. Siendo su finción 
                mantener la paz social, la seguridad de las personas y los bienes y, en general, velar por el acatamiento 
                del ordenamiento juridico nacional estadal y municipal y los principios fundamentales de la convivencia social.
              </p>
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="blog-card alt is-width-100">
            <div class="meta">
              <div class="photo about2"></div>
            </div>
            <div class="description">
              <h2 class="has-text-weight-bold">Mision</h2>
              <p>
                Coordinar y Promover acciones de prevención y seguridad involucrado a la comunidad 
                del municipio Heres y de conformidad con la Normativa vigente y Poder cumplir con 
                las leyes en general, Ordenanzas y Hacerlas cumplir.
              </p>
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="blog-card is-width-100">
            <div class="meta">
              <div class="photo about3"></div>
            </div>
            <div class="description">
              <h2 class="has-text-weight-bold">Vision</h2>
              <p>
                Ser organismo de una cultura en material de prevención y seguridad ciudadana, 
                Promocionando programas educativos dirigidos a la comunidad del Municipio Heres 
                y con presencia física en todo el ámbito municipal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from '@/components/Divider'
export default {
  components: {
    Divider
  }
}
</script>


<style lang="scss" scoped>

$color_white: #fff;
$color_prime: hsl(48, 100%, 67%);
$color_grey: #e2e2e2;
$color_grey_dark: #a2a2a2;

.section {
  background: radial-gradient(circle,#d7d7d7,#d7d7d7 1px,#fff 0,#fff);
  background-size: 28px 28px;
}

.is-width-100 {
  width: 100%;
  min-width: 100% !important;
}

.blog-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  margin: 1rem auto;
  border: 1px solid $color_prime;
  box-shadow: 0 3px 7px -1px rgba(#000, .1);
  margin-bottom: 1.6%;
  background: $color_white;
  line-height: 1.4;
  font-family: 'Hind', sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
  a {
    color: inherit;
    &:hover {
      color: $color_prime;
    }
  }
  &:hover {
    .photo {
      transform: scale(1.3) rotate(3deg);
    }
  }
  .meta {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  .photo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform .2s;
  }

  .about1 {
    background-image: url('~/static/about1.jpg') !important;
  }

  .about2 {
    background-image: url('~/static/about2.jpg') !important;
  }

  .about3 {
    background-image: url('~/static/about3.jpg') !important;
  }

  .description {
    padding: 1.3rem;
    background: $color_white;
    position: relative;
    z-index: 1;
    h2,
    h3 {
      font-family: Montserrat, sans-serif;
    }
    h2 {
      line-height: 1;
      margin: 0;
      font-size: 1.7rem;
    }
    h3 {
      font-size: 1rem;
      font-weight: 300;
      text-transform: uppercase;
      color: $color_grey_dark;
      margin-top: 5px;
    }
  }
  p {
    position: relative;
    margin: 1rem 0 0;
    margin-top: 30px !important;
    &:first-of-type {
      margin-top: 1.25rem;
      &:before {
        content: "";
        position: absolute;
        height: 5px;
        background: $color_prime;
        width: 35px;
        top: -1rem;
        border-radius: 3px;
      }
    }
  }


  @media (min-width: 640px) {
    flex-direction: row;
    max-width: 700px;
    .meta {
      flex-basis: 40%;
      height: auto;
    }
    .description {
      flex-basis: 60%;
      &:before {
        transform: skewX(-3deg);
        content: "";
        background: #fff;
        width: 30px;
        position: absolute;
        left: -10px;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
    &.alt {
      flex-direction: row-reverse;
      .description {
        &:before {
          left: inherit;
          right: -10px;
          transform: skew(3deg)
        }
      }
    }
  }
}
</style>
