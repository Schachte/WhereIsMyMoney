import React, { Component } from 'react';
import BudgetTableRowEdit from './BudgetTableRowEdit';
import { makeFieldEditable, constructSubmittedFormObject } from './BudgetHelpers';
import { BudgetTableRowView } from './BudgetTableRowView';

export default class BudgetTable extends Component {

  constructor(props) {
    super(props);
    this.toggleEditableRow = this.toggleEditableRow.bind(this);
    this.state = {
      formRowBeingEdited: -1
    }
  }

  toggleEditableRow(e, rowNum = -1) {
    e.preventDefault();
    this.setState({
      formRowBeingEdited: rowNum
    })
  }

  makeFormNonEditable() {
    this.setState({
      formRowBeingEdited: -1
    })
  }

  retrieveEditedFormRow() {
    return this.state.formRowBeingEdited;
  }

  renderBudgetRow() {
    return (
      this.props.userBudgetItems.map((budgetObject, rowIndex) => {
        if (this.state.formRowBeingEdited === rowIndex) {
          return (
            <BudgetTableRowEdit
              key={`EDIT_${rowIndex}`}
              budgetObject={budgetObject}
              toggleEditableRow={(e) => this.toggleEditableRow(e, rowIndex)}
              rowIndex={rowIndex}
              submitEditedFormDataAndResetForm={this.submitEditedFormDataAndResetForm.bind(this)}
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

  submitEditedFormDataAndResetForm(e, data) {
    e.preventDefault();
    this.props.updateBudgetEntry(
      constructSubmittedFormObject(data),
      this.retrieveEditedFormRow()
    );
    this.makeFormNonEditable();
  }

  render() {
    return (
        <div style={{width: '70%', margin: 'auto', marginTop: '3em'}}>
          <form>
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
