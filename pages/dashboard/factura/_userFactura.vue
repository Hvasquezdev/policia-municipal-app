<template>
  <div class="column is-fullwidth">
    <h1 class="title" v-if="user.ID">Multando a {{ user.nombre }} {{ user.apellido }}: v-{{ user.cedula }} 
    </h1>

    <form @submit.prevent="sendInvoice" v-if="user.ID">
      <!-- Tipo de multa -->
      <div class="field">
        <div class="control has-icons-left">
          <div class="control">
            <label class="label">Selecciona la multa</label>
            <div class="select">
              <select v-model="factura.tipoMulta">
                <option disabled>Seleciona una multa</option>
                <option v-for="(multa, index) in multas" :key="index" :value="multa.ID">{{ multa.Nombre }}: Bs.S {{ multa.Precio }} </option>
              </select>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <!-- Fecha limite de pago -->
      <h3 class="subtitle">Fecha limite de la multa</h3>
      <div class="field has-addons">
        <div class="control has-icons-left is-expanded">
          <label class="label">Dia</label>
          <div class="control">
            <input class="input" type="number" placeholder="Escribe el dia en numero" min="1" max="31" v-model="factura.fechaLimite.dia">
            <span class="icon is-small is-left">
              <i class="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>

        <div class="control has-icons-left">
          <div class="control">
            <label class="label">Mes</label>
            <div class="select">
              <select v-model="factura.fechaLimite.mes">
                <option v-for="(mes, index) in meses" :key="index" :value="index+1">{{ mes }}</option>
              </select>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="control has-icons-left is-expanded">
          <label class="label">Año</label>
          <div class="control">
            <input class="input" type="number" placeholder="Año de la multa" min="2018" v-model="factura.fechaLimite.año">
            <span class="icon is-small is-left">
              <i class="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Mensaje que describa la multa -->
      <div class="field">
        <div class="control">
          <label class="label">Mensaje</label>
          <div class="control">
            <textarea class="textarea" placeholder="Mensaje para el usuario" v-model="factura.mensaje"></textarea>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button button-shadow is-block is-warning is-medium is-fullwidth">
            <span v-if="facturaStatus == ''">Completar multa</span>
            <i class="fas fa-spinner fa-pulse" v-if="facturaStatus == 'loading'"></i>
          </button>
        </div>
        <div class="control">
          <nuxt-link to="/dashboard/users" class="button button-shadow is-block is-dark is-medium is-fullwidth">
            <span>cancelar</span>
          </nuxt-link>
        </div>
      </div>

      <hr v-if="formError">
      <p class="help is-danger subtitle is-5 has-text-weight-normal" v-if="formError">
        {{ formError.message }}
      </p>
    </form>

    <spinner-component v-if="!user.ID"/>
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
    this.getMultas();
  },

  data() {
    return {
      user: {
        "ID":null,
        "nombre":"",
        "apellido":"",
        "email":"",
        "pass":"",
        "cedula":null
      },
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      formError: '',
      multas: [],
      factura: {
        tipoMulta: 'Seleciona una multa',
        fechaInicio: new Date().toLocaleDateString().split('/').join('-'),
        fechaLimite: {
          dia: '',
          mes: 1,
          año: ''
        },
        mensaje: '',
        estado: 'Activa',
      },
      facturaStatus: ''
    }
  },

  methods: {
    getId() {
      const routeParam = this.$router.history.current.params.userFactura;
      const AuthStr = 'Bearer '.concat(this.token);
      const URL = `http://localhost:3001/user/${routeParam}`;
      axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
        this.user = response.data.data;
      }).catch(error => {
        console.error(error);
      });
    },
    getMultas() {
      const AuthStr = 'Bearer '.concat(this.token);
      axios.get('http://localhost:3001/multas', {headers: {Authorization: AuthStr}}).then(response => {
        this.multas = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    sendInvoice() {
      const AuthStr = 'Bearer '.concat(this.token);
      axios.defaults.headers.common['Authorization'] = AuthStr;
      this.facturaStatus = 'loading';
      axios.post('http://localhost:3001/factura', {factura: this.factura, user: this.user.ID}).then(response => {
        if(response.status == 200) {
          setTimeout(() => {
            this.facturaStatus = '';
            this.$router.push('/dashboard/users');
          }, 1500);
        }
      }).catch(error => console.log(error))
    }
  },

  computed: {
    isValid() {
      return this.user.data.nombre && this.user.data.apellido && this.user.data.email && 
      this.user.credentials.telefono && this.user.data.cedula && this.user.credentials.licencia && this.user.credentials.placa && this.newPass === this.confirmNewPass;
    },
    ...mapGetters({
      token: 'isAuthenticated',
      editStatus: 'authStatus'
    })
  }
}
</script>

<style lang="sass" scoped>
</style>