import React, { Component } from 'react';
import { makeFieldEditable } from './BudgetHelpers';
import moment from 'moment';

export function BudgetTableRowView (props) {
  let rowIndex = props.rowIndex;
  let b = props.budgetObject;
  return (
    <tr>
      <td>{b.budgetName}</td>
      <td>${parseFloat(b.monthlyCost).toFixed(2)}</td>
      <td>{b.rollOverEnabled == true ? "Rollover Enabled" : "Rollover Disabled"}</td>
      <td>{b.dueDate}</td>
      <td><button className="btn btn-warning" type="submit" onClick={(e) => props.toggleEditableRow(e, rowIndex)}>Edit Budget Item</button></td>
    </tr>
  )
}
