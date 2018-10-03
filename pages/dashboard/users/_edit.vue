<template>
  <div class="column is-fullwidth">
    <h1 class="title" v-if="user.data.ID">Editando a {{ user.data.nombre }} {{ user.data.apellido }} <span class="tag is-warning">{{ user.rol.nombre }}</span></h1>

    <form @submit.prevent="editUser" v-if="user.data.ID">
      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Nombre" 
                  class="input is-medium is-rounded" 
                  autofocus="" 
                  v-model="user.data.nombre"
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
                  class="input is-medium is-rounded" 
                  v-model="user.data.apellido"
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
                  class="input is-medium is-rounded" 
                  v-model="user.data.email"
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
          <input type="number" 
                  placeholder="Cedula de identidad" 
                  class="input is-medium is-rounded" 
                  v-model="user.data.cedula"
                  v-validate="'required|numeric'"
                  name="cedula"
                  :class="{'is-danger': errors.first('cedula')}">
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
        </div>

        <div class="control is-expanded has-icons-left">
          <input type="number" 
                  placeholder="Numero de telefono" 
                  class="input is-medium is-rounded" 
                  v-model="user.credentials.telefono"
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
          <input type="number" 
                  placeholder="Licencia de conducir" 
                  class="input is-medium is-rounded" 
                  v-model="user.credentials.licencia"
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
                  class="input is-medium is-rounded" 
                  v-model="user.credentials.placa"
                  v-validate="'required|alpha_num'"
                  name="placa"
                  :class="{'is-danger': errors.first('placa')}">
          <span class="icon is-small is-left">
            <i class="fas fa-car"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <button class="button is-block is-success is-medium is-fullwidth" 
                :disabled="errors.any() || !isValid">
          <span>Guardar Cambios</span>
        </button>
      </div>

      <hr v-if="formError">
      <p class="help is-danger subtitle is-5 has-text-weight-normal" v-if="formError">
        {{ formError.message }}
      </p>
    </form>

    <spinner-component v-if="!user.data.ID"/>
  </div>
</template>

<script>
import SpinnerComponent from '@/components/Spinner'
import axios from 'axios'

export default {
  components: {
    SpinnerComponent
  },

  mounted() {
    this.getId();
  },

  data() {
    return {
      user: {
        "data":{
          "ID":null,
          "nombre":"",
          "apellido":"",
          "email":"",
          "pass":"",
          "cedula":null
        },
        "rol":{
          "ID":null,
          "nombre":"",
          "users_ID":null
        },
        "credentials":{
          "ID":null,
          "telefono":null,
          "licencia":null,
          "placa":"",
          "users_ID":null
        }
      },
      formError: ''
    }
  },

  methods: {
    getId() {
      let routeParam = this.$router.history.current.params.edit;
      axios.get(`http://localhost:3001/${routeParam}`).then(response => {
        this.user = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    editUser() {
      alert('Testing Function');
    }
  },

  computed: {
    isValid() {
      return this.user.data.nombre && this.user.data.apellido && this.user.data.email && 
      this.user.credentials.telefono && this.user.data.cedula && this.user.credentials.licencia && this.user.credentials.placa
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  .button {
    box-shadow: 0 4px 14px 0 rgba(35,209,96,.39)!important;
    border-radius: 7px;
    transition-duration: .3s;
    &:active {
      box-shadow: none !important;
    }
  }
}
</style>
