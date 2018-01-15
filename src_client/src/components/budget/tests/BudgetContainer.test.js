import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Budget from '../Budget';
import AddBudgetForm from '../AddBudgetForm';

import * as actionTypes from '../../../actions/actionTypes';
import * as budgetActions from '../../../actions/budgetActions';
import configureStore from '../../../store/configureStore';

/*****************************************
BUDGET INTEGRATION TEST FOR THE REDUX STORE
*****************************************/
let expectedBudget_1 = {
   budgetCategory: 'TEST_CATEGORY',
   budgetCost: '5.00',
   budgetDate: '25'
 };

let expectedBudget_2 = {
   budgetCategory: 'TEST_CATEGORY_2',
   budgetCost: '6.00',
   budgetDate: '30'
 };

describe("Adding budgets to the redux store", () => {
  let tempStore = configureStore();
  it("Should successfully add a new budget from the action -> reducer -> store", () => {

    // Dispatch the add action
    let addBudgetAction = budgetActions.addBudget(expectedBudget_1);
    tempStore.dispatch(addBudgetAction);

    // Grab the matching piece of the redux store
    let actualStoreBudget = tempStore.getState().budgets[0];
    expect(expectedBudget_1).toEqual(actualStoreBudget);
  });

  it ("Should add a second item into the redux store and assert that it's there", () => {

    // Dispatch the add action
    let addBudgetAction = budgetActions.addBudget(expectedBudget_2);
    tempStore.dispatch(addBudgetAction);

    // Grab the matching piece of the redux store
    let actualStoreBudget_1 = tempStore.getState().budgets[0];
    let actualStoreBudget_2 = tempStore.getState().budgets[1];

    expect(expectedBudget_1).toEqual(actualStoreBudget_1);
    expect(expectedBudget_2).toEqual(actualStoreBudget_2);
  });
});
