<template>
  <div class="column is-fullwidth">
    <h1 class="title">
      Editando multa
    </h1>

    <hr>

    <form @submit.prevent="editMulta">
      <div class="field is-grouped">
        <div class="control is-expanded has-icons-left">
          <input type="text" 
                  placeholder="Nombre" 
                  class="input is-medium" 
                  autofocus="" 
                  v-model="multa.Nombre"
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
                  v-model.number="multa.Precio"
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
                    v-model="multa.Descripcion"
                    v-validate="'required|alpha_spaces'" 
                    name="descripcion" 
                    :class="{'is-danger': errors.first('descripcion')}"></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-block is-success is-medium is-fullwidth" 
                  :disabled="errors.any() || !isValid || editStatus === 'loading' || editStatus === 'edit_success' || fields.descripcion.dirty == false && fields.nombre.dirty == false && fields.precio.dirty == false">
            <span v-if="editStatus !== 'loading' && editStatus !== 'edit_success'">Guardar cambios</span>
            <i class="fas fa-spinner fa-pulse" v-if="editStatus == 'loading'"></i>
            <span v-if="editStatus == 'edit_success'">
              <i class="far fa-check-circle"></i>
              Multa actualizada, procesando...
            </span>
          </button>
        </div>

        <div class="control">
          <a class="button is-medium is-warning" @click="$router.push('/dashboard/multas')">
            Cancelar
          </a>
        </div>
      </div>

      <hr v-if="editError">
      <div class="notification is-danger" v-if="editError">
        <p class="help is-danger subtitle is-5 has-text-weight-normal">
          {{ editError }}
        </p>
      </div>

    </form>
  </div>
</template>

<!-- Script With JavaScript -->
<script>
import Cookie from 'js-cookie'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.getMulta();
  },
  data() {
    return {
      tokenData: true,
      multa: {
        Nombre: '',
        Precio: null,
        Descripcion: ``
      },
      editError: ''
    }
  },

  methods: {
    getMulta() {
      const routeParam = this.$router.history.current.params.edit;
      const AuthStr = 'Bearer '.concat(this.token);
      const URL = `http://localhost:3001/multas/${routeParam}`;
      axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
        this.oldmulta = response.data[0];
        this.multa = response.data[0];
        console.log(response.data[0])
      }).catch(error => {
        console.error(error);
      });
    },

    editMulta() {
      if(!this.isValid) {
        this.editError = 'Formulario invalido';
        return;
      } else {
        this.$validator.validateAll().then(response => {
          if(!response) {
            this.editError = 'Rellene todos los campos';
            return
          } 
          this.$store.dispatch('EDIT_MULTA_REQUEST', this.multa).then(() => {
            if(this.editStatus === 'edit_success') {
              this.editError = '';
              setTimeout(() => {
                this.$router.push('/dashboard/multas');
                this.$store.dispatch('STATUS_NONE');
              }, 2000);
            }
          }).catch(err => {
            this.editError = err.message;
          });
          
        }).catch(error => {
          console.error(error);
        });
      }
    }
  },

  computed: {
    isValid() {
      return this.multa.Nombre && this.multa.Precio && this.multa.Descripcion
    },
    ...mapGetters({
      editStatus: 'authStatus'
    })
  }
}
</script>