import React from 'react';


function PokemonAbout({ pokemon }) {
    return (
        <div className="row my-3 justify-content-center">
            <div className="col-10">
                <h3 className="mt-5 mb-4 font-weight-bold">About</h3>
            </div>
            <div className="col-10 col-sm-6 m-auto">
                <dl className="row pokemon-tab-info">
                    <dd className="col-4">Height</dd>
                    <dt className="col-8">{(pokemon.height * 0.32808).toFixed(2)} ft ({pokemon.height * 10} cm)</dt>

                    <dd className="col-4">Weight</dd>
                    <dt className="col-8">{(pokemon.weight / 4.5359237).toFixed(2)} lbs ({pokemon.weight / 10} kg)</dt>

                    <dd className="col-4">Abilities</dd>
                    <dt className="col-8 text-capitalize">{pokemon.abilities.join(", ")}</dt>

                    <dd className="col-4">Type</dd>
                    <dt className="col-8 text-capitalize">{pokemon.types.join(", ")}</dt>

                    <dd className="col-4">Egg Groups</dd>
                    <dt className="col-8 text-capitalize">{pokemon.egg_groups.join(", ")}</dt>
                </dl>
            </div>

            <div className="col-10">

                <h3 className="mt-5 mb-4 font-weight-bold">Flavor Text Entries</h3>
                {
                    pokemon.flavor_text_entries.map((x, i) => <div className="d-inline-flex" key={i}>
                        <p className="list-group-item" >
                            <span style={{ fontWeight: 'bold' }}>{i + 1} . </span> {x}
                        </p>
                    </div>)

                }

            </div>
        </div>
    )
}


export default PokemonAbout;