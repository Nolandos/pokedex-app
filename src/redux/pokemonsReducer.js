import axios from "axios";
import { API_URL, IMAGE_URL } from "../config";
import {
  startRequest,
  endRequest,
  errorRequest,
} from "./requestsStatusReducer";
import { filterByTypes } from "../utils/filterByTypes";
import { createPokemonImageAndGetId } from "../utils/createPokemonImageAndGetId";

// ACTION NAME CREATOR
const reducerName = "pokemons";
const pokemonsRequestName = "pokemons_request";
const singlePokemonsRequestName = "single_pokemon_request";
const createActionName = name => `app/${reducerName}/${name}`;

// ACTION TYPES
export const LOAD_POKEMONS = createActionName("LOAD_POKEMONS");
export const LOAD_SINGLE_POKEMON = createActionName("LOAD_SINGLE_POKEMON");
export const LOAD_POKEMONS_PAGE = createActionName("LOAD_POKEMONS_PAGE");

// ACTIONS
export const loadPokemons = payload => ({
  payload,
  type: LOAD_POKEMONS,
});
export const loadSinglePokemon = payload => ({
  payload,
  type: LOAD_SINGLE_POKEMON,
});
export const loadPokemonsByPage = payload => ({
  payload,
  type: LOAD_POKEMONS_PAGE,
});

// THUNKS
export const loadPokemonsRequest = (limit, offset, filters) => {
  return async dispatch => {
    dispatch(startRequest(pokemonsRequestName));

    try {
      let pokemons = [];
      let count = 807;
      let res = {};

      if (filters.length !== 0) {
        if (filters.types) {
          if (typeof filters.types === "string")
            filters.types = [filters.types];
          pokemons = await filterByTypes(filters.types, API_URL, filters.match);
        }

        pokemons = await createPokemonImageAndGetId(
          pokemons,
          IMAGE_URL,
          "pokemon"
        );

        pokemons = pokemons.filter(pokemon => pokemon.id <= count);

        count = pokemons.length;
        pokemons = pokemons.slice(offset, limit + offset);
      }

      if (filters.length === 0) {
        res = await axios.get(`${API_URL}/pokemon/`, {
          params: {
            limit: 1,
            offset: 1,
          },
        });

        res = await axios.get(`${API_URL}/pokemon/`, {
          params: {
            limit,
            offset,
          },
        });

        pokemons = res.data.results;

        for (let id = offset + 1; id <= offset + limit; id++) {
          const imageUrl = `${IMAGE_URL}${id}.png`;

          pokemons[id - offset - 1] = {
            ...pokemons[id - offset - 1],
            imageUrl,
            id,
          };
        }

        pokemons = pokemons.filter(pokemon => pokemon.id <= count);
      }

      res = await axios.get(`${API_URL}/type/`);
      let types = res.data.results;

      const payload = {
        pokemons,
        count,
        types,
      };

      await dispatch(loadPokemons(payload));
      dispatch(endRequest(pokemonsRequestName));
    } catch (e) {
      dispatch(errorRequest(e, pokemonsRequestName));
    }
  };
};

export const loadSinglePokemonRequest = name => {
  return async dispatch => {
    dispatch(startRequest(singlePokemonsRequestName));

    try {
      let pokemon = {};
      let imageUrl = "";
      let res = await axios.get(`${API_URL}/pokemon/${name}`);

      const id = res.data.id;

      imageUrl = `${IMAGE_URL}${id}.png`;

      pokemon = { ...res.data, imageUrl };

      res = await axios.get(`${API_URL}/pokemon-species/${name}`);

      pokemon = { ...pokemon, imageUrl, species: res.data };

      for (let i = 0; i < pokemon.abilities.length; i++) {
        res = await axios.get(pokemon.abilities[i].ability.url);
        pokemon.abilities[i] = {
          ...pokemon.abilities[i],
          description: res.data.flavor_text_entries,
        };
      }

      res = await axios.get(pokemon.species.evolution_chain.url);
      let evoChain = [];
      let evoData = res.data.chain;

      do {
        evoChain.push({
          name: evoData.species.name,
          url: evoData.species.url,
        });

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

      evoChain = await createPokemonImageAndGetId(
        evoChain,
        IMAGE_URL,
        "pokemon-species"
      );

      pokemon = { ...pokemon, evoChain: evoChain };

      dispatch(loadSinglePokemon(pokemon));
      dispatch(endRequest(singlePokemonsRequestName));
    } catch (e) {
      dispatch(errorRequest(e.message, singlePokemonsRequestName));
    }
  };
};

//INITIAL STATE
const initialState = {
  data: [],
  singlePokemon: {},
  count: 0,
  types: [],
};

//REDUCER
export default function pokemonsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POKEMONS:
      return {
        ...state,
        data: action.payload.pokemons,
        count: action.payload.count,
        types: action.payload.types,
      };
    case LOAD_SINGLE_POKEMON:
      return { ...state, singlePokemon: action.payload };
    default:
      return state;
  }
}
