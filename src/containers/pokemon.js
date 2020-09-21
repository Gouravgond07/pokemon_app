import React, { useState } from 'react';
import './pokemon.css';
import TypeColor from '../utils/typeColor';

function Pokemon(props) {
    let [isImageLoaded, setIsImageLoaded] = useState(true);

    return (
            <div className="card border pokemon-card py-2" style={{ backgroundColor: TypeColor[props.types[0]] }}>
                <div className="card-body pokemon-card-body" >
                    <h3 className="ml-2 pokemon-name text-capitalize">{props.name} {isImageLoaded}</h3>
                    <ul style={{ width: '50%', padding: '0px' }}>
                        {props.types.map((x, index) => <li key={index} className="chip text-capitalize">{x}</li>)}
                    </ul>
                    {!isImageLoaded ? <div className="lds-dual-ring pokemon-img"></div> : null}
                    <img className="pokemon-img img-fluid"
                        src={props.image}
                        alt={props.name}
                        onLoad={() => setIsImageLoaded(true)}
                        style={{ visibility: isImageLoaded ? 'visible' : 'hidden' }} />
                </div>
            </div>
    )
}

export default Pokemon;