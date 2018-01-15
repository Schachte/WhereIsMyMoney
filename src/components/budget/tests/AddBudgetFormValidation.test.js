import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { validateForm } from '../validation/AddBudgetFormValidation';

const validateFormInput = (fieldName=null, userInput=null, state={}) => {
  return validateForm(fieldName, userInput, state);
};

describe("Errors propogate based on different input conditions", () => {
  let errorMessages = {
    emptyBudgetCategory: 'Do Not Leave Budget Category Empty',
    emptyBudgetCost: 'Do Not Leave Budget Cost Empty',
    invalidBudgetCost: 'Only Insert Number/Decimal',
    invalidBudgetDate: 'Select A Valid Date'
  };

  it ("Returns a budget category error when the field is empty", () => {
    let fieldName = 'budgetCategory';
    let userInput = '';
    let state = {
      budget: {budgetCategory: "", budgetCost: "", budgetDate: ""},
      errors: {}
    };
    let formValidationErrors = validateFormInput(fieldName, userInput, state);
    expect(formValidationErrors.budgetCategory).toEqual(
      errorMessages.emptyBudgetCategory
    );
  });

  it ("Returns a budget category error AND budget cost when the field is empty", () => {
    let userInput = '';
    let state = {
      budget: {budgetCategory: "", budgetCost: "", budgetDate: ""},
      errors: {}
    };

    let formValidationErrors = validateFormInput('budgetCategory', userInput, state);
    expect(formValidationErrors.budgetCategory).toEqual(
      errorMessages.emptyBudgetCategory
    );

    // Send an already caught error in addition to another empty field
    // The idea for this is to check that two errors get returned
    // This solidifies that old calculated errors persist until fixed on form
    state.errors = formValidationErrors;
    formValidationErrors = validateFormInput('budgetCost', userInput, state);

    expect(formValidationErrors.budgetCost).toEqual(
      errorMessages.emptyBudgetCost
    );
    expect(formValidationErrors.budgetCategory).toEqual(
      errorMessages.emptyBudgetCategory
    );
  });
});
