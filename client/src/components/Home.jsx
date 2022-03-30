import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { getVideogames, getGenres, getByGenres,byOrder, created, byRating } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    const cargando = useSelector((state) => state.cargando)
    const errorMessage = useSelector(state => state.errorMessage)
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

    function splitArray(array, length) {
        const parte = []
        let i = 0 
        const n = array.length;
        while (i < n) {
          parte.push(array.slice(i, i += length));
        }
        return parte;
    }

    function renderCard(game) {
        return (
            <div className="card neon-card no-reflect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Link to={'/details/' + game.id}>
                    <Card name={game.name}
                        image={game.image}
                        key={game.id}
                        genres={game.genres }
                        />
                </Link>
            </div>
        )
    }

    function renderFilaDeJuegos (array) {  
        return (
            <div className="fila">
                { array.map(renderCard) }
            </div>
        )
    }

    function renderCargando () {
        return (
            <div className="loading">
               <Link to='#' className="neon-link">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Cargando...
                </Link>
            </div>
        )
    }

    function renderHeader() {
        return (
            <>
                
                <h1 className="titulo">VIDEOGAMES</h1>
                
                <div className="botones">
                    <Link to= '/videogames' className="neon-link no-relleno no-reflect">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Crear Videojuego
                    </Link>
                    <Link to='#' onClick={e => {handleClick(e)}} className="neon-link no-relleno no-reflect">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Volver a cargar todos los videojuegos
                    </Link>
                </div>
                <div className="filtros">
                    <div className="select">
                        <select onClick={e => handleFilterByGenre(e) }>
                            <option value='All'>Genero</option>
                            {
                                genres.map((e) => (<option value={e.name}>{e.name}</option>))
                            } 
                        </select>
                    </div>
                    <div className="select">
                        <select onClick={e => handleCreated(e)}>
                            <option value='All'>Todos</option>
                            <option value='created'>Creados</option>
                            <option value='api'>Existentes</option>
                        </select>
                    </div>
                    <div className="select">
                        <select onClick={e => handleSort(e)}>
                            <option value='asc'>Ascendente</option> 
                            <option value='desc'>Descendete</option>
                        </select>
                    </div>
                    <div className="select">
                        <select onClick={e => handleRating(e)}>
                            <option value='higher'>Mayor Puntuacion</option>
                            <option value='less'>Menor Puntuacion</option>
                        </select>
                    </div>
                </div>
                <div className="paginado-search-bar-container">
                    <SearchBar/>

                    <Paginado 
                        gamesPerPage= {gamesPerPage}
                        allVideogames= {allVideogames}
                        paginado= {paginado}/>     
                </div>
            </>
        )


    function renderContenido() {
        return (
            <div className="content-container">
                <div className="header-container">
                   {renderHeader()}
                </div>
                <div className="games-container">
                    { gamesInChunk.length === 0 && errorMessage && <h1 className="errorMessage">{errorMessage}</h1> }
                    { gamesInChunk.map(renderFilaDeJuegos) }
                </div>
             </div>
        )
    }

    const gamesInChunk = splitArray(currentGames, 3)

     return(
         <div className={cargando ? 'home cargando' : 'home'}>
             {cargando && renderCargando() }
             {!cargando && renderContenido()}
         </div>
     )

}