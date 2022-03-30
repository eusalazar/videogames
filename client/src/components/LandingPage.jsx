import React from "react";
import { Link } from "react-router-dom";
import './landing.css'

export default function LandingPage(){
    return(
        <div className="landing">
            <div className="neon-link-container">
                <Link to='/home' className="neon-link">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Ingresar
                </Link>
            </div>
            
        </div>
    )
}