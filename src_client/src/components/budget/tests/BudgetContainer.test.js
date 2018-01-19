import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Budget from '../Budget';
import AddBudgetForm from '../AddBudgetForm';
import Immutable from 'immutable';
import { onChangeEdit } from '../BudgetTable';

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

let expectedBudget_3 = {
   budgetCategory: 'TEST_CATEGORY_3',
   budgetCost: '6.00',
   budgetDate: '30'
 };

/*****************************************
FULL JSDOM COMPONENT RENDER
*****************************************/
const setupMount = (
    tempStore = null,
    budgetObject = { budgetCategory: 'budget category', budgetCost: 5, budgetDate: 3 },
    budgets=[],
    editingBudget = {}
  ) => {
  let props = {

    editingBudget: editingBudget,
    budgetObject: budgetObject,
    budgets: budgets,
    actions: {
      addBudget: (formData) => {
        let addBudgetAction = budgetActions.addBudget(formData);
        tempStore.dispatch(addBudgetAction);
      },
      addBudgetEdit: (budgetObject) => {
        let addBudgetEdit = budgetActions.addBudgetEdit(budgetObject);
        tempStore.dispatch(addBudgetEdit);
      },
      updateExistingBudget: (budgetObject) => {
        let updateBudget = budgetActions.updateExistingBudget(budgetObject);
        tempStore.dispatch(updateBudget);
      },
      clearEditedBudget: () => {
        let clearBudget = budgetActions.clearEditedBudget();
        tempStore.dispatch(clearBudget);
      }
    }
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

describe("Clicking the 'Edit Budget' button on the budget page", () => {
  let tempStore = configureStore();
  let wrapper = setupMount(tempStore, expectedBudget_1, [expectedBudget_1]);
  let editBudgetBtn = wrapper.find('[name="budget-edit-btn"]');

  it("Shows a button on the page that allows the user to edit the budget", () => {
    expect(editBudgetBtn.length).toEqual(1);
  });

  it("Properly injects the selected budget into the redux store for further manipulation", () => {
    editBudgetBtn.simulate('click');
    expect(tempStore.getState().toJS().budgets.editingBudget[0]).toEqual(expectedBudget_1);
  });

  it("Properly alternates editing between different selected budget upon click", () => {
    tempStore = configureStore();
    wrapper = setupMount(tempStore, expectedBudget_1, [expectedBudget_1, expectedBudget_2]);
    editBudgetBtn = wrapper.find('[name="budget-edit-btn"]');

    // The proper edit budgets are getting rendered
    expect(editBudgetBtn.at(0).text()).toEqual('Edit Budget');
    expect(editBudgetBtn.at(1).text()).toEqual('Edit Budget');

    // Edit the first one and check redux store
    editBudgetBtn.at(0).simulate('click');
    expect(tempStore.getState().toJS().budgets.editingBudget[0]).toEqual(expectedBudget_1);

    // Edit a different one and see the only element in the store gets updated to new element
    editBudgetBtn.at(1).simulate('click');
    expect(tempStore.getState().toJS().budgets.editingBudget[0]).toEqual(expectedBudget_2);
  });

  it("Changes the original redux value in budgets to newly edited value from form edit", () => {
    tempStore = configureStore();
    wrapper = setupMount(tempStore, expectedBudget_3, [expectedBudget_3], expectedBudget_3);

    // Dispatch the add action
    let addBudgetAction = budgetActions.addBudget(expectedBudget_3);
    tempStore.dispatch(addBudgetAction);

    // Grab the matching piece of the redux store
    let actualStoreBudget = tempStore.getState().toJS().budgets.budgetItems[0];
    expect(expectedBudget_3).toEqual(actualStoreBudget);

    let expectedEditedBudget = {
      budgetCategory: 'Category Change',
      budgetCost: '56',
      budgetDate: '22'
    };

    expect(wrapper.find("[name='budget-save-changes']").length).toBe(1);

    // Programatically change the edited form values
    onChangeEdit('budgetCategory', expectedEditedBudget.budgetCategory);
    onChangeEdit('budgetCost', expectedEditedBudget.budgetCost);
    onChangeEdit('budgetDate', expectedEditedBudget.budgetDate);

    let saveChangesBtn = wrapper.find('[name="budget-save-changes"]');
    expect(saveChangesBtn.length).toEqual(1);

    saveChangesBtn.simulate('click');
    expect(tempStore.getState().toJS().budgets.budgetItems[0]).toEqual(expectedEditedBudget);
  });
});
