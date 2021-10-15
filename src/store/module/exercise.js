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
    findIndex2(state) {
      return (exercise) => {
        return state.items.content.findIndex((item) => item.id === exercise.id);
      };
    },
    findIdIndex(state) {
      return (exerciseid) => {
        return state.items.findIndex((item) => item.id === exerciseid);
      };
    },
    getAllExercises(state) {
      return state.items;
    },
  },
  mutations: {
    push(state, exercise) {
      state.items.push(exercise);
    },
    replace(state, obj) {
      state.items[obj.index] = obj.exercise;
    },
    replace2(state, index, exercise) {
      state.items.content[index] = exercise;
    },
    splice(state, exercise) {
      state.items.splice(exercise, 1);
    },
    splice2(state, exercise) {
      state.items.content.splice(exercise, 1);
    },
    replaceAll(state, exercises) {
      state.items = exercises;
    },
  },
  actions: {
    async create({ getters, commit }, exercise) {
      const result = await ExerciseApi.add(exercise);
      if (!getters.findIndex(result)) commit("push", result.content);
      // if (!getters.findIndex2(result)) commit("push2", result.content);
      return result;
    },
    async modify({ getters, commit }, exercise) {
      const result = await ExerciseApi.modify(exercise);
      const index = getters.findIndex(result);
      const obj = { index: index, exercise: result };
      if (index >= 0) commit("replace", obj);
      return result;
    },
    async delete({ getters, commit }, exerciseid) {
      await ExerciseApi.delete(exerciseid);
      const index = getters.findIndex2(exerciseid);
      if (index >= 0) commit("splice", index);
    },
    async get({ state, getters, commit }, exercise) {
      const index = getters.findIndex(exercise);
      if (index >= 0) return state.items[index];
      const result = await ExerciseApi.get(exercise.id);
      commit("push", result.content);
      return result;
    },
    async getAll({ commit }, controller) {
      const result = await ExerciseApi.getAll(controller);
      commit("replaceAll", result.content);
      return result;
    },
    async getExercisesPage({ commit }, page) {
      const result = await ExerciseApi.getPage(page, 12);
      commit("replaceAll", result.content);
      return result;
    },
  },
};
