import * as types from '../actions/actionTypes';

export default function budgetReducer(state = ['test'], action) {
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
