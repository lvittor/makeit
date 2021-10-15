import Vue from "vue";
import Vuex from "vuex";
import routine from "@/store/module/routine";
import category from "@/store/module/category";
import security from "@/store/module/security";
import sport from "@/store/module/sport"; // TODO: remove sport
import exercise from "@/store/module/exercise";
import cycleexercise from "@/store/module/cycleexercise";
import user from "@/store/module/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    routine,
    category,
    security,
    sport,
    exercise,
    cycleexercise,
    user,
  },
});
