<template>
  <div class="column is-fullwidth">
    <h1 class="title" v-if="user.data.ID">Editando a {{ user.data.nombre }} {{ user.data.apellido }} 
      <span class="tag" :class="{'is-warning': user.rol.nombre === 'Administrador', 'is-success': user.rol.nombre === 'Usuario'}">
        {{ user.rol.nombre }}
      </span>
    </h1>

    <form @submit.prevent="editUser" v-if="user.data.ID">
      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <label class="label">Nombre</label>
          <div class="control">
            <input type="text" 
                    placeholder="Nombre" 
                    class="input is-medium is-rounded" 
                    autofocus="" 
                    v-model="user.data.nombre"
                    v-validate="'required|alpha'" 
                    name="nombre" 
                    :class="{'is-danger': errors.first('nombre')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="control is-expanded has-icons-left">
          <label class="label">Apellido</label>
          <div class="control">
            <input type="text" 
                    placeholder="Apellido" 
                    class="input is-medium is-rounded" 
                    v-model="user.data.apellido"
                    v-validate="'required|alpha'" 
                    name="apellido" 
                    :class="{'is-danger': errors.first('apellido')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="far fa-user"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Correo Electronico</label>
        <div class="control has-icons-left">
          <input type="email" 
                  placeholder="Ingresa tu email" 
                  class="input is-medium is-rounded" 
                  v-model="user.data.email"
                  v-validate="'required|email'" 
                  name="email" 
                  :class="{'is-danger': errors.first('email')}"
                  :disabled="!editValues">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <label class="label">Cedula</label>
          <div class="control">
            <input type="number" 
                    placeholder="Cedula de identidad" 
                    class="input is-medium is-rounded" 
                    v-model="user.data.cedula"
                    v-validate="'required|numeric'"
                    name="cedula"
                    :class="{'is-danger': errors.first('cedula')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-address-card"></i>
            </span>
          </div>
        </div>

        <div class="control is-expanded has-icons-left">
          <label class="label">Numero de telefono</label>
          <div class="control">
            <input type="number" 
                    placeholder="Numero de telefono" 
                    class="input is-medium is-rounded" 
                    v-model="user.credentials.telefono"
                    v-validate="'required|min:7|numeric'"
                    name="telefono"
                    :class="{'is-danger': errors.first('telefono')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <label class="label">Licencia de conducir</label>
          <div class="control">
            <input type="number" 
                    placeholder="Licencia de conducir" 
                    class="input is-medium is-rounded" 
                    v-model="user.credentials.licencia"
                    v-validate="'required|numeric'"
                    name="licencia"
                    :class="{'is-danger': errors.first('licencia')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="far fa-address-card"></i>
            </span>
          </div>
        </div>

        <div class="control is-expanded has-icons-left">
          <label class="label">Placa del vehiculo</label>
          <div class="control">
            <input type="text" 
                    placeholder="Placa del vehiculo" 
                    class="input is-medium is-rounded" 
                    v-model="user.credentials.placa"
                    v-validate="'required|alpha_num'"
                    name="placa"
                    :class="{'is-danger': errors.first('placa')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-car"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <label class="label">Contraseña</label>
          <div class="control">
            <input type="password" 
                    placeholder="Contraseña" 
                    class="input is-medium is-rounded" 
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <div class="control is-expanded has-icons-left">
          <div class="control">
            <label class="label">Tipo de usuario</label>
            <div class="select is-rounded is-medium">
              <select :disabled="!editValues">
                <option :value="user.rol.nombre">{{ user.rol.nombre }}</option>
                <option value="Usuario" v-if="user.rol.nombre !== 'Usuario'">Usuario</option>
                <option value="Administrador" v-if="user.rol.nombre !== 'Administrador'">Administrador</option>
              </select>
              <span class="icon is-small is-left">
                <i class="fas fa-car"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <a class="button is-block is-warning is-medium is-fullwidth" 
                v-if="!editValues"
                @click="editValues = !editValues">
          <span>Editar Campos</span>
        </a>

        <button class="button is-block is-success is-medium is-fullwidth" 
                :disabled="errors.any() || !isValid"
                v-if="editValues">
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
      formError: '',
      editValues: false
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

  .label {
    padding-left: 5px !important;
  }
}
</style>
