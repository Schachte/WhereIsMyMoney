import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddBudgetForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  categoryInput({input, type, label, meta: { touched, error }, ...custom}) {
    const hasError = touched && error !== undefined;
    const hasLabel = label !== undefined;
    return (
      <div style={{marginTop: '15px'}}>
        {hasLabel && <label>{label}</label>}
        <input
          id={label}
          className='form-control'
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
        {touched && error && <span>{error}</span>}
      </div>
    )
  };

  submit(dataValues) {
    const formData = dataValues.toJS();
    console.log(formData)
    this.props.addBudget({
      budgetName: formData.budgetCategory,
      monthlyCost: formData.budgetMonthlyCost,
      rollOverEnabled: formData.budgetRollover = (formData.budgetRollover == 'true'),
      dueDate: this.state.startDate.format('DD').toString()
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='form-group'>
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <Field name='budgetCategory' component={this.categoryInput} placeholder="Enter Category of Budget" label="Budget Category"/>
          <Field name='budgetMonthlyCost' component={this.categoryInput} placeholder="Enter Monthly Budget Cost" label="Monthly Budget: "/>
          <div style={{marginTop: '10px'}}>
            <label>Budget Rollover</label><br/>
            <label>
              <Field name='budgetRollover' checked="checked" component='input' type="radio" value={"true"} label="Budget Rollover Next Month" />
              {' '}
              Enable Budget Rollover
            </label>
            <label>
              <Field name='budgetRollover' component='input' type="radio" value={"false"} label="Budget Rollover Next Month" />
              {' '}
              Disable Budget Rollover
            </label>
          </div>
          <Field name='budgetDateDue' component={this.renderDatePicker.bind(this)} label="Day of Month Due" />
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

  if (!values.budgetCategory || values.budgetCategory.trim() === '') {
    errors.budgetCategory = 'Budget Category Required!';
  }

  return errors;
}

export default reduxForm({
  form: 'budgetForm',
  validate
})(AddBudgetForm);
