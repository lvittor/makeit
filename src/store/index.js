import Vue from "vue";
import Vuex from "vuex";
import routine from "@/store/module/routine";
import category from "@/store/module/category";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    routine,
    category,
  },
});
