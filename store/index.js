import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import axios from 'axios'

Vue.use(Vuex)

// TODO: separate store in modules

const store = () => {
  return new Vuex.Store({
    state: {
      modalActive: false,
      modalType: 'vision',
      auth: {
        token: Cookie.get('user-token') || '',
        status: ''
      },
      profile: Cookie.get('user-data') || ''
    },

    getters: {
      modalState: state => state.modalActive,

      modalActiveType: state => state.modalType,
  
      isAuthenticated: state => state.auth.token,
  
      stateProfile: state => state.profile,
      
      authStatus: state => state.auth.status
    },

    mutations: {
      AUTH_REQUEST: state => {
        state.auth.status = 'loading';
      },
  
      AUTH_SUCCESS: (state, payload) => {
        state.auth.status = 'success';
        if(payload) state.auth.token = payload.token;
      },
  
      AUTH_ERROR: (state, payload) => {
        state.auth.status = payload;
      },

      AUTH_LOGOUT: state => {
        state.profile = {};
        state.auth.token = '';
        state.auth.status = '';
      },

      REG_SUCCESS: state => {
        state.auth.status = 'register_success'
      },
      
      EDIT_SUCCESS: state => {
        state.auth.status = 'edit_success'
      },

      GETTING_TOKEN: (state, payload) => {
        let token = Cookie.get('user-token');
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedToken = JSON.parse(window.atob(base64));
        Cookie.set('user-data', decodedToken);
      },

      SET_TOKEN_DATA: (state, payload) => {
        state.profile = payload;
      },

      SET_TOKEN: (state, payload) => {
        state.auth.token = payload;
      },

      STATUS_NONE: (state) => {
        state.auth.status = '';
      }
    },

    actions: {
      //Authentication
      AUTH_REQUEST: ({commit}, user) => {
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST');
          axios.post('http://localhost:3001/login', user)
            .then(resp => {         
              const token = resp.data.token;
              Cookie.set('user-token', token);
              axios.defaults.headers.common['Authorization'] = token;
              commit('AUTH_SUCCESS', {token});
              commit('GETTING_TOKEN', {token});
              resolve(resp);
            })
            .catch(err => { 
              commit('AUTH_ERROR', err.response.status);
              Cookie.remove('user-token'); // Si la respuesta falla, elimina cualquier token existente (En caso de que se haya almacenado uno)
              delete axios.defaults.headers.common['Authorization'];
              reject({status: err.response.status, message: err.response.data.message});
            });
        });
      },

      EDIT_USER_REQUEST: ({commit, state}, user) => {
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST');
          const AuthStr = 'Bearer '.concat(state.auth.token);
          const URL = `http://localhost:3001/${user.data.ID}`;
          axios.defaults.headers.common['Authorization'] = AuthStr;
          axios.put(URL, user)
            .then(resp => {
              commit('EDIT_SUCCESS');
              resolve(resp);
            })
            .catch(error => {
              commit('AUTH_ERROR', err.response.status);
              reject({status: err.response.status, message: err.response.data.message});
            });
        })
      },

      TOKEN_DATA: ({commit}, tokenData) => {
        commit('SET_TOKEN_DATA', tokenData);
      },

      SET_TOKEN: ({commit}, token) => {
        commit('SET_TOKEN', token);
      },

      STATUS_NONE: ({commit}) => {
        commit('STATUS_NONE');
      },

      //Logout
      AUTH_LOGOUT: ({commit}) => {
        return new Promise((resolve) => {
          commit('AUTH_LOGOUT');
          Cookie.remove('user-token'); // Elimina el token del usuario almacenado en los cookies
          Cookie.remove('user-data'); // Elimina la data del usuario almacenado en los cookies
          delete axios.defaults.headers.common['Authorization'];
          resolve();
        });
      },

      //Registrando un nuevo usuario
      REGISTER_USER: ({commit}, user) => {
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST'); // Cambiamos el "auth status" para activar el loader del formulario
          axios.post('http://localhost:3001/signUp', user)
            .then(resp => {         
              commit('REG_SUCCESS');
              resolve(resp);
            })
            .catch(err => { 
              commit('AUTH_ERROR', err.response.status);
              reject({status: err.response.status, message: err.response.data.message});
            });
        });
      },

      //Registro de nueva multa
      REGISTER_MULTA: ({commit}, multa) => {
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST'); // Cambiamos el "auth status" para activar el loader del formulario
          axios.post('http://localhost:3001/newMulta', multa)
            .then(resp => {         
              commit('REG_SUCCESS');
              resolve(resp);
            })
            .catch(err => { 
              commit('AUTH_ERROR', err.response.status);
              reject({status: err.response.status, message: err.response.data.message});
            });
        });
      },
    }
  })
}

export default store;