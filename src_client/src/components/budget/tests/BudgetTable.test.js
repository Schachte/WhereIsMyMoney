import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Budget from '../Budget';
import AddBudgetForm from '../AddBudgetForm';
import BudgetTable from '../BudgetTable';
import Immutable from 'immutable';

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
const setup = (budgets = [], editingBudget = []) => {
  let props = {
   budgets: budgets,
   editBudget: (budget) => {},
   editingBudget: editingBudget
  };

  return shallow(<BudgetTable {...props} />);
};

/*****************************************
TESTS
*****************************************/
describe("Props render table correctly", () => {
  let wrapper = setup([expectedBudget_1, expectedBudget_2], [expectedBudget_1]);
  it("Yields the correct number of rows", () => {
    let tableElements = wrapper.find('.add-budget-table-row').length;
    expect(tableElements).toEqual(2);
  });
});

describe("Editing different budgets manipulates editable fields", () => {
  let wrapper = setup([expectedBudget_1, expectedBudget_2], expectedBudget_2);

  it("Ensures that only a single row of items are being edited", () => {
    expect(wrapper.find('[name="budgetCategoryEdit"]').length).toEqual(1);
    expect(wrapper.find('[name="budgetCostEdit"]').length).toEqual(1);
    expect(wrapper.find('[name="budgetDateEdit"]').length).toEqual(1);
  });

  it("Ensures that the type of editable fields are all correct", () => {
    expect(wrapper.find('[name="budgetCategoryEdit"]').type()).toBe('input');
    expect(wrapper.find('[name="budgetCostEdit"]').type()).toBe('input');
    expect(wrapper.find('[name="budgetDateEdit"]').type()).toBe('option');
  });

  it("Ensures the edited redux store is the edited row on page", () => {
    expect(
      wrapper.find('[name="budgetCategoryEdit"]').find('[placeholder]').props().placeholder
    ).toEqual(expectedBudget_2.budgetCategory);

    expect(
      wrapper.find('[name="budgetCostEdit"]').find('[placeholder]').props().placeholder
    ).toEqual(expectedBudget_2.budgetCost);
  });
});
