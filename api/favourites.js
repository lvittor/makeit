import {Api} from "./api";

export {FavouritesApi}

class FavouritesApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/favourites${ slug ? `/${slug}` : ''}`
    }

    static async setFavourite(routineID, controller){
        return await Api.post(FavouritesApi.getUrl(routineID), true, routineID, controller).catch(err => {
            throw err;
        })
    }

    static async deleteFavourite(routineID, controller){
        return await Api.delete(FavouritesApi.getUrl(routineID), true, routineID, controller).catch(err => {
            throw err;
        })
    }

    static async getFavourites(controller){
        return await Api.get(FavouritesApi.getUrl(), true, controller).catch(err => {
            throw err;
        })
    }
}