import {Api} from "./api";

export {CycleExerciseApi, CycleExercise}

class CycleExerciseApi {
  static getUrl(id, slug) {
    return `${Api.baseUrl}/cycles/${id}/exercises${ slug ? `/${slug}` : ''}`
  }

  static async add(cycleexercise, controller) {
    return await Api.post(CycleExerciseApi.getUrl(cycleexercise.cycleid, cycleexercise.exid), true, cycleexercise.reqs, controller).catch(err => {
      throw err;
    })
  }

  static async get(req, controller) {
    return await Api.get(CycleExerciseApi.getUrl(req.cycleid, '?page=0&size=' + req.size), true, controller).catch(err => {
      throw err;
    })
  }

  static async delete(cycleid, exerciseid, controller) {
    return await Api.delete(CycleExerciseApi.getUrl(cycleid, exerciseid), true, controller).catch(err => {
        throw err;
    })
  }

  static async modify(cycleid, exid, reqs, controller) {
    alert('A LA API LE LLEGO ESTO, CYCLEID: ' + cycleid + ' EXID: ' + exid + ' REQS: ' + JSON.stringify(reqs))
    alert('BODY: ' + JSON.stringify(reqs))
    return await Api.put(CycleExerciseApi.getUrl(cycleid, exid), true, reqs, controller).catch(err => {
        throw err;
    })
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