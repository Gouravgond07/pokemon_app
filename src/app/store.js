import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemon-slices';
export default configureStore({
  reducer: {
    pokemon: pokemonReducer
  },
});
