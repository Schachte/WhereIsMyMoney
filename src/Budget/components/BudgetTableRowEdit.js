import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/************************
FIELD-LEVEL VALIDATION
************************/
const checkDuplicateBudgetCategory = () => {
}

const checkNullFieldValue = () => {
}

class BudgetTableEdit extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      budgetName: this.props.budgetObject.budgetName,
      monthlyCost: this.props.budgetObject.monthlyCost,
      rollOverEnabled: this.props.budgetObject.rollOverEnabled,
      dueDate: this.props.budgetObject.dueDate
    };
  }

  handleDateChange(momentDate) {
    this.setState({ dueDate: momentDate.format('DD')})
  }

  handleBudgetNameChange(event) {
    this.setState({ budgetName: event.target.value});
  }

  handleMonthlyCostChange(event) {
    this.setState({ monthlyCost: event.target.value});
  }

  handlerollOverEnabledChange(event) {
    this.setState({ rollOverEnabled: !event.target.value })
  }

  renderDateField(fieldValue, fieldIndex, changeHandler) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <DatePicker className='form-control'
          style={{width: '100%'}}
          className='form-control'
          value = {this.state.dueDate}
          dateForm="MM/DD/YY"
          onChange={changeHandler}
         />
      </td>
    )
  }

  renderInputField(fieldValue, fieldIndex, changeHandler) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <input
          className='form-control'
          defaultValue={fieldValue}
          onChange={changeHandler}
        />
      </td>
    )
  }

  renderRadioButtonGroup(fieldValue, fieldIndex, changeHandler) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <input onChange={changeHandler} checked={this.state.rollOverEnabled} type="radio"  name="rollover" value={true}/>Enabled
        <input onChange={changeHandler}  checked={!this.state.rollOverEnabled} type="radio" name="rollover" value={false}/>Disabled
      </td>
    )
  }

  populateEditableFieldArea() {
    let budgetObject = this.props.budgetObject;

    let inputFieldIndicies = {
      budgetName: 0,
      monthlyCost: 1,
      rollOverEnabled: 2,
      dueDate: 3
    }

    return (
      Object.keys(budgetObject).map((budgetKey, fieldIndex) => {
        switch(fieldIndex) {
          case inputFieldIndicies.budgetName:
            return this.renderInputField(this.state.budgetName, fieldIndex, this.handleBudgetNameChange.bind(this))
            break;

          case inputFieldIndicies.monthlyCost:
            return this.renderInputField(this.state.monthlyCost, fieldIndex, this.handleMonthlyCostChange.bind(this))
            break;

          case inputFieldIndicies.rollOverEnabled:
            return this.renderRadioButtonGroup(this.state.rollOverEnabled, fieldIndex, this.handlerollOverEnabledChange.bind(this))
            break;

          case inputFieldIndicies.dueDate:
            return this.renderDateField(this.state.dueDate, fieldIndex, this.handleDateChange.bind(this))
            break;
        }
      })
    )
  }

  render() {
    const { budgetObject, toggleEditableRow, rowIndex, handleSubmit } = this.props;
    return (
      <tr>
        {this.populateEditableFieldArea()}
        <td>
          <button type="submit" onClick={(event) => this.props.submitEditedFormDataAndResetForm(event, this.state)} className="btn btn-primary">
            Save Budget
          </button>
        </td>
      </tr>
    )
  }
}

export default BudgetTableEdit;
