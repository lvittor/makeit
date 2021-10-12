import Vue from "vue";
import Vuex from "vuex";
import routine from "@/store/module/routine";
import category from "@/store/module/category";
import exercise from "@/store/module/exercise";
import cycleexercise from "@/store/module/cycleexercise"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    routine,
    category,
    exercise,
    cycleexercise,
  },
});
