import {Credentials} from "../api/user";

export default class Helper{
  static wip() {
    alert("Ooops, this feature isn't available yet...");
  }

  static setResult(result){
    this.result = JSON.stringify(result, null, 2)
  }
  static clearResult() {
    this.result = null
  }

  static async login(mail, password) {
    try {
      const credentials = new Credentials(mail, password)
      await this.$login({credentials, rememberMe: true })
      this.clearResult()
    } catch (e) {
      this.setResult(e)
    }
  }
}