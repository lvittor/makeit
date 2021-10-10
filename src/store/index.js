import Vue from 'vue'
import Vuex from 'vuex'
import security from '@/store/module/security';
import sport from '@/store/module/sport';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    security,
    sport
  }
})
