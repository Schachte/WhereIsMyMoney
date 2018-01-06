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

/**************
REDUCER LOGIC FLOW
***************/
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BUDGET:
      console.log("Payload is:");
      console.log(action.payload);
      return state.updateIn(['budgetCategories'], arr => arr.push(Immutable.fromJS(action.payload)))
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
    dispatch(addBudget(data));
  }
}
