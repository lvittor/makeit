import { RoutineApi } from "../../../api/routine";
import { UserApi } from "../../../api/user";
import { FavouritesApi } from "../../../api/favourites";

export default {
  namespaced: true,
  state: {
    items: [],
    cycles: [],
    favourites:[]
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
    pushFavouritepush(state, routine) {
      state.favourites.push(routine);
    },
    replace(state, index, routine) {
      state.items[index] = routine;
    },
    splice(state, index) {
      state.items.splice(index, 1);
    },
    spliceFavourites(state, index) {
      state.favourites.splice(index, 1);
    },
    replaceAll(state, routine) {
      state.items = routine;
    },
    replaceCycle(state, cycle) {
      state.cycles = cycle;
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

    // async get({ state, getters, commit }, routine) {
    //   const index = getters.findIndex(routine);
    //   if (index >= 0) return state.items[index];

    //   /*  TODO: No entiendo por que tiene este comportamiento... hablarlo con los chicos
    //   const result = await CategoryApi.get();
    //   commit("push", result);
    //   return result; */
    //   alert('get')
    //   const result = await RoutineApi.get();
    //   alert('get' + JSON.stringify(result))
    //   commit("push", result);
    //   return result;
    // },

    async getAll({ commit }, controller) {
      const result = await RoutineApi.getAllRoutines(controller);
      commit("replaceAll", result.content);
      return result;
    },

    async getAllCycles({ commit }, {routineid,controller}) {
      const result = await RoutineApi.getAllCycles(routineid,controller);
      commit("replaceCycle", result.content);
      return result;
    },

    async getFour({ commit }, cat) {
      const result = await RoutineApi.getFourRoutinesBy(cat);
      commit("replaceAll", result.content);
      return result;
    },

    async getPageByCat({ commit }, {cat,page}) {
      const result = await RoutineApi.getRoutinesByCat(cat,page,12);
      commit("replaceAll", result.content);
      return result;
    },

    async getUserRoutines({commit}, controller){
      const result = await UserApi.getCurrentRoutines(controller);
      commit("replaceAll", result.content);
      return result;
    },

    async setFavourite({getters, commit}, routineID){
      const result = await FavouritesApi.setFavourite(routineID);
      if (!getters.findIndexFavourites(result)) commit("pushFavourite", result);
      return result;
      
    },

    async getFavourites({commit}, controller){
      const result = await FavouritesApi.getFavourites(controller);
      commit("replaceAllFavourites", result.content);
      return result;
    },

    async getFavouritesPage({commit}, {page, size}){
      const result = await FavouritesApi.getFavouritesPage(page,size);
      commit("replaceAllFavourites", result.content);
      return result;
    },

    async deleteFavourite({getters, commit}, routineID){
      await FavouritesApi.deleteFavourite(routineID);
      const index = getters.findIndexFavourites(routineID);
      if (index >= 0) commit("spliceFavourites", index);
    },
    
    async getRoutinePage({commit}, page){
      const result = await RoutineApi.getPage(page,12);
      commit("replaceAll", result.content);
      return result;
    }
  },
};
