import {Api} from "./api";
//import Category from "../src/store/module/category"

export {RoutineApi, Routine, Cycle}

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ''}`
    }

    static async createRoutine(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), true, routine, controller).catch(err => {
            throw err;
        })
    }

    static async createCycle(routineid, cycle, controller) {
        return await Api.post(RoutineApi.getUrl(routineid + '/cycles'), true, cycle, controller).catch(err => {
            throw err;
        })
    }

    static async modifyRoutine(routineid, routine, controller) {
        return await Api.put(RoutineApi.getUrl(routineid), true, routine, controller).catch(err => {
            throw err;
        })
    }

    static async modifyCycle(routineid, cycle, controller) {
        return await Api.put(RoutineApi.getUrl(routineid + '/cycles/' + cycle.id), true, cycle.cycle, controller).catch(err => {
            throw err;
        })
    }

    static async deleteCycle(routineid, cycleid, controller) {
        return await Api.delete(RoutineApi.getUrl(routineid + '/cycles/' + cycleid), true, controller).catch(err => {
            throw err;
        })
    }

    static async getRoutine(routineid, controller) {
        return await Api.get(RoutineApi.getUrl(routineid), true, controller).catch(err => {
            throw err;
        })
    }

    static async deleteRoutine(routineID, controller){
        return await Api.delete(RoutineApi.getUrl(routineID), true, controller).catch(err => {
            throw err;
        })
    }

    static async getAllRoutines(controller) {
        return await Api.get(RoutineApi.getUrl(), true, controller).catch(err => {
            throw err;
        })
    }
  
    static async getFiltered(filters, controller) {
        return await Api.get(RoutineApi.getUrl('?' + filters), true, controller).catch(err => {
            throw err;
        })
    }
  
    

    static async getFourRoutinesBy(category, controller){
        return this.getRoutinesByCat(category, 0, 4, controller)
    }

    static async getRoutinesByCat(category, page, size, controller){
        if(page == null){
            page = 0
        }
        if(size == null){
            size = 12
        }
        const aux = `?categoryId=${category}&page=${page}&size=${size}&orderBy=date&direction=asc`

        return await Api.get(RoutineApi.getUrl(aux), true, controller).catch(err => {
            throw err;
        })
    }
    static async getPage(page, size, controller){
        if(page == null){
            page = 0
        }
        if(size == null){
            size = 12
        }
        const aux = `?page=${page}&size=${size}&orderBy=date&direction=asc`
        return await Api.get(RoutineApi.getUrl(aux), true, controller).catch(err => {
            throw err;
        })
    }

    static async getAllCycles(routineid, controller) {
        const aux = `${routineid}/cycles?page=0&size=10&orderBy=order&direction=asc`
        return await Api.get(RoutineApi.getUrl(aux), true, controller).catch(err => {
            throw err;
        })
    }
}

class Routine {
    constructor(id, name, detail, isPublic, category, difficulty) {
        if(id)
            this.id = id;
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.category = category;
        this.difficulty = difficulty;
    }
}

class Cycle {
    constructor(id, name, detail, type, order, repetitions, metadata) {
        if (id)
            this.id = id;
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
        this.metadata = metadata
    }
}