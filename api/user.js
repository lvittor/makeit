import { Api } from './api.js'

export { UserApi, Credentials, User }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ''}`
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller)
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller)
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller)
    }

    static async add(user, controller){
        return await Api.post(UserApi.getUrl(), false, user, controller)
    }

    static async modify(user, controller) {
        return await Api.put(UserApi.getUrl('current'), true, user, controller)
      }

}

class Credentials {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}

class User {
    /**
     * username <-> email for internal api reasons
     */
    constructor(mail, password, firstName, lastName, username) {
        this.username = mail;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = username;
    }
}