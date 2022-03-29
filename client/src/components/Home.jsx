import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { getVideogames, getGenres, getByGenres,byOrder, created, byRating } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './Home.css'



export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    //PAGINADO
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1) //estado local con la 1er pag que se renderiza
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage //15- ultimo indic de cada pagina van cambiando,para poder pag la siguiente
    const indexOfFirstGame = indexOfLastGame - gamesPerPage //0-de el 1er indice de cada pag xq van cambiando
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame )


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() => { //esto sucede cdo el componente componentDidMount(montaj)Update(actual)WillUnmount(desmonta).
        dispatch(getGenres())
        dispatch(getVideogames())  //esta func se ejecuta cada vez que elc com se renderiza muestra los videojuegos cada vez q el compon se monta
     },[dispatch])                //evitta q se genere un bucle infinito de llamados


     function handleClick(e) {
        e.preventDefault(); //es para cdo recargue la pagina no se pierda nada de lo que teniamos 
        dispatch(getVideogames())  
    };

    function handleFilterByGenre(e) {
        e.preventDefault(); //es para cdo recargue la pagina no se pierda nada de lo que teniamos 
        dispatch(getByGenres(e.target.value))  
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    };

    function handleCreated(e) {
        e.preventDefault();
        dispatch(created(e.target.value))
    };

    function handleRating(e) {
        dispatch(byRating(e.target.value))
    }


     return(
         <div>
             <Link to= '/videogames'>Crear Videojuego</Link>
            <h1>VIDEOGAMES</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los videojuegos
            </button>
            <div>
                <select onClick={e => handleFilterByGenre(e) }>
                    <option value='All'>Genero</option>
                    {
                        genres.map((e) => (<option value={e.name}>{e.name}</option>))
                    } 

                </select>
                <select onClick={e => handleCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <select onClick={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option> 
                    <option value='desc'>Descendete</option>
                </select>
                <select onClick={e => handleRating(e)}>
                    <option value='higher'>Mayor Puntuacion</option>
                    <option value='less'>Menor Puntuacion</option>
                </select>
                <div>
                    <Paginado 
                    gamesPerPage= {gamesPerPage}
                    allVideogames= {allVideogames}
                    paginado= {paginado}/>
                    <SearchBar/>       
                </div>

                {
                    currentGames.map((j) => {
                        return (
                            <div>
                            <Link to={'/details/' + j.id}>
                                <Card name={j.name}
                                    image={j.image}
                                    key={j.id}
                                    genres={j.genres }
                                    />
                            </Link>
                              </div>
                             
                        )
                    })
                }
            </div>
         </div>
     )

}