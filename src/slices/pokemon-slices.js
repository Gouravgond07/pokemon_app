import { createSlice } from '@reduxjs/toolkit';
import * as PokemonService from '../services/pokemon-service';
export const pokemonSlice = createSlice({
  name: 'counter',
  initialState: {
    pokemons: [],
    selectedPokemon: null,
    totalCount: 0,
    page: 0,
    size: 10,
    isError: false,
    error: null,
    isLoading: false
  },
  reducers: {
    addPokemons: (state, action) => {
      state.pokemons = action.payload.pokemons;
      state.totalCount = action.payload.totalCount;
      state.page = action.payload.page;
      state.size = action.payload.size;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload.selectedPokemon
    },
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload.error;
    },
    setInilizeState: (state, action) => ({...action.payload.state})
  },
});

export const { addPokemons, decrement, incrementByAmount, setLoading, setSelectedPokemon, setError, setInilizeState } = pokemonSlice.actions;



export const getPokemons = (page = 0, size=10) => async (dispatch, getState) => {
  try {
    
    const { pokemon } = getState();
    if(page < pokemon.page) {
      return;
    }
    dispatch(setLoading({isLoading: true}));
    const pokemons = await PokemonService.getPokemons(page,size);
    pokemons.results =  pokemons.results.map(
      async (pokemon) => {
        const temp = await PokemonService.getDataByUrl(pokemon.url);
        return {
          id: temp.id,
          name: pokemon.name,
          types: temp.types.map(x => x.type.name),
          image: temp.sprites.other['official-artwork'].front_default
          // image: temp.sprites.other['dream_world'].front_default
          // image: temp.sprites.front_default
        };
      }
    );
    pokemons.results = await Promise.all(pokemons.results);
    dispatch(addPokemons({pokemons: pokemon.pokemons.concat(pokemons.results), totalCount: pokemons.count, page,size}));
    dispatch(setLoading({isLoading: false}));  
    const current_state = getState();
    localStorage.setItem('pokemon', JSON.stringify(current_state.pokemon));
  } catch (error) {
    console.log(error);
  }
}

const get_evolutions = (chain, chain_name=[], chain_level=[]) => {
  if(!chain || !chain.evolves_to || chain.evolves_to.lenght === 0) {
    return {
      chain_name,
      chain_level
    }
  }
  if(chain && chain.evolution_details && chain.evolution_details.length > 0) {
    chain_level.push(chain.evolution_details[0].min_level)
  }
  chain_name.push(chain.species.name);
  return get_evolutions(chain.evolves_to[0], chain_name, chain_level)
}

const map_evolution = (chain_name, chain_level) => {
  let i=0, j=1, k=0;
  const ans = [];
  while(j < chain_name.length) {
    let temp = {
      to: {...chain_name[j]},
      level: chain_level[k],
      from: {...chain_name[i]}
    }
    i +=1;
    j +=1;
    k +=1;
    ans.push(temp)
  }
  return ans;
}

const createData = (pokemon, pokemonSpecies, moifie_evol_chain) => {
  return {
    name: pokemon.name,
    stats: pokemon.stats.map(stat => ({name: stat.stat.name.replace('-', ' '), power: stat.base_stat})),
    types: pokemon.types.map(type => type.type.name),
    image: pokemon.sprites.other['official-artwork'].front_default,
    weight: pokemon.weight,
    height: pokemon.height,
    id: pokemon.id,
    abilities: pokemon.abilities.map(ability => ability.ability.name),
    moves: pokemon.moves.map(move => move.move.name.replace('-', ' ')),
    egg_groups: pokemonSpecies.egg_groups.map(egg_group => egg_group.name.replace('-', ' ')),
    has_gender_differences: pokemonSpecies.has_gender_differences,
    hatch_counter: pokemonSpecies.hatch_counter,
    evolution_chain: moifie_evol_chain,
    flavor_text_entries: Array.from(new Set(pokemonSpecies.flavor_text_entries.filter(x => x.language.name === 'en').map(x => x.flavor_text.replace('↵', ' ').replace('', ' '))))
  };
}

export const getSelectedPokemon = (id) => async (dispatch) => {
  try {
    dispatch(setLoading({isLoading: true}));
    const pokemon = await PokemonService.getDataByUrl(PokemonService.BaseURL + `pokemon/${id}`);
    const pokemonSpecies = await PokemonService.getPokemonSpecies(id);
    const pokemonEvolutions = await PokemonService.getDataByUrl(pokemonSpecies.evolution_chain.url);
    const evol_chain = get_evolutions(pokemonEvolutions.chain);
    const data =  evol_chain.chain_name.map(async (x) => {
      const y = await PokemonService.getDataByUrl(PokemonService.BaseURL + `pokemon/${x}`);
      const image = y.sprites.other['official-artwork'].front_default
      return {name: x, image, id: y.id}
    });
    const evol_maped_chain_name = await Promise.all(data)
    const moifie_evol_chain = map_evolution(evol_maped_chain_name, evol_chain.chain_level);
    const cretedPokemon = createData(pokemon, pokemonSpecies, moifie_evol_chain);
    dispatch(setSelectedPokemon({selectedPokemon: cretedPokemon}));
    dispatch(setLoading({isLoading: false}));
  } catch (error) {
    console.log(error);
    dispatch(setLoading({isLoading: false}));
    dispatch(setError({error: 'Error in finding Pokemon'}))
  }
}


export const selectedPokemon = state => state.pokemon.selectedPokemon;
export const isLoading = state => state.pokemon.isLoading;
export const pokemonError = state => ({isError: state.pokemon.isError, error: state.pokemon.error})
export default pokemonSlice.reducer;
