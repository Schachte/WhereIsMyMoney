import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

/**************
INITIAL STATE
***************/
const INITIAL_STATE = Immutable.fromJS({
  budgetCategories: [
    {budgetName: 'budgetName', monthlyCost: '$200.00', rollOverEnabled: true, dueDate: 'monthly'}
  ]
});

/**************
TYPES
***************/
export const ADD_BUDGET = 'src/Budget/ADD_BUDGET';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BUDGET:
      console.log('Action payload for adding a budget is' + action.payload)
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

/**************
ACTIONS CREATORS
***************/
export const addBudget = createAction(ADD_BUDGET);

/**************
ACTION REQUESTS
***************/
export function addBudgetCategoryRequest(data) {
  return (dispatch) => {
    dispatch(actionTest(data));
  }
}
