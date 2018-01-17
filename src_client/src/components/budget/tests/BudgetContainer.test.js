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

/*****************************************
FULL JSDOM COMPONENT RENDER
*****************************************/
const setupMount = (
    tempStore = null,
    budgetObject = { budgetCategory: 'budget category', budgetCost: 5, budgetDate: 3 }
  ) => {
  let props = {
    budgetObject: budgetObject,
    budgets: [],
    actions: {addBudget: (formData) => {
      let addBudgetAction = budgetActions.addBudget(formData);
      tempStore.dispatch(addBudgetAction);
    }}
  };
  return mount(<Budget {...props} />);
};

/*****************************************
TESTS
*****************************************/
describe("Adding budgets to the redux store", () => {
  let tempStore = configureStore();
  it("Should successfully add a new budget from the action -> reducer -> store", () => {

    // Dispatch the add action
    let addBudgetAction = budgetActions.addBudget(expectedBudget_1);
    tempStore.dispatch(addBudgetAction);

    // Grab the matching piece of the redux store
    let actualStoreBudget = tempStore.getState().toJS().budgets.budgetItems[0];
    expect(expectedBudget_1).toEqual(actualStoreBudget);
  });

  it ("Should add a second item into the redux store and assert that it's there", () => {

    // Dispatch the add action
    let addBudgetAction = budgetActions.addBudget(expectedBudget_2);
    tempStore.dispatch(addBudgetAction);

    // Grab the matching piece of the redux store
    let actualStoreBudget_1 = tempStore.getState().toJS().budgets.budgetItems[0];
    let actualStoreBudget_2 = tempStore.getState().toJS().budgets.budgetItems[1];

    expect(expectedBudget_1).toEqual(actualStoreBudget_1);
    expect(expectedBudget_2).toEqual(actualStoreBudget_2);
  });
});

describe("Clicking the Add Budget button when form is valid", () => {

  //Setup fake redux store to mock data insertion
  let tempStore = configureStore();
  let wrapper = setupMount(tempStore, expectedBudget_1);
  let formSubmissionBtn = wrapper.find('[name="submit-budget-form"]');

  it("Sends the valid form data to the redux store", () => {

    expect((formSubmissionBtn.length)).toBe(1);
    expect(formSubmissionBtn.prop('type')).toBe('submit');

    formSubmissionBtn.simulate('click');

    expect(tempStore.getState().toJS().budgets.budgetItems[0]).toEqual(expectedBudget_1);
  });

  it("Sends new data into the form and adds an ADDITIONAL item into the redux store", () => {
    wrapper = setupMount(tempStore, expectedBudget_2);
    formSubmissionBtn = wrapper.find('[name="submit-budget-form"]');
    expect((formSubmissionBtn.length)).toBe(1);
    expect(formSubmissionBtn.prop('type')).toBe('submit');

    formSubmissionBtn.simulate('click');

    expect(tempStore.getState().toJS().budgets.budgetItems[0]).toEqual(expectedBudget_1);
    expect(tempStore.getState().toJS().budgets.budgetItems[1]).toEqual(expectedBudget_2);
  });
});
