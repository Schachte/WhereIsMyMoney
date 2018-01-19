/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react';
import { renderDays } from './AddBudgetForm';

let editedBudget = {
  budgetCategory: '',
  budgetCost: '',
  budgetDate: ''
};

export const onChangeEdit = (field, data) => {
  editedBudget[field] = data;
};

//TODO: REFACTOR THIS DUPLICATED SHIT CODE BELOW
let getBudgetItems = (budgets, editBudgetFn, editingBudget, clearEditedBudget, updateExistingBudget) => {

  return budgets.map((budget, key) => {
    if (editingBudget != null &&
      budget.budgetCategory == editingBudget.budgetCategory) {
    editedBudget = editingBudget;
      return (
        <tr className = "edit-budget-table-row" key={"budget_item_" + key}>
          <td>
            <div className="form-group">
              <input
                name = "budgetCategoryEdit"
                className="form-control"
                placeholder={editedBudget.budgetCategory}
                onChange={(data) => onChangeEdit("budgetCategory", data.target.value)}
              />
            </div>
          </td>
          <td>
            <div className="form-group input-group">
              <span className="input-group-addon"><i className="fa fa-usd"></i>
              </span>
              <input
                name="budgetCostEdit"
                className="form-control"
                type="text"
                placeholder={editedBudget.budgetCost}
                onChange={(data) => onChangeEdit("budgetCost", data.target.value)}
              />
            </div>
          </td>
          <td>
            <select
              className="form-control"
              onChange={(data) => onChangeEdit("budgetDate", data.target.value)}
            >
              <option
                name="budgetDateEdit"
                defaultValue={editedBudget.budgetDate}
                >
                {budget.budgetDate}
              </option>
                {renderDays()}
            </select>
            </td>
          <td>
            <button
              style={{"marginRight" : "5px"}}
              name="budget-save-changes"
              onClick={() => {updateExistingBudget(editedBudget); clearEditedBudget();}}
              className="btn btn-success">Save Budget
            </button>
            <button
              name="budget-clear-changes"
              onClick={() => {clearEditedBudget();}}
              className="btn btn-danger">Cancel Budget
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr className = "add-budget-table-row" key={"budget_item_" + key}>
        <td>{budget.budgetCategory}</td>
        <td>${budget.budgetCost}</td>
        <td>{budget.budgetDate}</td>
        <td><button
          name="budget-edit-btn"
          onClick={() => {editBudgetFn(budget);}}
          className="btn btn-primary">Edit Budget</button></td>
      </tr>
    );
  });
};

const RenderBudgetTable = ({ budgets, editBudget, editingBudget, clearEditedBudget, updateExistingBudget }) => {
  if (budgets.length == 0) {
    return (
      <h2 name="no-budgets-available">
        You have no budgets saved!<br/> Enter a budget above to view your budget structure
      </h2>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover add-budget-table">
        <thead>
          <tr>
            <th>Budget Name</th>
            <th>Monthly Cost</th>
            <th>Due Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getBudgetItems(budgets, editBudget, editingBudget, clearEditedBudget, updateExistingBudget)}
        </tbody>
      </table>
    </div>
  );
};

RenderBudgetTable.propTypes = {
  budgets : PropTypes.array,
  editBudget: PropTypes.func,
  editingBudget: PropTypes.object,
  clearEditedBudget: PropTypes.func,
  updateExistingBudget: PropTypes.func
};

export default RenderBudgetTable;
