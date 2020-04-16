import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPokemonsRequest } from "../../../redux/pokemonsReducer";
import { setTypesFilter, setMatchType } from "../../../redux/filtersReducer";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

//import components
import { Loader, PreviewPokemon, PaginationControlled } from "../../index";

const Pokemons = ({ page, filters }) => {
  const dispatch = useDispatch();
  const pokemons = useSelector(({ pokemons }) => pokemons.data);
  const request = useSelector(({ requests }) => requests.pokemons_request);
  const [pagination, setPagination] = useState({
    limit: 12,
    presentPage: page || 1,
  });

  const count = useSelector(({ pokemons }) =>
    Math.ceil(pokemons.count / pagination.limit)
  );

  const fetchData = () => {
    if (typeof filters.types === "string") filters.types = [filters.types];
    dispatch(setTypesFilter(filters.types));
    if (filters.match) dispatch(setMatchType(filters.match));

    if (page) {
      const offset = (page - 1) * pagination.limit;
      dispatch(loadPokemonsRequest(pagination.limit, offset, filters));
    } else {
      dispatch(loadPokemonsRequest(pagination.limit, 0, filters));
    }

    setPagination({ ...pagination, presentPage: page });
  };

  const setPokemonPerPage = () => {};

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <CardContent className="card-content">
      {request.pending && <Loader />}
      {pokemons.length === 0 && request.pending === false && (
        <Alert variant="filled" severity="warning">
          Pokemons not found!
        </Alert>
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
          filters={filters}
        />
      )}
    </CardContent>
  );
};

Pokemons.propTypes = {
  page: PropTypes.number,
  filters: PropTypes.array,
};

export default Pokemons;
