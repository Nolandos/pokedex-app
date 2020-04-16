import React from "react";
import queryString from "query-string";

//import components
import { Pokemons } from "../../index";

const HomePage = props => {
  let filters = queryString.parse(props.location.search);
  delete filters.page;
  if (Object.entries(filters).length === 0) filters = [];
  if (filters.types) {
    filters.match = filters.match === "true";
  } else {
    delete filters.match;
  }
  const page = parseInt(queryString.parse(props.location.search).page);

  return <Pokemons page={page} filters={filters} />;
};

export default HomePage;
