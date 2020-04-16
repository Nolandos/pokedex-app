import React from "react";
import PropTypes from "prop-types";

//import components
import { SinglePokemon } from "../../index";

const SinglePokemonPage = ({ match }) => {
  return <SinglePokemon match={match} />;
};

SinglePokemonPage.propTypes = {
  match: PropTypes.object
};

export default SinglePokemonPage;
