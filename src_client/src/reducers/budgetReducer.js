import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

let initialState = Immutable.fromJS({
  budgetItems: [],
  editingBudget: [{}]
});

export default function budgetReducer(state = initialState, action) {
  switch(action.type) {

    case types.ADD_BUDGET:
      return state.updateIn(['budgetItems'],
            arr => arr.push(Immutable.fromJS(action.payload)));

    case types.ADD_BUDGET_EDIT:
      return state.setIn(['editingBudget', 0], Immutable.fromJS(action.payload));

    case types.CLEAR_EDITED_BUDGET:
      return state.setIn(['editingBudget', 0], Immutable.fromJS([]));

    case types.UPDATE_EXISTING_BUDGET:
      return state.setIn(['budgetItems', getIdxOfBudget(state, action)],
                          Immutable.fromJS(action.payload[0]));

    case types.REMOVE_BUDGET:
      return state.removeIn(['budgetItems', getIdxOfBudget(state, action)]);

    default:
      return state;
  }
}

// Find the exact index of a budget within the state budget items list
const getIdxOfBudget = (state, action) => {
  return state.getIn(['budgetItems']).findIndex(function(item) {
    switch(action.type) {
      case types.UPDATE_EXISTING_BUDGET:
        return (item.get("budgetCategory") === action.payload[1].budgetCategory);
      case types.REMOVE_BUDGET:
        return (item.get("budgetCategory") === action.payload.budgetCategory);
    }
  });
};
