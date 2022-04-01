import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetails } from "../actions";
import './Details.css'

export default function Details(props) {//paso props como parametro y puedo acceder  al id
    console.log(props)
    const { id } = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch]);

    const myVideoGames = useSelector((state) => state.details);     //uso useSelector para acceder al estado details de reducer

    function mostrarVideoGame(videogame) {
        return (
            <div className="videogame-detail">
                <h1 className="title">Soy  {videogame.name}</h1>
                <img src={videogame.background_image}  alt="" width="500px" height="300px"/>
                <h2>Plataforma:</h2>
                <p>{videogame.platforms.map(e => (e.platform.name + " - "))}</p>
                <h2>Genero: {videogame.genres?.map(e => ( e.name? e.name : e))}</h2>
                <h4>{videogame.rating}</h4>
                <h4>{videogame.released}</h4>
                <div dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
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

    return (
        <div className={myVideoGames.length > 0 ? 'detail' : 'detail cargando'}>
            { myVideoGames.length === 0 && renderCargando() }
            <div className="detail-contenedor">
                { myVideoGames.map(videogame => mostrarVideoGame(videogame)) }
            </div>
            {
                myVideoGames.length > 0 && (
                    <div className="link-contenedor">
                        <Link to='/home' className="neon-link">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Volver
                        </Link>
                    </div>
                )
            }
            
        </div>
    )
}