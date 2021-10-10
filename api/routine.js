import {Api} from "./api";
//import Category from "../src/store/module/category"

export {RoutineApi, Routine}

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ''}`
      }


    static async createRoutine(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), true, routine, controller).catch(err => {
            throw err;
        })
    }

    static async modifyRoutine(routine, controller) {
        return await Api.put(RoutineApi.getUrl(), true, routine, controller).catch(err => {
            throw err;
        })
    }

    static async getAllRoutines(controller) {
        return await Api.get(RoutineApi.getUrl(), true, controller).catch(err => {
            throw err;
        })
    }

    static async getFourRoutinesBy(category, controller){
        const aux = `?categoryId=${category}&page=0&size=4&orderBy=date&direction=asc`
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