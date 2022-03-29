import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetails } from "../actions";

export default function Details(props) {//paso props como parametro y puedo acceder  al id
    console.log(props)
    const { id } = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch]);

    const myVideoGames = useSelector((state) => state.details);//uso useSelector para acceder al estado details de reducer

    return (
        <div>
            { myVideoGames.length === 0 && <p>Loading..</p> }
            {
                myVideoGames.map((videogame) => (
                    <div>
                        <h1>Soy  {videogame.name}</h1>
                        <img src={videogame.background_image}  alt="" width="500px" height="300px"/>
                        <h2>Plataforma:</h2>
                        <p>{videogame.platforms.map(e => (e.platform.name + " - "))}</p>
                        <h2>Genero: {videogame.genres?.map(e => ( e.name? e.name : e))}</h2>
                        <h4>{videogame.rating}</h4>
                        <h4>{videogame.released}</h4>
                        <p>{videogame.description}</p>
                    </div>
                )) 
                

            }
            {

            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}