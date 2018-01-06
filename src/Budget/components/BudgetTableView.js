import React, { Component } from 'react';

export default class BudgetTableView extends Component {

  constructor(props) {
    super(props);
  }

  gatherBudgetLineItem() {
    console.log(this.props.budgetCategories)
    return this.props.budgetCategories.map((budget, i) => {
      return (
        <tr key={`DISPLAYTABLE_${i}`}>
          <td>{budget.budgetName}</td>
          <td>{budget.monthlyCost}</td>
          <td>{budget.dueDate}</td>
          <td>{budget.rollOverEnabled == true ? "✓" : "✘"}</td>
          <td><button type='button' className='btn btn-info'>Edit</button></td>
          <td><button type='button' className='btn btn-danger'>Remove</button></td>
        </tr>
      )
    });
  }

  render() {
    return (
      <div style={{width: '70%', margin: 'auto', marginTop: '3em'}}>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Budget Category</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>RollOver Enabled</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.gatherBudgetLineItem()}
          </tbody>
      </table>
      </div>
    )
  };
}
