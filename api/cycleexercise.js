import {Api} from "./api";

export {CycleExerciseApi, CycleExercise}

class CycleExerciseApi {
  static getUrl(id, slug) {
    return `${Api.baseUrl}/cycles/${id}/exercises${ slug ? `/${slug}` : ''}`
  }

  static async add(cycleexercise, controller) {
    return await Api.post(CycleExerciseApi.getUrl(cycleexercise.cycleid, cycleexercise.exid), true, cycleexercise.reqs, controller)
  }

}

class CycleExercise {
  constructor(id, cycleid, exid, reqs) {
    if(id)
      this.id = id;
    this.cycleid = cycleid;
    this.exid = exid;
    this.reqs = reqs;
  }
}