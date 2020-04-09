import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPokemonsRequest } from "../../../redux/pokemonsReducer";
import CardContent from "@material-ui/core/CardContent";

//import components
import { Loader, PreviewPokemon, PaginationControlled } from "../../index";

const Pokemons = ({ match }) => {
  const dispatch = useDispatch();
  const pokemons = useSelector(({ pokemons }) => pokemons.data);
  const request = useSelector(({ requests }) => requests.pokemons_request);
  const [pagination, setPagination] = useState({
    limit: 12,
    presentPage: parseInt(match.params.page) || 1,
  });

  const count = useSelector(({ pokemons }) =>
    Math.ceil(pokemons.count / pagination.limit)
  );

  const fetchData = () => {
    if (parseInt(match.params.page)) {
      const offset = (parseInt(match.params.page) - 1) * pagination.limit;
      dispatch(loadPokemonsRequest(pagination.limit, offset));
    } else {
      dispatch(loadPokemonsRequest(pagination.limit, 0));
    }

    setPagination({ ...pagination, presentPage: parseInt(match.params.page) });
  };

  const setPokemonPerPage = () => {};

  useEffect(() => {
    fetchData();
  }, [match.params.page]);

  return (
    <CardContent className="test-pokemons">
      {request.pending && <Loader />}
      {pokemons.length === 0 && request.pending === false && (
        <h1>Brak Pokemonów</h1>
      )}
      {request.success &&
        pokemons.map((pokemon, index) => {
          return <PreviewPokemon key={index} pokemon={pokemon} />;
        })}
      {request.success && (
        <PaginationControlled
          count={count}
          setPokemonPerPage={setPokemonPerPage}
          pagination={pagination}
        />
      )}
    </CardContent>
  );
};

export default Pokemons;
