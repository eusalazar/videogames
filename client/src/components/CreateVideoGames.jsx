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
    } else if(inputName === 'name') {
        errors.name = null;
    }
    if (!input.description && inputName === 'description') {
        errors.description = "Complete la descripcion"
    } else if (inputName === 'description') {
        errors.description = null;
    }
    if (!input.released && inputName === 'released') {
        errors.released = "Complete la fecha lanzamiento"
    } else if (inputName === 'released') {
        errors.released = null;
    }
    if (inputName === 'rating' && !input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Puntuacion valida de 0 - 5"
    } else if (inputName === 'rating') {
        errors.rating = null;
    }
    if (input.genres < 1 && inputName === 'genres') {
        errors.genres = "Ingrese genero"
    } else if (inputName === 'genres') {
        errors.genres = null;
    }
    if (input.platforms.length < 1 && inputName === 'platforms' ) {
        errors.platforms = "Ingrese plataforma"
    } else {
        errors.platforms = null;
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
        const allErrors = validate(
            {
            ...input,
            [e.target.name] : e.target.value
            }, e.target.name
        ) 
        setErrors( 
            {
                ...errors,  // todos los errores anteriores
                ...allErrors
            } 
        )
    
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
        <div className="create-video-games">
            
            <div className="form-contenedor">
                <h1>Crea tu videojuego!</h1>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="user-box">
                        <input
                            type='text' value={input.name} name='name'
                            onChange={(e) => handleChange(e)}
                            required='required'
                        />
                        <label>Nombre</label>
                        {
                            errors.name && (
                                <span className="error"> {errors.name} </span>
                            )
                        }
                    </div>
                    <div className="user-box">
                        <input
                        type='url' value={input.image} name='image'
                        onChange={(e) => handleChange(e)}
                        required='required'
                        ></input>
                        <label>Imagen</label>
                    </div>
                    <div className="user-box">
                        <input
                            type='text' value={input.description} name='description'
                            onChange={(e) => handleChange(e)}
                            required='required'
                        ></input>
                        <label>Descripcion</label>
                        {
                            errors.description && (
                                <span className="error"> {errors.description} </span>
                            )
                        }
                    </div>
                    <div className="user-box">
                        <input
                            type='text' value={input.released} name='released'
                            onChange={(e) => handleChange(e)}
                            required='required'
                        ></input>
                        <label>Fecha de lanzamiento</label>
                        {
                            errors.released && (
                                <p className="error"> {errors.released} </p>
                            )
                        }
                    </div>
                    <div className="user-box">
                        <input
                            type='text' value={input.rating} name='rating'
                            onChange={(e) => handleChange(e)}
                            required='required'
                        ></input>
                        <label>Puntuacion</label>
                        {
                            errors.rating && (
                                <p className="error"> {errors.rating} </p>
                            )
                        }
                    </div>
                    <div className="user-box">
                        <select onChange={(e) => handleGenreSelect(e)} name="genres">
                            {
                                genres.map((e) => (
                                    <option value={e.name}> {e.name} </option>
                                ))
                            }
                        </select>
                        <label>Genero</label>
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
                    <div className="user-box">
                        <select onChange={(e) => handlePlatformsSelect(e)} name="platforms">
                            {
                                platforms.map((e) => (
                                    <option value={e}> {e} </option>
                                ))
                            }
                        </select>
                        <label>Plataforma</label>
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
                </form>
            </div>
            <div className="header">
                <Link to='/home' className="neon-link">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Volver
                </Link>
                <Link to='#' className="neon-link button-create" onClick={e => handleSubmit(e)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Crear Personaje
                </Link>
            </div>
        </div>

    )
    

    
}