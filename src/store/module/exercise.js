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
    findIdIndex(state) {
      return (exerciseid) => {
        return state.items.findIndex((item) => item.id === exerciseid);
      };
    },
    getAllExercises(state) {
      return state.items;
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
    async create({ getters, commit }, exercise) {
      const result = await ExerciseApi.add(exercise);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async modify({ getters, commit }, exercise) {
      const result = await ExerciseApi.modify(exercise);
      const index = getters.findIndex(result);
      const obj = {index: index, exercise: result}
      if (index >= 0) commit("replace", obj);
      return result;
    },
    async delete({ getters, commit }, exerciseid) {
      await ExerciseApi.delete(exerciseid);
      const index = getters.findIdIndex(exerciseid);
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
      commit("replaceAll", result.content);
      return result;
    },
  },
};