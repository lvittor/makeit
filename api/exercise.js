import {Api} from "./api";

export {ExerciseApi, Exercise}

class ExerciseApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ''}`
  }

  static async add(category, controller) {
   return await Api.post(ExerciseApi.getUrl(), true, category, controller)
  }

  static async modify(category, controller) {
    return await Api.put(ExerciseApi.getUrl(category.id), true, category, controller)
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