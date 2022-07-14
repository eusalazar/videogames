import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { getGenres, getPlatforms,postVideoGames } from '../actions';
import './CreateVideoGames.css'

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Se requiere un nombre"
    }
    if (!input.description) {
        errors.description = "Complete la descripcion"
    } 
    if (!input.released) {
        errors.released =  "Complete la fecha lanzamiento"
    } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)) { //expresion regular
        errors.released = 'Formato admitido dd/mm/aaaa';
    } else {
        errors.released = ""
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Puntuacion valida de 0 - 5"
    } 
    if (input.genres < 1) {
        errors.genres = "Ingrese genero"
    } else {
        errors.platforms = ""
    }
    if (!input.platforms.length) {
        errors.platforms = "Ingrese plataforma"
    }
    return errors
}

export default function CreatedGames() {
    const dispatch = useDispatch();
    const genres = useSelector(e => e.genres)
    const platforms = useSelector(e => e.platforms)
    const navegar = useNavigate();
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Seleccionar Genero------
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
    }
    //-----Seleccionar Plataforma-----
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.platforms]: e.target.value
        }))
    }
    //-----Enviar formulario-----
    function handleSubmit(e) {
        if (errors.name || errors.description || errors.platforms || errors.rating || errors.genres ) {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(postVideoGames(input))
            setInput({
                name: "",
                image: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                genres: [],
                platforms: [] //eslint-disable-line
            })
            navegar('/home')
        }
    }
    //-----Eliminar plataforma-----
    function handlePlatformDelete(platform, event) {
        event.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter((el) => el !== platform )
        })
    }
    //-----Eliminar genero-----
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
                        {
                            errors.image && (
                                <span className="error"> {errors.image} </span>
                            )
                        }
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
                                        <h3 className="color">{genre}</h3> <button onClick={(event) => handleGenreDelete(genre, event)}>X</button>
                                    </li>
                                ))
                            }
                        </ul>

                        {
                            errors.genres && (
                                <span className="error"> {errors.genres} </span>
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
                                       <h3 className="color">{platform}</h3>
                                        <button onClick={(e) => handlePlatformDelete(platform, e)}>
                                            X
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                        {
                            errors.platforms && (
                                <span className="error"> {errors.platforms} </span>
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