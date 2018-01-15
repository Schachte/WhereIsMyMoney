//eslint-disable react/jsx-no-bind
import React, { Component, PropTypes } from 'react';
import Alert from '../common/Alert';
import TextInput from '../common/TextInput';

const renderDays = () => {
  return Array(31).fill().map((_, i = 1) => <option key={i+1}>{i+1}</option>);
};

const errorsInForm = errors => {
  let error = false;
  Object.keys(errors).map(item => {
    if (errors[item]) { error = true; }
  });

  return error;
};

const generateValidationError = (error, errorType) => {
  return (
    <span name={errorType + "_error"} style={{color: "red"}}>{error}</span>
  );
};

const AddBudgetForm = ({budget, onChange, onSave, errors}) => {
  return (
    <div name="AddBudgetForm">
      <form>
      {!errorsInForm(errors) &&
        <Alert
          name="add-budget-alert"
          alertType = "alert alert-info"
          fontAwesomeIcon = "fa fa-info"
          alertDescription = " Adding a budget is simple. Add a category such as groceries
          , allocate $200.00 per month and the day you'd like the budget to reset."
        />
      }

      {errorsInForm(errors) &&
        <Alert
          name="add-budget-alert"
          alertType = "alert alert-danger"
          fontAwesomeIcon = "fa fa-warning"
          alertDescription = " There are problems with the form submission. Ensure all values in the form are valid."
        />
      }

    <TextInput
        className="form-control"
        placeholder="Enter Name of Budget Category"
        onChange={onChange}
        value={budget.budgetCategory}
        name="budgetCategory"
      />
    {errors.budgetCategory != "" && generateValidationError(errors.budgetCategory, 'budgetCategory')}

      <div className="form-group input-group">
        <span className="input-group-addon"><i className="fa fa-usd"></i></span>
        <input
          className="form-control"
          placeholder="Monthly Budget Cost"
          onChange={onChange}
          value={budget.budgetCost}
          name="budgetCost"
        />
      </div>
    {errors.budgetCost != "" && generateValidationError(errors.budgetCost, 'budgetCost')}

      <select
        className="form-control"
        onChange={onChange}
        value={budget.budgetDate}
        name="budgetDate"
      >
        <option>Select Day of Month Budget Item is Due</option>
          {renderDays()}
      </select>
    {errors.budgetDate != "" && generateValidationError(errors.budgetDate, 'budgetDate')}

      <br/>
      {(!errorsInForm(errors)) &&
        <button name="submit-budget-form" className="btn btn-primary" type="submit" onClick={(e) => onSave(e, budget)}>Add Budget</button>
      }
      {(errorsInForm(errors)) &&
        <button name="submit-budget-form-disabled" className="btn btn-primary" type="submit" disabled>Fix Form Errors</button>
      }
      </form>
    </div>
  );
};

AddBudgetForm.propTypes = {
  budget: PropTypes.object,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  errors: PropTypes.object
};

export default AddBudgetForm;
