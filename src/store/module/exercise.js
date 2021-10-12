import { ExerciseApi } from "../../../api/exercise";

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
    async create({ getters, commit }, exercise) {
      const result = await ExerciseApi.add(exercise);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async modify({ getters, commit }, exercise) {
      const result = await ExerciseApi.modify(exercise);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },
    async delete({ getters, commit }, exercise) {
      await ExerciseApi.delete(exercise.id);
      const index = getters.findIndex(exercise);
      if (index >= 0) commit("splice", index);
    },
    async get({ state, getters, commit }, exercise) {
      const index = getters.findIndex(exercise);
      if (index >= 0) return state.items[index];

      const result = await ExerciseApi.get(exercise.id);
      commit("push", result);
      return result;
    },
    async getAll({ commit }, controller) {
      const result = await ExerciseApi.getAll(controller);
      commit("replaceAll", result);
      return result;
    },
  },
};