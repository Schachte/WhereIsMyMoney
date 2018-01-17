import Immutable from 'immutable';
import * as types from '../actions/actionTypes';

let initialState = Immutable.fromJS({
  budgetItems: [],
  editingBudget: []
});

export default function budgetReducer(state = initialState, action) {
  switch(action.type) {

    case types.ADD_BUDGET:
      return state.updateIn(['budgetItems'],
            arr => arr.push(Immutable.fromJS(action.payload)));

    default:
      return state;
  }
}
