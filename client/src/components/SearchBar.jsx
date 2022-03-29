import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideoGames } from "../actions";
import './SearchBar.css'


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const errorMessage = useSelector(state => state.errorMessage)


    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    };

    function handleSubmit(e) {
        e.preventDefault()
         dispatch(getNameVideoGames(name))
    }



    return (
        <div>
            <input
            type = 'text'
            placeholder="Buscar.."
            onChange={(e) => handleInput(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            {errorMessage && (<p>{errorMessage}</p>)}
        </div>
    )
}