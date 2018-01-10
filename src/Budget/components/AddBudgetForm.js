import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddBudgetForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      rollOverEnabled: "rollOverEnabled"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleRollOverEnabledChange(data) {
    console.log(data.target.value);
    this.setState({
      rollOverEnabled: data.target.value
    })
  }

  categoryInput({input, type, label, meta: { touched, error }, ...custom}) {
    const hasError = touched && error !== undefined;
    const hasLabel = label !== undefined;
    return (
      <div style={{marginTop: '15px'}}>
        {touched && error && <span style={{color: 'red'}}>{error}</span>}
        <input
          id={label}
          className='form-control form-control-danger'
          {...input}
          {...custom}
        />
      </div>
    )
  }

  renderDatePicker({input, label, placeholder, meta: {touched, error} }) {
    const hasLabel = label !== undefined;
    return (
      <div>
        {hasLabel && <label>{label}</label>}
        <DatePicker id={label} className='form-control' {...input} value = {this.state.startDate.format('DD')} onChange={this.handleChange} />
        {touched && error && <span style={{color: 'red'}}>{error}</span>}
      </div>
    )
  };

  submit(dataValues) {
    const formData = dataValues.toJS();
    this.props.addBudget({
      budgetName: formData.budgetName,
      monthlyCost: formData.monthlyCost,
      rollOverEnabled:this.state.rollOverEnabled,
      dueDate: this.state.startDate.format('DD').toString()
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='form-group has-danger'>
        <form onSubmit={handleSubmit((e) => this.submit(e))}>
          <Field name='budgetName' component={this.categoryInput} placeholder="Enter Category of Budget" label="Budget Category"/>
          <Field name='monthlyCost' component={this.categoryInput} placeholder="Enter Monthly Budget Cost" label="Monthly Budget: "/>
          <div style={{marginTop: '10px'}}>
            <label>Budget Rollover</label><br/>
            <label>
              <Field name='rollOverEnabled' onChange={this.handleRollOverEnabledChange.bind(this)} checked={this.state.rollOverEnabled == "rollOverEnabled"} component='input' type="radio" value={"rollOverEnabled"} label="Budget Rollover Next Month" />
              {' '}
              Enable Budget Rollover
            </label>
            <label>
              <Field name='rollOverEnabled' onChange={this.handleRollOverEnabledChange.bind(this)} checked={this.state.rollOverEnabled == "rollOverDisabled"} component='input' type="radio" value={"rollOverDisabled"} label="Budget Rollover Next Month" />
              {' '}
              Disable Budget Rollover
            </label>
          </div>
          <Field name='dueDate' component={this.renderDatePicker.bind(this)} label="Day of Month Due" />
          <br/>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {};
  values = values.toJS();

  if (!values.budgetName || values.budgetName.trim() == "") {
    errors.budgetName = "Add Budget Name";
  }

  if (
      !values.monthlyCost               ||
      values.monthlyCost.trim() == ""   ||
      isNaN(values.monthlyCost)
    ) {
    errors.monthlyCost = "Enter Valid Monthly Budget Cost (ie. 450 or 550.40)";
  }

  return errors;
}

export default reduxForm({
  form: 'budgetForm',
  validate
})(AddBudgetForm);
