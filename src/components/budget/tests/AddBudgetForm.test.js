import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Budget from '../Budget';
import AddBudgetForm from '../AddBudgetForm';

const setup = (errors={}, budget={}) => {
  let props = {
    budget: budget, errors: errors,
    onChange: (e) => {props.budget.budgetCategory = e.target.value;},
    onSave: () => {}
  };

  return shallow(<AddBudgetForm {...props} />);
};

describe("Add Budget Form Gets Rendered Properly", () => {
  let wrapper = setup();
  it("Renders the form without the form exploding", () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it("Renders the alert notification onLoad", () => {
    let expectedNotificationProps = {
      name: 'add-budget-alert',
      alertType: 'alert alert-info',
      fontAwesomeIcon: 'fa fa-info',
      alertDescription: ' Adding a budget is simple. Add a category such as groceries , allocate $200.00 per month and the day you\'d like the budget to reset.'
    };

    let budgetNotifcation = wrapper.find('[name="add-budget-alert"]');
    expect(budgetNotifcation.length).toBe(1);
    expect(budgetNotifcation.props().name).toEqual(expectedNotificationProps.name);
    expect(budgetNotifcation.props().alertType).toEqual(expectedNotificationProps.alertType);
    expect(budgetNotifcation.props().fontAwesomeIcon).toEqual(expectedNotificationProps.fontAwesomeIcon);
    expect(budgetNotifcation.props().alertDescription).toEqual(expectedNotificationProps.alertDescription);
  });

  it("Renders error dialog when errors exist on form", () => {
    let errorWrapper = setup({budgetCategory: "error"});
    let expectedNotificationProps = {
      name:"add-budget-alert",
      alertType : "alert alert-danger",
      fontAwesomeIcon : "fa fa-warning",
      alertDescription : " There are problems with the form submission. Ensure all values in the form are valid."
    };

    let budgetNotifcation = errorWrapper.find('[name="add-budget-alert"]');
    expect(budgetNotifcation.length).toBe(1);
    expect(budgetNotifcation.props().name).toEqual(expectedNotificationProps.name);
    expect(budgetNotifcation.props().alertType).toEqual(expectedNotificationProps.alertType);
    expect(budgetNotifcation.props().fontAwesomeIcon).toEqual(expectedNotificationProps.fontAwesomeIcon);
    expect(budgetNotifcation.props().alertDescription).toEqual(expectedNotificationProps.alertDescription);
  });
});

describe("Fluctuating errors based on input values", () => {
  let errorObj = {
      budgetCategory: "Do Not Leave Budget Category Empty",
      budgetCost: "Do Not Leave Budget Cost Empty",
      budgetDate: "Select a valid budget date"
    };
  let errorWrapper = setup(errorObj);

  it("Renders error for budgetCost field when error prop is present", () => {
    expect(errorWrapper.find('[name="budgetCost_error"]').props().children).toEqual(errorObj.budgetCost);
  });
  it("Renders error for budgetCategory field when error prop is present", () => {
    expect(errorWrapper.find('[name="budgetCategory_error"]').props().children).toEqual(errorObj.budgetCategory);
  });
  it("Renders error for budgetDate field when error prop is present", () => {
    expect(errorWrapper.find('[name="budgetDate_error"]').props().children).toEqual(errorObj.budgetDate);
  });
});
