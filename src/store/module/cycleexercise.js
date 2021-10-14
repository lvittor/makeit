import { CycleExerciseApi } from "../../../api/cycleexercise"

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    findIndex(state) {
      return (exercise) => {
        return state.items.findIndex((item) => (item.exercise.id === exercise.exercise.id) && (item.order === exercise.order) && (item.duration === exercise.duration) && (item.repetitions === exercise.repetitions));
      };
    },
    findIdIndex(state) {
      return (exid) => {
        return state.items.findIndex((item) => item.exercise.id === exid);
      };
    },
    getAllExercises(state) {
      return state.items.content;
    }
  },
  mutations: {
    push(state, exercise) {
      state.items.push(exercise);
    },
    replace(state, obj) {
      state.items[obj.index] = obj.exercise;
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
      commit('push', result)
      return result;
    },
    async getAll({commit}, req) {
      const result = await CycleExerciseApi.get(req)
      commit("replaceAll", result.content)
      return result;
    },
    async delete({getters, commit}, req) {
      await CycleExerciseApi.delete(req.cycleid, req.exerciseid)
      const index = getters.findIdIndex(req.cycleid);
      if (index >= 0) commit("splice", index);
    },
    async modify({ getters, commit }, req) {
      const result = await CycleExerciseApi.modify(req.cycleid, req.exid, req.reqs);
      const index = getters.findIndex(result);
      const obj = {index: index, exercise: result}
      if (index >= 0) commit("replace", obj);
      return result;
    },
  },
};