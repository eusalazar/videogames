import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link,} from 'react-router-dom';
import { getGenres, getPlatforms,postVideoGames } from '../actions';
import './CreateVideoGames.css'

function validate(input, inputName) {
    let errors = {}
    console.log(input)
    if (input.name.length < 1 && inputName === 'name') {
        errors.name = "Se requiere un nombre"
    }
    if (!input.description && inputName === 'description') {
        errors.description = "Complete la descripcion"
    }
    if (!input.released && inputName === 'released') {
        errors.released = "Complete la fecha lanzamiento"
    }
    if (inputName === 'rating' && !input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Puntuacion valida de 0 - 5"
    }
    if (input.genres < 1 && inputName === 'genres') {
        errors.genres = "Ingrese genero"
    }
    if (input.platforms.length < 1 && inputName === 'platforms' ) {
        errors.platforms = "Ingrese plataforma"
    } 
        return errors
}

export default function CreatedGames() {
    const dispatch = useDispatch();
    const genres = useSelector(e => e.genres)
    const platforms = useSelector(e => e.platforms)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({ //inicializo las propiedades del componente para guardar la info del formulario
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    
    })

    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate(
            {
            ...input,
            [e.target.name] : e.target.value
            }, e.target.name
        ))
    
    };

    function handleGenreSelect(e) {
        const genres = [...input.genres]
        if(genres.indexOf(e.target.value) > 0) return null; 
        genres.push(e.target.value)
        setInput({
            ...input,
            genres
        })
    };

    function handlePlatformsSelect(e) {
        const platforms = [...input.platforms]
        if(platforms.indexOf(e.target.value) > 0) return null; 
        platforms.push(e.target.value)
        setInput({
            ...input,
            platforms
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postVideoGames(input))
        alert("Personaje creado!")
        setInput({
            name: '',
            image: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            genres: []
        })
    };

    function handlePlatformDelete(platform, event) {
        event.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter((el) => el !== platform )
        })
    }

    function handleGenreDelete(genre, event) {
        event.preventDefault()
        setInput({
            ...input,
            genres: input.genres.filter((el) => genre !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())
    }, [dispatch])
    
    

    return (
        <div>
            <Link to='/home'>
                Volver
            </Link>
            <h1>Crea tu videojuego!</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text' value={input.name} name='name'
                        onChange={(e) => handleChange(e)}
                    ></input>
                     {
                        errors.name && (
                            <p> {errors.name} </p>
                        )
                    }
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type='url' value={input.image} name='image'
                    onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input
                        type='text' value={input.description} name='description'
                        onChange={(e) => handleChange(e)}
                    ></input>
                    {
                        errors.description && (
                            <p> {errors.description} </p>
                        )
                    }
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                        type='text' value={input.released} name='released'
                        onChange={(e) => handleChange(e)}
                    ></input>
                    {
                        errors.released && (
                            <p> {errors.released} </p>
                        )
                    }
                </div>
                <div>
                    <label>Puntuacion:</label>
                    <input
                        type='text' value={input.rating} name='rating'
                        onChange={(e) => handleChange(e)}
                    ></input>
                    {
                        errors.rating && (
                            <p> {errors.rating} </p>
                        )
                    }
                </div>
                <div>
                    <label>Genero:</label>
                    <select onChange={(e) => handleGenreSelect(e)} name="genres">
                        {
                            genres.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
            
                    <ul>
                        {
                            input.genres?.map((genre) => (
                                <li>
                                    {genre} <button onClick={(event) => handleGenreDelete(genre, event)}>X</button>
                                </li>
                            ))
                        }
                    </ul>

                    {
                        errors.genres && (
                            <p> {errors.genres} </p>
                        )
                    }
                </div>
                <div>
                    <label>Plataforma:</label>
                    <select onChange={(e) => handlePlatformsSelect(e)} name="platforms">
                        {
                            platforms.map((e) => (
                                <option value={e}> {e} </option>
                            ))
                        }
                    </select>
                    <ul>
                        {
                            input.platforms?.map((platform) => (
                                <li>
                                    {platform}
                                    <button onClick={(e) => handlePlatformDelete(platform, e)}>
                                        X
                                    </button>
                                </li>
                            ))
                        }
                    </ul>

                    {
                        errors.platforms && (
                            <p> {errors.platforms} </p>
                        )
                    }
                </div>
                <button type= 'submit'>Crear Videojuego</button>
            </form>
        </div>

    )
    

    
}