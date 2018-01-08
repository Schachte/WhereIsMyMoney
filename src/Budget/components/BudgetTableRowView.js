import React, { Component } from 'react';
import { makeFieldEditable } from './BudgetHelpers';

export function BudgetTableRowView (props) {
  let rowIndex = props.rowIndex;
  let b = props.budgetObject;

  return (
    <tr>
      <td>{b.budgetName}</td>
      <td>{b.monthlyCost}</td>
      <td>{b.rollOverEnabled == true ? "Rollover Enabled" : "Rollover Disabled"}</td>
      <td>{b.dueDate}</td>
      <td><button className="btn btn-warning" type="submit" onClick={(e) => props.toggleEditableRow(e, rowIndex)}>Edit Budget Item</button></td>
    </tr>
  )
}
