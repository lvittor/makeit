import Vue from "vue";
import Vuex from "vuex";
import security from "@/store/module/security";
import sport from "@/store/module/sport";
import routine from "@/store/module/routine";
import category from "@/store/module/category";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    security,
    sport,
    routine,
    category
  },
});
