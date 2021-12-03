import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueNumericInput from "vue-numeric-input";
import Popover from "vue-js-popover";

Vue.config.productionTip = false;

Vue.use(VueNumericInput);
Vue.use(Popover, { tooltip: true });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
