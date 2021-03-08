import UserService from '../services/user.service';

const initialState = {
  users: [],
  user: {},
  message: {},
  loading: false
};

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    new({ commit }) { commit('new'); return Promise.resolve(); },
    list({ commit }) {
      commit('loading', true);
      return UserService.getList().then(
        response => {
          commit('listSuccess', response.data); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    get({ commit }, id) {
      commit('loading', true);
      return UserService.get(id).then(
        response => {
          commit('getSuccess', response.data); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    create({ commit }, user) {
      commit('loading', true);
      return UserService.create(user).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    update({ commit }, user) {
      commit('loading', true);
      return UserService.update(user).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    },
    delete({ commit }, user) {
      commit('loading', true);
      return UserService.delete(user).then(
        response => {
          commit('success'); return Promise.resolve(response.data);
        },
        error => { commit('error', error); return Promise.reject(error); }
      );
    }
  },
  mutations: {
    loading(state, loading) {
      state.loading = loading;
      state.message = {};
    },
    new(state) {
      state.user = {};
      state.message = {};
    },
    success(state) {
      state.loading = false;
      state.message = {};
    },
    error(state, error) {
      state.loading = false;
      let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      state.message = { color: 'error', content: message };
    },
    listSuccess(state, users) {
      state.loading = false;
      state.message = {};
      state.users = [...users];
    },
    getSuccess(state, user) {
      state.loading = false;
      state.message = {};
      state.user = user;
    },
  }
};
