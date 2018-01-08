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
      rollOverEnabled: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      rollOverEnabled: this.props.budgetObject.rollOverEnabled
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  renderDateField(fieldValue, fieldIndex) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <DatePicker className='form-control' style={{width: '100%'}} className='form-control' value = {this.state.startDate.format('DD').toString()} dateForm="MM/DD/YYYY" onChange={this.handleChange} />
      </td>
    )
  };

  renderInputField(fieldValue, fieldIndex) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <input
          defaultValue={fieldValue}
        />
      </td>
    )
  }

  renderInputFieldCustom(fieldValue, fieldIndex) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <div className="input-group">
           <div className="input-group-prepend">@</div>
           <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Username"/>
         </div>
      </td>
    )
  }

  toggleRollover() {
    this.setState({rollOverEnabled: !this.state.rollOverEnabled})
  }

  renderRadioButtonGroup(fieldValue, fieldIndex) {
    return (
      <td key={`FIELD_INDEX_${fieldIndex}`}>
        <input onChange={this.toggleRollover.bind(this)} checked={this.state.rollOverEnabled} type="radio"  name="rollover" value="enabled"/> Enabled
        <input onChange={this.toggleRollover.bind(this)} type="radio" checked={!this.state.rollOverEnabled} name="rollover" value="disabled" /> Disabled
      </td>
    )
  }

  submit(e,data) {
    e.preventDefault();
  }

  populateEditableFieldArea() {
    let budgetObject = this.props.budgetObject;

    let inputFieldIndicies = {
      budgetCategory: 0,
      monthlyAmount: 1,
      rollOverEnabled: 2,
      dueDate: 3
    }

    return (
      Object.keys(budgetObject).map((budgetKey, fieldIndex) => {
        switch(fieldIndex) {
          case inputFieldIndicies.budgetCategory:
            return this.renderInputField(budgetObject[budgetKey], fieldIndex)
            break;

          case inputFieldIndicies.monthlyAmount:
            return this.renderInputFieldCustom(budgetObject[budgetKey], fieldIndex)
            break;

          case inputFieldIndicies.rollOverEnabled:
            return this.renderRadioButtonGroup(budgetObject[budgetKey], fieldIndex)
            break;

          case inputFieldIndicies.dueDate:
            return this.renderDateField(budgetObject[budgetKey], fieldIndex)
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
          <button type="button" className="btn btn-primary">
            Save Budget
          </button>
        </td>
      </tr>
    )
  }
}

export default BudgetTableEdit;
