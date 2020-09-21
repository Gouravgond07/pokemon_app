import React from 'react';
import { Link } from 'react-router-dom';
import './pokemon-evolution-chain.css'

function EvolvePokemon({ props }) {
    return <Link style={{ width: '100%', textDecoration: 'none', color: 'inherit' }} to={`/pokemon-detail/${props.id}`}>
        <img src={props.image} alt="" width="80px" />
        <p className="text-capitalize pokemon-evolution-text">{props.name}</p>
    </Link>
}


function PokemonEvolutionChain({ evolution_chain }) {
    if(evolution_chain.length === 0) {
        return <div className="row mt-5" >
            <div className="col-12">
                <h1 className="text-center " style={{color: 'rebeccapurple'}}>No Evolution Chain Found</h1>
            </div>
        </div>
    }
    return evolution_chain.map((x, index) => (
        <div className="row mt-5" key={index}>
            <div className="col-4 text-center">
                <EvolvePokemon props={x.from} />
            </div>
            <div className="col-3 text-center d-flex justify-content-center align-items-center pokemon-evolution-text"><span>Lvl {x.level}</span></div>
            <div className="col-4 text-center">
                <div className="col text-center">
                    <EvolvePokemon props={x.to} />
                </div>
            </div>
        </div>
    ));
}

export default PokemonEvolutionChain;