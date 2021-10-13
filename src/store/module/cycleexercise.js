import { CycleExerciseApi } from "../../../api/cycleexercise"

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    findIndex(state) {
      return (exercise) => {
        return state.items.findIndex((item) => item.id === exercise.id);
      };
    },
    findIdIndex(state) {
      return (exid) => {
        return state.items.findIndex((item) => item.id === exid);
      };
    },
    getAllExercises(state) {
      alert('STATE: ' + JSON.stringify(state.items.content))
      return state.items.content;
    }
  },
  mutations: {
    push(state, exercise) {
      state.items.push(exercise);
    },
    replace(state, index, exercise) {
      state.items[index] = exercise;
    },
    splice(state, index) {
      state.items.splice(index, 1);
    },
    replaceAll(state, exercises) {
      state.items = exercises;
    },
  },
  actions: {
    async create({ commit }, cycleexercise) {
      const result = await CycleExerciseApi.add(cycleexercise);
      commit('replaceAll', result)
      return result;
    },
    async get({commit}, req) {
      const result = await CycleExerciseApi.get(req)
      commit("push", result)
      return result;
    },
    async delete({getters, commit}, req) {
      await CycleExerciseApi.delete(req.cycleid, req.exerciseid)
      const index = getters.findIdIndex(req.cycleid);
      if (index >= 0) commit("splice", index);
    },
    async modify({ getters, commit }, req) {
      alert('AL PUT LE LLEGO ESTO: ' + JSON.stringify(req))
      const result = await CycleExerciseApi.modify(req.cycleid, req.exid, req.reqs);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },
  },
};