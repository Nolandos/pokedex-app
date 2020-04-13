// ACTION NAME CREATOR
const reducerName = "filters";
const requestName = "filters_request";
const createActionName = name => `app/${reducerName}/${name}`;

// ACTION TYPES
export const SET_TYPES_FILTER = createActionName("SET_TYPES_FILTER");

// ACTIONS
export const setTypesFilter = payload => ({ payload, type: SET_TYPES_FILTER });

//INITIAL STATE
const initialState = {
  TYPES_FILTER: null,
};

//REDUCER
export default function ordersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TYPES_FILTER:
      return { ...state, TYPES_FILTER: action.payload };
    default:
      return state;
  }
}
