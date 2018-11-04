<template>
  <div class="column is-fullwidth">
    <h1 class="title">
      Registrando nueva multa
    </h1>

    <hr>

    <form @submit.prevent="register">
      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Nombre" 
                  class="input is-medium" 
                  autofocus="" 
                  v-model="multa.nombre"
                  v-validate="'required|alpha'" 
                  name="nombre" 
                  :class="{'is-danger': errors.first('nombre')}">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>

        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Precio" 
                  class="input is-medium" 
                  v-model.number="multa.precio"
                  v-validate="'required|numeric'" 
                  name="precio" 
                  :class="{'is-danger': errors.first('precio')}">
          <span class="icon is-small is-left">
            <i class="fas fa-money-bill-wave"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <textarea class="textarea is-medium" 
                    placeholder="Descripción de la multa"
                    v-model="multa.descripcion"
                    v-validate="'required|alpha_spaces'" 
                    name="descripcion" 
                    :class="{'is-danger': errors.first('descripcion')}"></textarea>
        </div>
      </div>

      <div class="field">
        <pre>
          {{multa}}
        </pre>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-block is-success is-medium is-fullwidth" 
                  :disabled="errors.any() || !isValid || authStatus === 'loading' || authStatus === 'register_success'">
            <span v-if="authStatus !== 'loading' && authStatus !== 'register_success'">Registrar multa</span>
            <i class="fas fa-spinner fa-pulse" v-if="authStatus == 'loading'"></i>
            <span v-if="authStatus == 'register_success'">
              <i class="far fa-check-circle"></i>
              Registro exitoso, procesando...
            </span>
          </button>
        </div>

        <div class="control">
          <a class="button is-medium is-warning" @click="$router.push('/dashboard/multas')">
            Cancelar
          </a>
        </div>
      </div>

      <hr v-if="registerError">
      <div class="notification is-danger" v-if="registerError">
        <p class="help is-danger subtitle is-5 has-text-weight-normal">
          {{ registerError.message }}
        </p>
      </div>

    </form>
  </div>
</template>

<!-- Script With JavaScript -->
<script>
import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  data() {
    return {
      tokenData: true,
      multa: {
        nombre: '',
        precio: null,
        descripcion: ``
      },
      registerError: ''
    }
  },

  methods: {
    register() {
      this.$validator.validateAll().then(res => {

        if (!res) { 
          this.registerError = 'Rellene todos los campos';
          return;
        }

        this.$store.dispatch('REGISTER_MULTA', this.multa).then(() => {
          if(this.authStatus === 'register_success') {
            this.registerError = '';
            setTimeout(() => {
              this.$router.push('/dashboard/multas');
            }, 2000);
          }
        }).catch(err => {
          this.registerError = err;
        });
      });
    }
  },

  computed: {
    isValid() {
      return this.multa.nombre && this.multa.precio && this.multa.descripcion
    },
    authStatus() {
      return this.$store.getters.authStatus
    } 
  }
}
</script>