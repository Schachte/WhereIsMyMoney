import * as types from '../actions/actionTypes';

let INIT_STATE = [];

export default function budgetReducer(state = INIT_STATE, action) {
  switch(action.type) {

    case types.LOAD_COURSES_SUCCESS:
      return [...state,
        Object.assign({}, action.payload)];

    case types.ADD_BUDGET:
      return [...state,
        Object.assign({}, action.payload)];

    default:
      return state;
  }
}
