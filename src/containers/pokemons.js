import React, { Component } from 'react';
import Pokemon from './pokemon';
import { connect } from 'react-redux';
import { getPokemons, setInilizeState } from '../slices/pokemon-slices';
import './pokemon.css';
import { Link } from 'react-router-dom';  

class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 12
        }
    }
    componentDidMount() {
        const pokemonsLocal = localStorage.getItem('pokemon');
        
        if(pokemonsLocal) {
            const pokemons = JSON.parse(pokemonsLocal);
            this.props.setPokemonInilizeState(pokemons)
        }
        else if(this.props.pokemons.length === 0) {
            this.props.getPokemons(this.props.page,this.state.size);
        }
        
    }

    increasePage = () => {
        this.props.getPokemons(this.props.page + 1, this.state.size);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-12">
                <h1 className="text-center my-3">Pokemons {this.props.pokemons.length} / {this.props.totalCount} </h1>
                </div>
                <div className="col-12">
                    <div className="row">
                    { this.props.pokemons.map((x, index) => (
                        <div key={x.id} className="col-6 col-sm-6 col-md-4 my-2  d-flex justify-content-center">
                            <Link style={{width: '100%', textDecoration: 'none'}} to={`/pokemon-detail/${x.id}`}>
                                <Pokemon name={x.name} id={x.id} image={x.image} types={x.types}/>
                            </Link>
                        </div>
                    ))} 
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center  my-3">
                    { this.props.isLoading ? <div className="lds-dual-ring"></div> : <button className="btn btn-primary text-center" onClick={this.increasePage}>Load More</button>}
                </div>             
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    pokemons: state.pokemon.pokemons,
    totalCount: state.pokemon.totalCount,
    page: state.pokemon.page,
    isLoading: state.pokemon.isLoading
})

const mapDispatchToProps = dispatch => {
    return {
      getPokemons: (page, size) => dispatch(getPokemons(page, size)),
      setPokemonInilizeState: (pokemons) => dispatch(setInilizeState({state: pokemons}))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons) ;