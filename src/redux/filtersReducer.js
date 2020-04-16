// ACTION NAME CREATOR
const reducerName = "filters";
const createActionName = name => `app/${reducerName}/${name}`;

// ACTION TYPES
export const SET_TYPES_FILTER = createActionName("SET_TYPES_FILTER");
export const SET_MATCH_TYPE = createActionName("SET_MATCH_TYPE");

// ACTIONS
export const setTypesFilter = payload => ({ payload, type: SET_TYPES_FILTER });
export const setMatchType = payload => ({ payload, type: SET_MATCH_TYPE });

//INITIAL STATE
const initialState = {
  TYPES_FILTER: null,
  MATCH_TYPE: false,
};

//REDUCER
export default function ordersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TYPES_FILTER:
      return { ...state, TYPES_FILTER: action.payload };
    case SET_MATCH_TYPE:
      return { ...state, MATCH_TYPE: action.payload };
    default:
      return state;
  }
}
