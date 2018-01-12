import Immutable from 'immutable';

//Initial state to mock the Redux store
export const testInitState = Immutable.fromJS({});

/******************************
USED FOR ADDING A BUDGET ENTRY
******************************/
export const testBudgetCategory = {
  budgetName: 'budgetName',
  monthlyCost: '192',
  rollOverEnabled: "rollOverDisabled",
  dueDate: '02'
}

/******************************
USED FOR VALIDATING FIELD ERRORS
*******************************/
export const testBudgetFormEditable = {
  errors: [
    {budgetNameError: false, monthlyCostError: false}
  ]
}

/******************************
UPDATING A BUDGET FIELD
*******************************/
export const testBudgetCategoryAlteration = {
  budgetName: 'budgetNameEdited',
  monthlyCost: '1923',
  rollOverEnabled: "rollOverEnabled",
  dueDate: '03'
}

/***********************************
Export all the functions to be used
************************************/
export default {
  testInitState,
  testBudgetCategory,
  testBudgetFormEditable,
  testBudgetCategoryAlteration
}
