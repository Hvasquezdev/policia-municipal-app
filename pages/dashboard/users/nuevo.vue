<template>
  <div class="column is-fullwidth">
    <h1 class="title">
      Registrando nuevo usuario
    </h1>

    <hr>

    <form @submit.prevent="register">
      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Nombre" 
                  class="input is-medium" 
                  autofocus="" 
                  v-model="user.nombre"
                  v-validate="'required|alpha'" 
                  name="nombre" 
                  :class="{'is-danger': errors.first('nombre')}">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>

        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Apellido" 
                  class="input is-medium" 
                  v-model="user.apellido"
                  v-validate="'required|alpha'" 
                  name="apellido" 
                  :class="{'is-danger': errors.first('apellido')}">
          <span class="icon is-small is-left">
            <i class="far fa-user"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input type="email" 
                  placeholder="Ingresa tu email" 
                  class="input is-medium" 
                  v-model="user.email"
                  v-validate="'required|email'" 
                  name="email" 
                  :class="{'is-danger': errors.first('email')}">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Cedula de identidad" 
                  class="input is-medium" 
                  v-model.number="user.cedula"
                  v-validate="'required|numeric'"
                  name="cedula"
                  :class="{'is-danger': errors.first('cedula')}">
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
        </div>

        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Numero de telefono" 
                  class="input is-medium" 
                  v-model.number="user.telefono"
                  v-validate="'required|min:7|numeric'"
                  name="telefono"
                  :class="{'is-danger': errors.first('telefono')}">
          <span class="icon is-small is-left">
            <i class="fas fa-phone"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Licencia de conducir" 
                  class="input is-medium" 
                  v-model.number="user.licencia"
                  v-validate="'required|numeric'"
                  name="licencia"
                  :class="{'is-danger': errors.first('licencia')}">
          <span class="icon is-small is-left">
            <i class="far fa-address-card"></i>
          </span>
        </div>

        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Placa del vehiculo" 
                  class="input is-medium" 
                  v-model="user.placa"
                  v-validate="'required|alpha_num'"
                  name="placa"
                  :class="{'is-danger': errors.first('placa')}">
          <span class="icon is-small is-left">
            <i class="fas fa-car"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input type="password" 
                  placeholder="Contraseña" 
                  class="input is-medium" 
                  v-model="user.pass"
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{'is-danger': errors.first('password')}">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-block is-success is-medium is-fullwidth" 
                  :disabled="errors.any() || !isValid || authStatus === 'loading' || authStatus === 'register_success'">
            <span v-if="authStatus !== 'loading' && authStatus !== 'register_success'">Registrar usuario</span>
            <i class="fas fa-spinner fa-pulse" v-if="authStatus == 'loading'"></i>
            <span v-if="authStatus == 'register_success'">
              <i class="far fa-check-circle"></i>
              Registro exitoso, procesando...
            </span>
          </button>
        </div>

        <div class="control">
          <a class="button is-medium is-warning" @click="$router.push('/dashboard/users')">
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
      user: {
        id_user: 0,
        nombre: '',
        apellido: '',
        rol: 'Usuario',
        estado: 'Activo',
        cedula: '',
        email: '',
        licencia: null,
        placa: '',
        telefono: null,
        pass: '',
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

        this.$store.dispatch('REGISTER_USER', this.user).then(() => {
          if(this.authStatus === 'register_success') {
            this.registerError = '';
            setTimeout(() => {
              this.$router.push('/dashboard/users');
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
      return this.user.nombre && this.user.apellido && this.user.email && this.user.telefono && this.user.cedula && this.user.licencia && this.user.placa && this.user.pass
    },
    authStatus() {
      return this.$store.getters.authStatus
    } 
  }
}
</script>

<!-- Styles With SCSS -->
<style lang="scss" scoped>

</style>