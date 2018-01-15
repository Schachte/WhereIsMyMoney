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

const setupMount = (budgetObject = { budgetCategory: 'budget category', budgetCost: 5, budgetDate: 3}) => {
  let props = {
    budgetObject: budgetObject,
    budgets: [],
    actions: {addBudget: () => {}}
  };
  return mount(<Budget {...props} />);
};

describe("Rendering Budget component renders proper components", () => {
  let wrapper = setup();
  it("Doesn't explode upon rendering", () => {
    expect(wrapper.find('.budget-form-component').length).toBe(1);
  });

  it("Renders the Add Form Wrapper Div", () => {
    expect(wrapper.find('.budget-form-component').children().length).toBe(1);
  });

  it("Renders the Add Form Widget Card", () => {
    expect(wrapper.find('[name="budget-form-card"]').length).toBe(1);
  });

  it("Renders the AddBudgetForm", () => {
    expect(wrapper.find('.budget-form-component').children().props().nestedComponent.type).toEqual(AddBudgetForm);
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
      let errors = {
                      budgetCategory: 'Do Not Leave Field Blank',
                      budgetCost: 'Do Not Leave Field Blank',
                      budgetDate: 'Do Not Leave Field Blank'
                    };
      let formSubmissionBtn = wrapper.find('[name="submit-budget-form"]');
      expect((formSubmissionBtn.length)).toBe(1);
      expect(formSubmissionBtn.prop('type')).toBe('submit');
      formSubmissionBtn.simulate('click');
      expect(wrapper.state().errors).toEqual(errors);
  });
});
