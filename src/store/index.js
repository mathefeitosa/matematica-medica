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
    pediatria: {
      peso: 3.4,
      sexo: "F",
      idadeMeses: 3,
      idadeAnos: 1,
      isRN: false,
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
