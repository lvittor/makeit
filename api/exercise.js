import {Api} from "./api";

export {ExerciseApi, Exercise}

class ExerciseApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ''}`
  }

  static async add(exercise, controller) {
   return await Api.post(ExerciseApi.getUrl(), true, exercise, controller)
  }

  static async modify(exercise, controller) {
    return await Api.put(ExerciseApi.getUrl(exercise.id), true, exercise, controller)
  }

  static async delete(id, controller) {
    return await Api.delete(ExerciseApi.getUrl(id), true, controller)
  }

  static async get(id, controller) {
    return await Api.get(ExerciseApi.getUrl(id), true, controller)
  }

  static async getAll(controller) {
    return await Api.get(ExerciseApi.getUrl(), true, controller)
  }

  static async getPage(page, size, controller){
    if(page == null){
        page = 0
    }
    if(size == null){
        size = 12
    }
    const aux = `?page=${page}&size=${size}&orderBy=id&direction=asc`
    return await Api.get(ExerciseApi.getUrl(aux), true, controller).catch(err => {
        throw err;
    })
  }
}

class Exercise {
  constructor(id, name, detail, type) {
    if(id)
      this.id = id;
    this.name = name;
    this.detail = detail;
    this.type = type;
  }
}