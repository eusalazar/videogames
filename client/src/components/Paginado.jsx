import React from "react";
import './Paginado.css'


export default function Paginado ({gamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allVideogames.length / gamesPerPage); i++){
       pageNumbers.push(i) 
    }

    return ( 
        <div className="paginado">
            <nav>
                <ul className="horizontal-list">
                    {
                    pageNumbers.map(number => ( // es cada una de las pag que necesito para renderizar todos los personajes
                        <li>
                            <a href="#" onClick={() => paginado(number)} className='neon-link paginado no-relleno no-reflect'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                {number}
                            </a>
                        </li>
                    ))

                    }
                </ul>
            </nav>
        </div>
    )
};