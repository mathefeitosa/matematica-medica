import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    metricas: {
      idade: 60,
      peso: 70,
      sexo: "M",
      raca: "B",
    },
  },
  mutations: {
    set(state, [variable, value]) {
      state[variable] = value;
    },
  },
  actions: {},
  modules: {},
});
