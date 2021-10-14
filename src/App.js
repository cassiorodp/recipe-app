// React
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { Route, Switch } from 'react-router';

// Children
import {
  Login,
  Recipes,
  Details,
  Progress,
  Profile,
  Explore,
  Done,
  Favorites,
  NotFound,
} from './pages';

function App() {
  return (
    <Switch>
      {/* Login */}
      <Route exact path="/" component={ Login } />

      {/* Recipes */}
      <Route
        exact
        path="/bebidas"
        render={ () => <Recipes foodDrink="drinks" /> }
      />
      <Route
        exact
        path="/comidas"
        render={ () => <Recipes foodDrink="meals" /> }
      />

      {/* Details */}
      <Route
        exact
        path="/comidas/:id"
        render={ () => <Details foodDrink="meals" /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ () => <Details foodDrink="drinks" /> }
      />

      {/* Progress */}
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ () => <Progress foodDrink="meals" /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ () => <Progress foodDrink="drinks" /> }
      />

      {/* Profile */}
      <Route exact path="/perfil" component={ Profile } />

      {/* Explore */}
      <Route
        exact
        path="/explorar"
        render={ () => <Explore /> }
      />
      <Route
        exact
        path="/explorar/comidas"
        render={ () => <Explore foodDrink="meals" /> }
      />
      <Route
        exact
        path="/explorar/bebidas"
        render={ () => <Explore foodDrink="drinks" /> }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        render={ () => <Explore foodDrink="meals" explore="area" /> }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        render={ () => <Explore foodDrink="meals" explore="ingredients" /> }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        render={ () => <Explore foodDrink="drinks" explore="ingredients" /> }
      />

      {/* Done */}
      <Route exact path="/receitas-feitas" component={ Done } />

      {/* Favorites */}
      <Route exact path="/receitas-favoritas" component={ Favorites } />

      {/* Not Found */}
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
