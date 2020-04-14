import axios from "axios";

const compare = (arr1, arr2) => {
  let result = [];
  arr1.forEach(e1 =>
    arr2.forEach(e2 => {
      if (e1.pokemon.name === e2.pokemon.name) {
        result = [...result, e1];
      }
    })
  );
  return result;
};

export const filterByTypes = async (typeFilters, url) => {
  let result = [];
  if (typeFilters.length === 1) {
    const res = await axios.get(`${url}/type/${typeFilters[0]}`);
    result = res.data.pokemon.map(pokemon => pokemon.pokemon);
    return result;
  }
  if (typeFilters.length > 1) {
    for (let i = 0; i < typeFilters.length; i++) {
      const res = await axios.get(`${url}/type/${typeFilters[i]}`);
      if (i === 0) {
        result = res.data.pokemon;
      } else {
        result = compare(result, res.data.pokemon);
      }
    }
  }
  result = result.map(pokemon => pokemon.pokemon);
  return result;
};
