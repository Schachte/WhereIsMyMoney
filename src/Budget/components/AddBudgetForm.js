import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

class AddBudgetForm extends Component {

  categoryInput({input, meta: { touched, error }, ...custom}) {
    const hasError = touched && error !== undefined;
    return (
      <div>
        <input
          error={hasError}
          placeholder='Insert Budget Category'
          {...input}
          {...custom}
        />
      </div>
    )
  }

  submit(dataValues) {
    console.log(dataValues.toJS());
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name='budgetCategory' component={this.categoryInput}/>
        <Field name='budgetMonthlyCost' component={this.categoryInput} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {};
  values = values.toJS();

  if (!values.budget || values.budget.trim() === '') {
    errors.budget = 'Budget Category Required!';
  }

  return errors;
}

export default reduxForm({
  form: 'budgetForm',
  validate
})(AddBudgetForm);
