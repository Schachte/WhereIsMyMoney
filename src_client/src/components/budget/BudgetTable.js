import React, { PropTypes } from 'react';

let getBudgetItems = (budgets) => {
  return budgets.map((budget, key) => {
    return (
      <tr className = "add-budget-table-row" key={"budget_item_" + key}>
        <td>{budget.budgetCategory}</td>
        <td>${budget.budgetCost}</td>
        <td>{budget.budgetDate}</td>
        <td><button className="btn btn-primary">Edit Budget</button></td>
      </tr>
    );
  });
};

const RenderBudgetTable = ({ budgets }) => {
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
              {getBudgetItems(budgets)}
            </tbody>
        </table>
    </div>
  );
};

RenderBudgetTable.propTypes = {
  budgets : PropTypes.array
};

export default RenderBudgetTable;
