//import { getOwnPropertyNames } from "core-js/core/object";
import { RoutineApi } from "../../../api/routine";
import { UserApi } from "../../../api/user";
import { FavouritesApi } from "../../../api/favourites";

export default {
  namespaced: true,
  state: {
    items: [],
    cycles: [],
    favourites: [],
  },
  getters: {
    findIndex(state) {
      return (routine) => {
        return state.items.findIndex((item) => item.id === routine.id);
      };
    },
    findIndexFavourites(state) {
      return (favId) => {
        return state.favourites.findIndex((item) => item.id === favId);
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
      state.cycles.push(cycle);
    },
    replaceAllCycles(state, cycles) {
      state.cycles = cycles;
    },
    replace(state, obj) {
      state.items[obj.index] = obj.routine;
    },
    pushFavouritepush(state, routine) {
      state.favourites.push(routine);
    },

    splice(state, index) {
      state.items.splice(index, 1);
    },
    spliceCycles(state, index) {
      state.cycles.splice(index, 1);
    },
    spliceFavourites(state, index) {
      state.favourites.splice(index, 1);
    },
    replaceAll(state, routine) {
      state.items = routine;
    },
    replaceCycle(state, obj) {
      state.cycles[obj.index] = obj.cycle;
    },
    replaceAllFavourites(state, favourite) {
      state.favourites = favourite;
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
      commit("pushCycle", result);
      return result;
    },
    async modify({ getters, commit }, req) {
      const result = await RoutineApi.modifyRoutine(req.routineid, req.routine);
      const index = getters.findIndex(result);
      const obj = { index: index, routine: result };
      if (index >= 0) commit("replace", obj);
      return result;
    },
    async modifyCycle({ getters, commit }, req) {
      const result = await RoutineApi.modifyCycle(req.routineid, req.cycle);
      const index = getters.findCycleIndex(result);
      const obj = { index: index, cycle: result };
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
      const result = await RoutineApi.getRoutine(routineid);
      commit("push", result);
      return result;
    },
    async getAll({ commit }, controller) {
      const result = await RoutineApi.getAllRoutines(controller);
      commit("replaceAll", result.content);
      return result;
    },

    async getFiltered({ commit }, filters) {
      const result = await RoutineApi.getFiltered(filters);
      commit("replaceAll", result.content);
      return result;
    },

    async getFour({ commit }, cat) {
      const result = await RoutineApi.getFourRoutinesBy(cat);
      commit("replaceAll", result.content);
      return result;
    },
    async getAllCycles({ commit }, routineid) {
      const result = await RoutineApi.getAllCycles(routineid);
      commit("replaceAllCycles", result.content);
      return result;
    },

    async getPageByCat({ commit }, { cat, page }) {
      const result = await RoutineApi.getRoutinesByCat(cat, page, 12);
      commit("replaceAll", result.content);
      return result;
    },

    async getUserRoutines({ commit }, controller) {
      const result = await UserApi.getCurrentRoutines(controller);
      commit("replaceAll", result.content);
      return result;
    },

    async setFavourite({ getters, commit }, routineID) {
      const result = await FavouritesApi.setFavourite(routineID);
      if (!getters.findIndexFavourites(result)) commit("pushFavourite", result);
      return result;
    },

    async getFavourites({ commit }, controller) {
      const result = await FavouritesApi.getFavourites(controller);
      commit("replaceAllFavourites", result.content);
      return result;
    },

    async getFavouritesPage({ commit }, { page, size }) {
      const result = await FavouritesApi.getFavouritesPage(page, size);
      commit("replaceAllFavourites", result.content);
      return result;
    },

    async deleteFavourite({ getters, commit }, routineID) {
      await FavouritesApi.deleteFavourite(routineID);
      const index = getters.findIndexFavourites(routineID);
      if (index >= 0) commit("spliceFavourites", index);
    },

    async getRoutinePage({ commit }, page) {
      const result = await RoutineApi.getPage(page, 12);
      commit("replaceAll", result.content);
      return result;
    },
  },
};
