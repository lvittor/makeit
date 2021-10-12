import {Api} from "./api";

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

    static async modifyRoutine(routine, controller) {
        return await Api.put(RoutineApi.getUrl(), true, routine, controller).catch(err => {
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
    constructor(id, name, detail, type, order, repetitions) {
        if (id)
            this.id = id;
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
    }
}