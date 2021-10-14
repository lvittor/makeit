//import { getOwnPropertyNames } from "core-js/core/object";
import { RoutineApi } from "../../../api/routine";
//import category from "../../../api/category";

export default {
  namespaced: true,
  state: {
    items: [],
    cycles: [],
  },
  getters: {
    findIndex(state) {
      return (routine) => {
        return state.items.findIndex((item) => item.id === routine.id);
      };
    },
    findIdIndex(state) {
      return (routineid) => {
        return state.items.findIndex((item) => item.id === routineid);
      };
    },
    findCycleIndex(state) {
      return (cycle) => {
        return state.cycles.findIndex((item) => item.id === cycle.id);
      };
    },
    findCycleIdIndex(state) {
      return (cycleid) => {
        return state.cycles.findIndex((item) => item.id === cycleid);
      };
    },
  },
  mutations: {
    push(state, routine) {
      state.items.push(routine);
    },
    pushCycle(state, cycle) {
      state.cycles.push(cycle)
    },
    replaceAllCycles(state, cycles) {
      state.cycles = cycles
    },
    replace(state, obj) {
      state.items[obj.index] = obj.routine;
    },
    splice(state, index) {
      state.items.splice(index, 1);
    },
    spliceCycles(state, index) {
      state.cycles.splice(index, 1)
    },
    replaceAll(state, routine) {
      state.items = routine;
    },
    replaceCycle(state, obj) {
      state.cycles[obj.index] = obj.cycle;
    },
  },
  actions: {
    async create({ getters, commit }, routine) {
      const result = await RoutineApi.createRoutine(routine); //add(routine);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async createCycle({ commit }, req) {
      const result = await RoutineApi.createCycle(req.id, req.cycle);
      commit('pushCycle', result)
      return result
    },
    async modify({ getters, commit }, req) {
      const result = await RoutineApi.modifyRoutine(req.routineid, req.routine);
      const index = getters.findIndex(result);
      const obj = {index: index, routine: result}
      if (index >= 0) commit("replace", obj);
      return result;
    },
    async modifyCycle({ getters, commit }, req) {
      const result = await RoutineApi.modifyCycle(req.routineid, req.cycle);
      const index = getters.findCycleIndex(result);
      const obj = {index: index, cycle: result}
      if (index >= 0) commit("replaceCycle", obj);
      return result;
    },
    async delete({ getters, commit }, routine) {
      await RoutineApi.deleteRoutine(routine.id);
      const index = getters.findIndex(routine);
      if (index >= 0) commit("splice", index);
    },
    async deleteCycle({ getters, commit }, req) {
      await RoutineApi.deleteCycle(req.routineid, req.cycleid);
      const index = getters.findCycleIdIndex(req.cycleid);
      if (index >= 0) commit("spliceCycle", index);
    },
    async getRoutine({ state, getters, commit }, routineid) {
      const index = getters.findIdIndex(routineid); // mmmmmmmmm ver esto
      if (index >= 0) return state.items[index];
      const result = await RoutineApi.getRoutine(routineid)
      commit("push", result);
      return result;
    },
    async getAll({ commit }, controller) {
      const result = await RoutineApi.getAllRoutines(controller);
      commit("replaceAll", result.content);
      return result;
    },
    async getFour({ commit }, cat) {
      alert("Cargo 4 rutinas de una categoria");
      const result = await RoutineApi.getFourRoutinesBy(cat);
      alert(
        "El llamado a la api de las 4 rutinas me devuelve " +
          JSON.stringify(result)
      );
      commit("replaceAll", result.content);
      return result;
    },
    async getAllCycles({commit}, routineid) {
      const result = await RoutineApi.getAllCycles(routineid);
      commit("replaceAllCycles", result.content)
      return result;
    }
  },
};