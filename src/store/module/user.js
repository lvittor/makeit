import { UserApi } from "../../../api/user";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    findIndex(state) {
      return (username) => {
        return state.items.findIndex((item) => item.id === username.id);
      };
    },
  },
  mutations: {
    replaceAll(state, users) {
      state.items = users;
    },
  },
  actions: {
    async get({ commit }, username) {
      const result = await UserApi.getUser(username);
      commit("replaceAll", result);
      return result;
    },
    async getUserRoutines({commit}, req){
      const result = await UserApi.getUserRoutines(req);
      commit("replaceAll", result);
      return result;
    },
  },
};
