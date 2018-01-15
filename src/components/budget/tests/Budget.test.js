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
