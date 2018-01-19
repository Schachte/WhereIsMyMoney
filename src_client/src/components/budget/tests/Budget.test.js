import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Budget from '../Budget';
import AddBudgetForm from '../AddBudgetForm';

const setup = () => {
  let props = {
    budgetObject: {},
    budgets: [],
    actions: {addBudget: () => {}}
  };
  return shallow(<Budget {...props} />);
};

const setupMount = (budgetObject = { budgetCategory: 'budget category', budgetCost: 5, budgetDate: 3}, budgets=[]) => {
  let props = {
    budgetObject: budgetObject,
    budgets: budgets,
    actions: {addBudget: () => {}}
  };
  return mount(<Budget {...props} />);
};

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
TESTS
*****************************************/
describe("Rendering Budget component renders proper components", () => {
  let wrapper = setup();
  it("Doesn't explode upon rendering", () => {
    expect(wrapper.find('.budget-form-component').length).toBe(1);
  });

  it("Renders the Add Form Wrapper Div", () => {
    expect(wrapper.find('.budget-form-component').children().length).toBe(2);
  });

  it("Renders the Add Form Widget Card", () => {
    expect(wrapper.find('[name="budget-form-card"]').length).toBe(1);
  });

  it("Renders the Add Form Table Card", () => {
    expect(wrapper.find('[name="budget-form-table"]').length).toBe(1);
  });

});

describe("Rendered children components contain the right props", () => {
  it("Renders the correct props for the WidgetCard", () => {
    let wrapper = setup();
    expect(wrapper.find('[name="budget-form-card"]').props().name).toEqual('budget-form-card');
    expect(wrapper.find('[name="budget-form-card"]').props().iconName).toEqual('fa fa-credit-card');
    expect(wrapper.find('[name="budget-form-card"]').props().title.trim()).toEqual('Add New Budget Category');
    expect(wrapper.find('[name="budget-form-card"]').props().nestedComponent.type).toEqual(AddBudgetForm);
  });
});

describe("Submission of the form", () => {
  it("Propogates error into the state upon submission when empty fields are present", () => {
      let budgetObject = { budgetCategory: '', budgetCost: '', budgetDate: ''};
      let wrapper = setupMount(budgetObject);
      let expectedErrors = {
                      budgetCategory: 'Do Not Leave Field Blank',
                      budgetCost: 'Do Not Leave Field Blank',
                      budgetDate: 'Do Not Leave Field Blank'
                    };

      let formSubmissionBtn = wrapper.find('[name="submit-budget-form"]');
      expect((formSubmissionBtn.length)).toBe(1);
      expect(formSubmissionBtn.prop('type')).toBe('submit');
      formSubmissionBtn.simulate('click');

      expect(wrapper.state().errors).toEqual(expectedErrors);
  });
});

describe("Budget data from redux store renders into form on budget edit page", () => {
  let simulatedBudgets = [ expectedBudget_1, expectedBudget_2 ];
  let wrapper = setupMount(null, simulatedBudgets);

  it("Renders a valid bootstrap table", () => {
    expect(wrapper.find('.add-budget-table').length).toBe(1);
  });
});

describe("Budget table data renders nested information correctly", () => {
  it("Displays no budget message to user when no budgets exist in Redux store", () => {
    let wrapper = setupMount();
    expect(wrapper.find('[name="no-budgets-available"]').length).toEqual(1);
  });

  it("Doesn't display table error when data is present", () => {
    let simulatedBudgets = [ expectedBudget_1, expectedBudget_2 ];
    let wrapper = setupMount(null, simulatedBudgets);
    expect(wrapper.find('[name="no-budgets-available"]').length).toEqual(0);
  });
});
