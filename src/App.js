import React from 'react';
import Pokemons from './containers/pokemons';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PokemonDetail from './containers/pokemon-detail';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon-detail/:id" component={PokemonDetail} />
        <Route path="/" component={Pokemons} />
      </Switch>
    </Router>


  );
}

export default App;
