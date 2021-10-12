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
  },
};