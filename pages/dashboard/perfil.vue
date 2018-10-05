<template>
  <div class="column is-fullwidth">
    <h1 class="title" v-if="user.data.ID">Editando a {{ user.data.nombre }} {{ user.data.apellido }} 
      <span class="tag" :class="{'is-warning': user.rol.estado === 'Inactivo', 'is-success': user.rol.estado === 'Activo'}">
        {{ user.rol.estado }}
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

      <hr>

      <div class="field">
        <div class="control has-icons-left">
          <label class="label">Nueva Contraseña</label>
          <div class="control">
            <input type="password" 
                    placeholder="Escribe tu nueva contraseña" 
                    class="input is-medium is-rounded" 
                    v-validate="'required|alpha_num|min:7'"
                    v-model="user.data.newPass"
                    name="newPass"
                    :class="{'is-danger': errors.first('newPass')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <label class="label">Repite la nueva Contraseña</label>
          <div class="control">
            <input type="password" 
                    placeholder="Repite tu nueva contraseña" 
                    class="input is-medium is-rounded" 
                    v-model="confirmNewPass"
                    v-validate="'required|alpha_num|min:7'"
                    name="confirmNewPass"
                    :class="{'is-danger': confirmNewPass !== user.data.newPass && confirmNewPass || errors.first('confirmNewPass')}"
                    :disabled="!editValues">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <a class="button is-block is-warning is-medium is-fullwidth" 
                v-if="!editValues"
                @click="editValues = !editValues">
          <span>Editar Campos</span>
        </a>

        <div class="control">
          <button class="button is-block is-success is-medium" 
                  :disabled="errors.any() || !isValid"
                  v-if="editValues">
            <span>Guardar Cambios</span>
          </button>
        </div>


        <div class="control">
          <a class="button is-block is-warning is-medium" 
                  :disabled="errors.any() || !isValid"
                  v-if="editValues"
                  @click="editValues = !editValues">
            <span>Cancelar</span>
          </a>
        </div>

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
import { mapGetters } from 'vuex'

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
          "newPass": "",
          "cedula":null
        },
        "rol":{
          "ID":null,
          "nombre":"",
          "estado": "",
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
      editValues: false,
      confirmNewPass: ""
    }
  },

  methods: {
    getId() {
      let routeParam = this.tokenData.sub;
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
    },
    ...mapGetters({
      tokenData: 'stateProfile'
    })
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
