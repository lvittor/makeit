import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  async beforeCreate() {
    await this.$store.dispatch('security/initialize')
  },
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
