import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FullWidthCard from '../common/FullWidthCard';
import AddBudgetForm from './AddBudgetForm';
import { validateForm,  checkIfFormIsValid } from './validation/AddBudgetFormValidation';

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: Object.assign({}, props.budgetObject),
      errors:  {budgetCategory: '', budgetCost: '', budgetDate: ''}
    };
    this.updateBudgetFormAndAddressErrors = this.updateBudgetFormAndAddressErrors.bind(this);
    this.onBeforeSave = this.onBeforeSave.bind(this);
  }

  updateBudgetFormAndAddressErrors(event) {
    const userInput = event.target.value;
    const fieldName = event.target.name;
    let budget = this.state.budget;
    budget[fieldName] = userInput;
    this.setState({budget: budget});
    this.setState({errors: validateForm(fieldName, userInput, this.state)});
  }

  onBeforeSave(e, formData) {
    e.preventDefault();
    let formValidator = checkIfFormIsValid(formData, this.state);
    if (formValidator.valid == false) {
      this.setState({errors: formValidator.errors});
    }
  }

  render() {
    return (
      <div className="budget-form-component">
        <FullWidthCard
          name = "budget-form-card"
          title = " Add New Budget Category"
          iconName = "fa fa-credit-card"
          nestedComponent = {
            <AddBudgetForm
              budget={this.state.budget}
              onChange={this.updateBudgetFormAndAddressErrors}
              onSave={this.onBeforeSave}
              errors={this.state.errors}
            />
          }
        />
      </div>
    );
  }
}

Budget.propTypes = {
  actions: PropTypes.object,
  budgetObject: PropTypes.object,
  addBudget: PropTypes.func
};

export default Budget;
