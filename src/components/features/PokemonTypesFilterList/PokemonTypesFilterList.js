import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import queryString from "query-string";
import { TypesPokemonIcon } from "../../index";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const ListElement = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 50%;
  &:hover {
    font-weight: bold;
  }
`;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 0;

  .MuiFormControlLabel-root {
    margin-top: 20px;
    margin-bottom: 5px;
    .MuiTypography-body1 {
      font-family: "Comic Neue";
      font-weight: bold;
    }
  }
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 0.7em;
  .inactive {
    color: #bdc3c7;
    ${ListElement}:hover & {
      color: #ecf0f1;
    }
  }

  p {
    display: none;
  }
`;

const Button = styled.button`
  cursor: pointer;
  outline: none;
  margin-top: 20px;
  font-size: 1.5em;
  font-family: "Comic Neue";
  padding: 15px 45px;
  background-color: #ff5a00;
  color: #fff;
  border-radius: 2px;
  font-weight: bold;
  border: none;
  &:hover {
    background-color: #ff7e39;
  }
`;

const PokemonTypesFilterList = () => {
  const types = useSelector(({ pokemons }) => pokemons.types);
  const typesFilter = useSelector(({ filters }) => filters.TYPES_FILTER) || [];
  const match = useSelector(({ filters }) => filters.MATCH_TYPE);
  const [filters, setFilter] = useState({
    match: false,
  });

  const toggleFilter = type => {
    setFilter({ ...filters, [type]: filters[type] ? false : true });
  };

  const handleSubmit = () => {
    let filtersArray = [];
    let temp = {};

    for (const property in filters) {
      if (filters[property] && property !== "match")
        filtersArray.push(`${property}`);
    }
    temp["types"] = filtersArray;
    if (temp.types.length !== 0) {
      temp["match"] = filters["match"];
    }

    let query = queryString.stringify(temp);

    window.location.replace(query ? `/?${query}` : `/`);
  };

  useEffect(() => {
    let filterList = {};
    typesFilter.forEach(filter => {
      filterList[filter] = true;
    });

    setFilter({ ...filters, ...filterList, match });
  }, []);

  return (
    <Wrapper>
      {types.map((type, index) => {
        return (
          <ListElement key={index} onClick={() => toggleFilter(type.name)}>
            <Icon>
              <TypesPokemonIcon
                type={type.name}
                classes={`${!filters[type.name] && "inactive"}`}
              />
            </Icon>
            {type.name}
          </ListElement>
        );
      })}
      <FormControlLabel
        className="checkbox"
        control={
          <Checkbox
            checked={filters["match"]}
            onChange={() => toggleFilter("match")}
            name="match"
          />
        }
        label="Types must match"
      />
      <Button onClick={handleSubmit}>Search</Button>
    </Wrapper>
  );
};

export default PokemonTypesFilterList;
