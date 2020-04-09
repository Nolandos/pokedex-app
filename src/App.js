import React from "react";
import { Switch, Route } from "react-router-dom";

//import components
import {
  HomePage,
  NotFoundPage,
  MainLayout,
  SinglePokemonPage,
} from "./components";

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/:page?" exact component={HomePage} />
        <Route path="/pokemon/:id" exact component={SinglePokemonPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MainLayout>
  );
}

export default App;
