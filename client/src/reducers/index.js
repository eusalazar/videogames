import { GET_ALL_VIDEOGAMES,
    GET_GENRES,
    GET_BY_GENRES,
    GET_DETAILS,
    BY_ORDER,
    CREATED,
    GET_NAME_VIDEOGAMES,
    POST,
    GET_ALL_PLATFORMS,
    BY_RATING,
    GET_NAME_VIDEOGAMES_FAILED,
    INICIAR_GET_ALL_VIDEOGAMES
    } from "../actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    details: [],
    errorMessage: '',
    cargando: false
};

 function rootReducer (state= initialState, action) {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
               // errorMessage: '',
               cargando: false
            }
        case INICIAR_GET_ALL_VIDEOGAMES:  //consultar
            return {
                ...state,
                cargando: true
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
                
            }
        case GET_BY_GENRES:
            console.log(action.payload)
            if (action.payload === "All") {
                return {...state, videogames: state.allVideogames }
            } else {
                const videogames = state.allVideogames.filter(v => v.genres?.indexOf(action.payload) > -1 ) //cuand no encuentra el gro que le paso me devuelve indice -1 no existe
                return {
                    ...state,
                    videogames
                }
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case BY_ORDER:
            const array = [...state.allVideogames];
            if (action.payload === 'asc') {
                array.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            } else {
                array.sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            };

            return {
                ...state,
                videogames: array
            }
        case CREATED:
            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(e => e.createInBD) : state.allVideogames.filter(e => !e.createInBD)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }
        case GET_NAME_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                errorMessage: "" // vacio mensaje de error
            }
        case GET_NAME_VIDEOGAMES_FAILED:
            return {
                ...state,
                errorMessage: "No hay resultados.", // relleno mensaje de error,
                videogames: []
            }
        case POST:
            return {
                ...state
            }
        case GET_ALL_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case BY_RATING: 
            const byRating = [...state.allVideogames];
            if (action.payload === 'less') {
                byRating.sort(function(a, b) {
                    if(a.rating > b.rating) {
                        return 1;
                    }
                    if(b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                })
            } else {
                byRating.sort(function(a, b) {
                    if(a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            };
            console.log(byRating)
            return {
                ...state,
                videogames: byRating
            }
        default:
            return state
        } 
        };

        export default rootReducer;



 