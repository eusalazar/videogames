import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_BY_GENRES = 'GET_BY_GENRES';
export const BY_ORDER = 'BY_ORDER';
export const CREATED = 'CREATED';
export const GET_NAME_VIDEOGAMES = 'GET_NAME_VIDEOGAMES';
export const POST = 'POST';
export const GET_ALL_PLATFORMS = 'GET_ALL_PLATFORMS';
export const BY_RATING = 'BY_RATING';
export const GET_DETAILS = 'GET_DETAILS'
export const GET_NAME_VIDEOGAMES_FAILED = 'GET_NAME_VIDEOGAMES_FAILED'
export const INICIAR_GET_ALL_VIDEOGAMES = 'INICIAR_GET_ALL_VIDEOGAMES'

export function getByGenres(payload) {
    return async function(dispatch){
        return dispatch({
            type: GET_BY_GENRES,
            payload
        })
    }
};

export function getVideogames(){
    return async function(dispatch){
        dispatch({
            type: INICIAR_GET_ALL_VIDEOGAMES
        })
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
    }
};

export function getPlatforms(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/platforms");
        return dispatch({
            type: GET_ALL_PLATFORMS,
            payload: json.data
        })
    }
};

export function getDetails(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            });
        } catch (err) {
            console.log(err)
        }
    }
};

export function getGenres() {
    return async function(dispatch) {
        const json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }  
};

export function byOrder (payload) {
    return {
        type: BY_ORDER,
        payload
    }
};

export function created (payload) {
    return {
        type: CREATED,
        payload
    }
};

export function getNameVideoGames (name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_NAME_VIDEOGAMES,
                payload: json.data
            })
        } catch(err) {
            return dispatch({
                type: GET_NAME_VIDEOGAMES_FAILED,
            })
        }
    }
};

export function postVideoGames(payload) {
    return async function(dispatch) {
        const info = await axios.post('http://localhost:3001/videogames', payload)
        return dispatch({
            type: POST,
            info
        })
    
    }
}


export function byRating (rating) {
    return {
        type: BY_RATING,
        payload: rating
    }
};

