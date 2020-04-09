import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSinglePokemonRequest } from "../../../redux/pokemonsReducer";

//import components
import { Loader } from "../../index";

const SinglePokemon = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector(({ pokemons }) => pokemons.singlePokemon);
  const request = useSelector(({ requests }) => requests.pokemons_request);

  const fetchData = () => {
    dispatch(loadSinglePokemonRequest(parseInt(match.params.id)));
  };

  useEffect(() => {
    fetchData();
  }, [match.params.id]);

  return (
    <div>
      {request.pending && <Loader />}
      {request.success && <h1>{pokemon.name}</h1>}
    </div>
  );
};

export default SinglePokemon;
