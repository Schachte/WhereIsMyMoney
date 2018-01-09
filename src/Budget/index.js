import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

/**************
INITIAL STATE
***************/
const INITIAL_STATE = Immutable.fromJS({
  budgetCategories: [
    {budgetName: 'budgetName', monthlyCost: '$200.00', rollOverEnabled:true , dueDate: '02'}
  ],
  budgetFormEditable: {editable: false, fieldName: null}
});

/**************
TYPES
***************/
export const ADD_BUDGET = 'src/Budget/ADD_BUDGET';
export const UPDATE_FIELD_ENABLE = 'src/Budget/UPDATE_FIELD_ENABLE';
export const UPDATE_BUDGET_ENTRY = 'src/Budget/UPDATE_BUDGET_ENTRY';

/**************
REDUCER LOGIC FLOW
***************/
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BUDGET:
      return state.updateIn(['budgetCategories'], arr => arr.push(Immutable.fromJS(action.payload)))

    case UPDATE_FIELD_ENABLE:
      return state.setIn(['budgetFormEditable'], Immutable.fromJS(action.payload));

    case UPDATE_BUDGET_ENTRY:
      return state.setIn(
        [
          'budgetCategories',
          action.payload.editedStateIndex,
        ], Immutable.fromJS(action.payload.newBudget));

    default:
      return state;
  }
}

/**************
ACTIONS CREATORS
***************/
export const addBudget = createAction(ADD_BUDGET);
export const updateFieldEnable = createAction(UPDATE_FIELD_ENABLE);
export const updateBudgetEntry = createAction(UPDATE_BUDGET_ENTRY);

/**************
ACTION REQUESTS
***************/
//TODO: Honestly, this is pretty unnecessary as I am not resolving promises
export function addBudgetCategoryRequest(data) {
  return (dispatch) => {
    dispatch(addBudget(data));
  }
}

export function updateFieldEnableRequest(data) {
  return (dispatch) => {
    dispatch(updateFieldEnable(data))
  }
}
