import { CategoryApi } from "../../../api/category";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    findIndex(state) {
      return (category) => {
        return state.items.findIndex((item) => item.id === category.id);
      };
    },
  },
  mutations: {
    push(state, category) {
      state.items.push(category);
    },
    replace(state, obj) {
      state.items[obj.index] = obj.category;
    },
    splice(state, index) {
      state.items.splice(index, 1);
    },
    replaceAll(state, categories) {
      state.items = categories;
    },
  },
  actions: {
    async create({ getters, commit }, category) {
      const result = await CategoryApi.add(category);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async modify({ getters, commit }, category) {
      const result = await CategoryApi.modify(category);
      const index = getters.findIndex(result);
      const obj = { index: index, category: result };
      if (index >= 0) commit("replace", obj);
      return result;
    },
    async delete({ getters, commit }, category) {
      await CategoryApi.delete(category.id);
      const index = getters.findIndex(category);
      if (index >= 0) commit("splice", index);
    },
    async get({ state, getters, commit }, category) {
      const index = getters.findIndex(category);
      if (index >= 0) return state.items[index];

      const result = await CategoryApi.get();
      commit("push", result);
      return result;
    },
    async getAll({ commit }, filter) {
      if (!filter) filter = "";
      const result = await CategoryApi.getAll(filter);
      commit("replaceAll", result.content);
      return result;
    },
    async getFiltered({ commit }, filters) {
      const result = await CategoryApi.getFiltered(filters);
      commit("replaceAll", result);
      return result;
    },
  },
};
