import React from 'react';
import { useEffect } from 'react';
import { getSelectedPokemon, selectedPokemon, isLoading, pokemonError } from '../slices/pokemon-slices';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './pokemon-detail.css';
import './pokemon.css';

import TypeColor from '../utils/typeColor';
import BaseState from '../components/base-state';
import PokemonEvolutionChain from '../components/pokemon-evolution-chain';
import PokemonAbout from '../components/pokemon-about';


function PokemonDetail(props) {
    const dispatch = useDispatch();
    const [pokemonId, setPokeomId] = useState('1')
    const pokemon = useSelector(selectedPokemon);
    const isLoadingState = useSelector(isLoading);
    const pokemonErrorSelector = useSelector(pokemonError);
    useEffect(() => {
        dispatch(getSelectedPokemon(props.match.params.id))
        setPokeomId(props.match.params.id);
    }, [props.match.params.id, dispatch]);

    if (pokemonErrorSelector.isError) {
        return (<div className="row">
            <div className="col-12 mt-5 text-center">
                <h1>{pokemonErrorSelector.error}</h1>
            </div>
        </div>);
    }
    if (isLoadingState) {
        return (<div className="row">
            <div className="col-12 mt-5 text-center">
                <div className="lds-dual-ring"></div>;
                </div>
        </div>);
    }
    if (!pokemon) {
        return null;
    }


    return (
        <div className="container-fluid h-100" style={{ background: TypeColor[pokemon.types[0]] }}>
            <div className="row h-100">
                <div className="col-12 col-sm-10 col-sm-8 h-100 m-auto">
                    <div className="row h-100">

                        <div className="col-12" style={{ height: '20%' }}>
                            <div className="row">
                                <div className="col">
                                    <h1 className="pokemon-name pt-5 pl-5 text-capitalize" style={{ color: 'white', fontSize: 'xxx-large' }}>{pokemon.name}</h1>
                                </div>
                                <div className="col-2">
                                    <img 
                                    onClick = { () => props.history.push('/')}
                                    src="https://findicons.com/files/icons/1580/devine_icons_part_2/128/home.png" alt=""
                                        style={{
                                            width: '40px',
                                            filter: 'invert(1)',
                                            paddingTop: '5rem',
                                            cursor: 'pointer'
                                        }} />
                                </div>
                            </div>

                        </div>
                                        
                        <div className="col-12 d-flex justify-content-center" style={{ height: '20%', position: "relative" }}>
                            <img className="img-fluid" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`} alt="" style={{ position: 'absolute', zIndex: 1, height: '200px', bottom: '-30%' }} />
                        </div>

                        <div className="col-12" style={{ minHeight: '60%', background: 'white', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
                            <div className="pt-5">
                                <ul className="nav nav-tabs pokenav pt-5 justify-content-center row">
                                    <li className="active"><a data-toggle="tab" href="#about">About</a></li>
                                    <li><a data-toggle="tab" href="#base-state">Base State</a></li>
                                    <li><a data-toggle="tab" href="#evolution">Evolution</a></li>
                                    <li><a data-toggle="tab" href="#moves">Moves</a></li>
                                </ul>

                                <div className="tab-content">
                                    <div id="about" className="tab-pane active">
                                        <PokemonAbout pokemon={pokemon} />

                                    </div>
                                    <div id="base-state" className="tab-pane ">
                                        <div className="row my-3 justify-content-center">
                                            <div className="col-10 col-sm-8 m-auto">
                                                <BaseState stats={pokemon.stats} />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="evolution" className="tab-pane ">
                                        <div className="row my-3 justify-content-center">
                                            <div className="col-10 col-sm-6 m-auto">
                                                <h1>Evolution Chain</h1>
                                                <PokemonEvolutionChain evolution_chain={pokemon.evolution_chain} />

                                            </div>
                                        </div>
                                    </div>
                                    <div id="moves" className="tab-pane ">
                                        <div className="row my-3 justify-content-center">
                                            <div className="col-10 m-auto text-center">
                                                {
                                                    pokemon.moves.map((x, index) => <span key={index} className="badge badge-pill badge-dark m-2 p-3 text-capitalize">{x}</span>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PokemonDetail;