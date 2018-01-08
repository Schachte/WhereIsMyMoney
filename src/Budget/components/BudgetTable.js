import React, { Component } from 'react';
import BudgetTableRowEdit from './BudgetTableRowEdit';
import { makeFieldEditable, constructSubmittedFormObject } from './BudgetHelpers';
import { BudgetTableRowView } from './BudgetTableRowView';

export default class BudgetTable extends Component {

  constructor(props) {
    super(props);
    this.toggleEditableRow = this.toggleEditableRow.bind(this);
    this.state = {
      makeRowNumEditable: -1
    }
  }

  toggleEditableRow(e, rowNum = -1) {
    e.preventDefault();
    this.setState({
      makeRowNumEditable: rowNum
    })
  }

  renderBudgetRow() {
    return (
      this.props.userBudgetItems.map((budgetObject, rowIndex) => {
        if (this.state.makeRowNumEditable === rowIndex) {
          return (
            <BudgetTableRowEdit
              key={`EDIT_${rowIndex}`}
              budgetObject={budgetObject}
              toggleEditableRow={(e) => this.toggleEditableRow(e, rowIndex)}
              rowIndex={rowIndex}
             />
          )
        }
        else {
          return (
            <BudgetTableRowView
              key={`VIEW_${rowIndex}`}
              budgetObject={budgetObject}
              toggleEditableRow={this.toggleEditableRow}
              rowIndex={rowIndex}
            />
          )
        }
      })
    )
  }

  submitFormDataEditable(event) {
    event.preventDefault();
    let formObject = constructSubmittedFormObject(event.target);
    let editedStateIndex = this.state.makeRowNumEditable;
    this.props.updateBudgetEntry(formObject, editedStateIndex);

    this.setState({
      makeRowNumEditable: -1
    })
  }

  render() {
    return (
        <div style={{width: '70%', margin: 'auto', marginTop: '3em'}}>
          <form onSubmit={this.submitFormDataEditable.bind(this)}>
            <table className="table">
              <thead className="thead-inverse">
                <tr>
                  <th>Budget Category</th>
                  <th>Amount</th>
                  <th>RollOver Enabled</th>
                  <th>Due Date</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderBudgetRow()}
              </tbody>
            </table>
          </form>
        </div>
      )
    };
}
