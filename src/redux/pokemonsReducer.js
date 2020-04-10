import axios from "axios";
import { API_URL, IMAGE_URL } from "../config";
import {
  startRequest,
  endRequest,
  errorRequest
} from "./requestsStatusReducer";

// ACTION NAME CREATOR
const reducerName = "pokemons";
const requestName = "pokemons_request";
const createActionName = name => `app/${reducerName}/${name}`;

// ACTION TYPES
export const LOAD_POKEMONS = createActionName("LOAD_POKEMONS");
export const LOAD_SINGLE_POKEMON = createActionName("LOAD_SINGLE_POKEMON");
export const LOAD_POKEMONS_PAGE = createActionName("LOAD_POKEMONS_PAGE");

// ACTIONS
export const loadPokemons = payload => ({
  payload,
  type: LOAD_POKEMONS
});
export const loadSinglePokemon = payload => ({
  payload,
  type: LOAD_SINGLE_POKEMON
});
export const loadPokemonsByPage = payload => ({
  payload,
  type: LOAD_POKEMONS_PAGE
});

// THUNKS
export const loadPokemonsRequest = (limit, offset) => {
  return async dispatch => {
    dispatch(startRequest(requestName));

    try {
      let pokemons = [];
      let res = await axios.get(`${API_URL}/pokemon-species/`, {
        params: {
          limit: 1,
          offset: 1
        }
      });

      const count = res.data.count;

      res = await axios.get(`${API_URL}/pokemon/`, {
        params: {
          limit,
          offset
        }
      });

      pokemons = res.data.results;

      for (let id = offset + 1; id <= offset + limit; id++) {
        let imageUrl = "";
        if (id < 10) imageUrl = `${IMAGE_URL}detail/00${id}.png`;
        if (id >= 10 && id < 100) imageUrl = `${IMAGE_URL}detail/0${id}.png`;
        if (id >= 100) imageUrl = `${IMAGE_URL}detail/${id}.png`;

        pokemons[id - offset - 1] = {
          ...pokemons[id - offset - 1],
          imageUrl,
          id
        };
      }

      const payload = {
        pokemons,
        count
      };

      await dispatch(loadPokemons(payload));
      dispatch(endRequest(requestName));
    } catch (e) {
      dispatch(errorRequest(e, requestName));
    }
  };
};

export const loadSinglePokemonRequest = id => {
  return async dispatch => {
    dispatch(startRequest(requestName));

    try {
      let pokemon = {};
      let res = await axios.get(`${API_URL}/pokemon/${id}`);

      let imageUrl = "";
      if (id < 10) imageUrl = `${IMAGE_URL}full/00${id}.png`;
      if (id >= 10 && id < 100) imageUrl = `${IMAGE_URL}full/0${id}.png`;
      if (id >= 100) imageUrl = `${IMAGE_URL}full/${id}.png`;

      pokemon = { ...res.data, imageUrl };

      res = await axios.get(`${API_URL}/pokemon-species/${id}`);

      pokemon = { ...pokemon, imageUrl, species: res.data };

      await dispatch(loadSinglePokemon(pokemon));
      dispatch(endRequest(requestName));
    } catch (e) {
      dispatch(errorRequest(e.message, requestName));
    }
  };
};

//INITIAL STATE
const initialState = {
  data: [],
  singlePokemon: {},
  count: 0
};

//REDUCER
export default function pokemonsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POKEMONS:
      return {
        ...state,
        data: action.payload.pokemons,
        count: action.payload.count
      };
    case LOAD_SINGLE_POKEMON:
      return { ...state, singlePokemon: action.payload };
    default:
      return state;
  }
}
