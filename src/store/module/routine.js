import { RoutineApi } from "../../../api/routine";

export default {
  namespaced: true,
  state: {
    items: [],
    cycles: [],
  },
  getters: {
    findIndex(state) {
      return (category) => {
        return state.items.findIndex((item) => item.id === category.id);
      };
    },
    findCategory(state) {
      return (category) => {
        return state.items.findCategory(
          (item) => item.category.id === category.id
        );
      };
    },
  },
  mutations: {
    push(state, routine) {
      state.items.push(routine);
    },
    replace(state, index, routine) {
      state.items[index] = routine;
    },
    splice(state, index) {
      state.items.splice(index, 1);
    },
    replaceAll(state, routine) {
      state.items = routine;
    },
    replaceCycle(state, cycle) {
      state.cycles = cycle;
    }
  },
  actions: {
    async create({ getters, commit }, routine) {
      const result = await RoutineApi.createRoutine(routine); //add(routine);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async createCycle({ commit }, req) {
      const result = await RoutineApi.createCycle(req.id, req.cycle);
      commit('replaceCycle', result)
      return result
    },
    async modify({ getters, commit }, routine) {
      const result = await RoutineApi.modifyRoutine(routine);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },
    async delete({ getters, commit }, routine) {
      await RoutineApi.deleteRoutine(routine.id);
      const index = getters.findIndex(routine);
      if (index >= 0) commit("splice", index);
    },
    async get({ state, getters, commit }, routine) {
      const index = getters.findIndex(routine);
      if (index >= 0) return state.items[index];

      /*  TODO: No entiendo por que tiene este comportamiento... hablarlo con los chicos
      const result = await CategoryApi.get();
      commit("push", result);
      return result; */
      const result = await RoutineApi.get();
      commit("push", result);
      return result;
    },
    async getAll({ commit }) {
      const result = await RoutineApi.getAllRoutines();
      commit("replaceAll", result);
      return result;
    },
    async getFiltered({ commit }, filters){
      const result = await RoutineApi.getFiltered(filters);
      commit("replaceAll", result);
      return result;
    },
    async getAllCycles({ commit }, {routineid,controller}) {
      const result = await RoutineApi.getAllCycles(routineid,controller);
      commit("replaceCycle", result);
      return result;
    },
    async getFour({ commit }, cat) {
      const result = await RoutineApi.getFourRoutinesBy(cat);
      commit("replaceAll", result);
      return result;
    },

    async getPageByCat({ commit }, {cat,page}) {
      const result = await RoutineApi.getRoutinesByCat(cat,page,12);
      commit("replaceAll", result);
      return result;
    },
  },
};
