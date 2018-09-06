<template>
  <footer class="footer has-background-dark">
    <div class="container">
      <div class="content has-text-centered has-text-white">
        <p>
          © <strong class="has-text-white">Policia Municipal</strong> 2018
        </p>

        <nav class="breadcrumb has-bullet-separator is-medium" aria-label="breadcrumbs">
          <ul>
            <li><a class="has-text-white">Inicio</a></li>
            <li><a class="has-text-white">Sobre nosotros</a></li>
            <li><a class="has-text-white">Servicios</a></li>
            <li><a class="has-text-white">Directiva</a></li>
            <li><a class="has-text-white">Multas</a></li>
          </ul>
        </nav>

        <p class="footer-social">
          <a href="#" class="icon has-text-white">
            <i class="fab fa-twitter-square"></i>
          </a>

          <a href="#" class="icon has-text-white">
            <i class="fab fa-facebook-square"></i>
          </a>

          <a href="#" class="icon has-text-white">
            <i class="fab fa-linkedin"></i>
          </a>

          <a href="#" class="icon has-text-white">
            <i class="fab fa-instagram"></i>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font-family: Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif !important;
  font-size: 90%;
  font-weight: 400;
  letter-spacing: 1px;

  .breadcrumb ul li {
    margin-top: 4px !important;
  }

  .breadcrumb ul {
    justify-content: center !important;
  }

  .footer-social {
    font-size: 30px;
  }

  .footer-social a.icon {
    margin: 0 10px !important;
  }

  .footer-social a:hover {
    color: black;
  }
}
</style>
