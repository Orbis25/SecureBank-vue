import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: JSON.parse(localStorage.getItem("session")),
    modelvisible:false
  },
  mutations: {
    add(state, model) {
      state.data = model;
    },
    changeStateModal(state, val) {
      state.modelvisible = val;
    }
  },
  actions: {},
  getters: {
    getData: state => state.data,
    getModalState : state => state.modelvisible
  }
});
