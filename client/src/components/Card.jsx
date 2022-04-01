import React from "react";

export default function Card({name,image,genres}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{genres?.map(e => e?.name || e).join(", ")}</h5>
            <img src={image} alt='img not found' width='200px' heigt='250px'/>
        </div>
    )
}