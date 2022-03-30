import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideoGames } from "../actions";
import './SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

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
        <div className="search-bar">
            <input
            type = 'text'
            placeholder="Buscar.."
            onChange={(e) => handleInput(e)}
            />
            <a onClick={(e) => handleSubmit(e)} className="neon-link no-reflect" id="search-button">Buscar</a>
        </div>
    )
}