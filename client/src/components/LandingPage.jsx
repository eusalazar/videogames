import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className="background">
            <div>
                <h1>Bienvenidos</h1>
                <p>Desarrollador: Eugenia Salazar Acuña</p>
                <p>Obejtivo: Proyecto Invidual Soy Henry</p>
                <p>Lenguaje de Programación: JavaScript</p>
                <p>Tecnologias: React - Redux - NodeJs - CSS - PostgreSQL - Sequelize - Express</p>
            </div>
            <div>
            <Link to='/home'>
                <button>Ingresar</button>
             </Link>
            </div>
        </div>
    )
}