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

  categoryInput({input, label, meta: { touched, error }, ...custom}) {
    const hasError = touched && error !== undefined;
    const hasLabel = label !== undefined;
    return (
      <div>
        {/*add any error logic here*/}
        {/*{hasError && <span>Hi</span>}*/}
        {hasLabel && <span>{label}</span>}
        <input
          className='test'
          {...input}
          {...custom}
        />
      </div>
    )
  }

  renderDatePicker({input, placeholder, meta: {touched, error} }) {
    return (
      <div>
            <DatePicker {...input} value = {this.state.startDate.toDate().toUTCString()} dateForm="MM/DD/YYYY" onChange={this.handleChange} />
            {touched && error && <span>{error}</span>}
      </div>
    )
  };

  submit(dataValues) {
    const formData = dataValues.toJS();
    this.props.addBudget({
      budgetName: formData.budgetCategory,
      monthlyCost: formData.budgetMonthlyCost,
      rollOverEnabled: formData.budgetRollover,
      dueDate: this.state.startDate.toDate().toUTCString()
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name='budgetCategory' component={this.categoryInput} placeholder="Enter Category of Budget"/>
        <Field name='budgetMonthlyCost' component={this.categoryInput} placeholder="Enter Monthly Budget Cost"/>
        <Field name='budgetRollover' component={this.categoryInput} type="checkbox" label="Budget Rollover Next Month" />
        <Field name='budgetDateDue' component={this.renderDatePicker.bind(this)}  />
        <button type='submit'>Submit</button>
      </form>
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
