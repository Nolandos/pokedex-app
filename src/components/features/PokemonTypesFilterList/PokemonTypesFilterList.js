import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import queryString from "query-string";
import { TypesPokemonIcon } from "../../index";

const ListElement = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 50%;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 0;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 0.7em;
  &.inactive {
    color: #bdc3c7;
    &:hover {
      color: #ecf0f1;
    }
  }

  p {
    display: none;
  }
`;

const PokemonTypesFilterList = () => {
  const types = useSelector(({ pokemons }) => pokemons.types);
  const typesFilter = useSelector(({ filters }) => filters.TYPES_FILTER) || [];
  const [filters, setFilter] = useState({});

  const toggleFilter = type => {
    setFilter({ ...filters, [type]: filters[type] ? false : true });
  };

  const handleSubmit = () => {
    let filtersArray = [];
    let temp = {};
    for (const property in filters) {
      console.log(`${property}: ${filters[property]}`);
      if (filters[property]) filtersArray.push(`${property}`);
    }
    temp["types"] = filtersArray;
    let query = queryString.stringify(temp);
    window.location.replace(`?${query}`);
    console.log(query);
  };

  useEffect(() => {
    let filterList = {};
    typesFilter.forEach(filter => {
      filterList[filter] = true;
    });

    setFilter({ ...filters, ...filterList });
  }, []);

  return (
    <Wrapper>
      {types.map(type => {
        return (
          <ListElement>
            <Icon onClick={() => toggleFilter(type.name)}>
              <TypesPokemonIcon
                type={type.name}
                classes={`${!filters[type.name] && "inactive"}`}
              />
            </Icon>
            {type.name}
          </ListElement>
        );
      })}
      <button onClick={handleSubmit}>Wyszukaj</button>
    </Wrapper>
  );
};

export default PokemonTypesFilterList;
