// ACTION NAME CREATOR
const reducerName = "requests";
const createActionName = name => `app/${reducerName}/${name}`;

// ACTION TYPES
export const START_REQUEST = createActionName("START_REQUEST");
export const END_REQUEST = createActionName("END_REQUEST");
export const ERROR_REQUEST = createActionName("ERROR_REQUEST");
export const RESET_REQUEST = createActionName("RESET_REQUEST");

// ACTIONS
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = (error, payload) => ({
  error,
  payload,
  type: ERROR_REQUEST,
});
export const resetRequest = payload => ({ payload, type: RESET_REQUEST });

//INITIAL STATE
const initialState = {
  pokemons_request: {
    pending: false,
    error: null,
    success: null,
  },
  single_pokemon_request: {
    pending: false,
    error: null,
    success: null,
  },
};

//REDUCER
export default function requestsStatusReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        [action.payload]: { pending: true, error: null, success: null },
      };
    case END_REQUEST:
      return {
        ...state,
        [action.payload]: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...state,
        [action.payload]: {
          pending: false,
          error: action.error,
          success: false,
        },
      };
    case RESET_REQUEST:
      return {
        ...state,
        [action.payload]: { pending: false, error: null, success: null },
      };
    default:
      return state;
  }
}
