import React from 'react';

export const validateForm = (fieldName, userInput, state) => {
  let errors = Object.assign({}, state.errors);

  Object.keys(state.budget).map(key => {
    if (state.budget[fieldName].trim() == "" && fieldName == "budgetCategory") {
      errors[fieldName] = `Do Not Leave Budget Category Empty`;

    } else if (state.budget[fieldName].trim() == "" && fieldName == "budgetCost") {
      errors[fieldName] = `Do Not Leave Budget Cost Empty`;

    } else {
      errors[fieldName] = "";
    }
  });

  if (fieldName == 'budgetCost' && isNaN(userInput)) {
    errors[fieldName] = `Only Insert Number/Decimal`;
  }

  if (fieldName == 'budgetDate' && userInput == "Select Day of Month Budget Item is Due") {
    errors[fieldName] = `Select A Valid Date`;
  }

  return errors;
};

export const checkIfFormIsValid = (formInput, state) => {

  let errors = Object.assign({}, state.errors);

  Object.keys(formInput).map(inputKey => {
    if (formInput[inputKey] == '' || formInput[inputKey] == undefined) {
      errors[inputKey] = 'Do Not Leave Field Blank';
    }
  });
  return {valid: checkIfJSONContainsErrors(errors), errors: errors};
};

export function checkIfJSONContainsErrors(errorObj) {
  return Object.keys(errorObj).every(function(x) {
    return errorObj[x] === '' || errorObj[x] === null;
  });
}
