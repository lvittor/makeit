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
    getAllExercises(state) {
      alert('STATE: ' + JSON.stringify(state.items.content))
      return state.items.content;
    }
  },
  mutations: {
    push(state, exercise) {
      state.items.push(exercise);
    },
    push2(state, exercise) {
      state.items.content.push(exercise);
    },
    replace(state, index, exercise) {
      state.items[index] = exercise;
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
    async delete({ getters, commit }, exercise) {
      await ExerciseApi.delete(exercise.id);
      const index = getters.findIndex2(exercise);
      if (index >= 0) commit("splice2", index);
    },
    async create({ getters, commit }, exercise) {
      const result = await ExerciseApi.add(exercise);
      if (!getters.findIndex2(result)) commit("push2", result);
      return result;
    },
    async modify({ getters, commit }, exercise) {
      const result = await ExerciseApi.modify(exercise);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },
    async get({ state, getters, commit }, exercise) {
      alert('Ejercicio en cuestion: ' + JSON.stringify(exercise))
      const index = getters.findIndex2(exercise);
      alert('Indice: ' + index)
      if (index >= 0) return state.items.content[index];

      const result = await ExerciseApi.get(exercise.id);
      alert('Resultado despues de index -1: '+ JSON.stringify(result))
      commit("push2", result);
      return result;
    },
    async getAll({ commit }, controller) {
      const result = await ExerciseApi.getAll(controller);
      commit("replaceAll", result);
      return result;
    },
    async getExercisesPage({ commit }, page) {
      const result = await ExerciseApi.getPage(page,12);
      commit("replaceAll", result);
      return result;
    },
  },
};