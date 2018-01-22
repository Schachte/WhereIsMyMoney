import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FullWidthCard from '../common/FullWidthCard';
import AddBudgetForm from './AddBudgetForm';
import RenderBudgetTable from './BudgetTable';
import Immutable from 'immutable';

import { validateForm,  checkIfFormIsValid } from './validation/AddBudgetFormValidation';

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: Object.assign({}, props.budgetObject),
      errors: {budgetCategory: '', budgetCost: '', budgetDate: ''}
    };
    this.updateBudgetFormAndAddressErrors = this.updateBudgetFormAndAddressErrors.bind(this);
    this.editBudget = this.editBudget.bind(this);
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
    } else {
      this.props.actions.addBudget(formData);
      this.setState({"budget": Object.assign({}, this.props.budgetObject)});
    }
  }

  editBudget(budgetObject) {
    this.props.actions.addBudgetEdit(budgetObject);
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

        <FullWidthCard
          name = "budget-form-table"
          title = "View Currently Saved Budgets"
          iconName = "fa fa-area-chart"
          nestedComponent = {
            <RenderBudgetTable
              budgets={this.props.budgets}
              editBudget={this.editBudget}
              editingBudget={this.props.editingBudget}
              clearEditedBudget={this.props.actions.clearEditedBudget}
              updateExistingBudget={this.props.actions.updateExistingBudget}
              removeBudget={this.props.actions.removeBudget}
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
  addBudget: PropTypes.func,
  budgets: PropTypes.array,
  editingBudget: PropTypes.object,
  clearEditedBudget: PropTypes.func
};

export default Budget;
