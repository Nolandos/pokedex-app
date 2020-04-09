import React from "react";

//import components
import { Pokemons } from "../../index";

const HomePage = ({ match }) => {
  return <Pokemons match={match} />;
};

export default HomePage;
