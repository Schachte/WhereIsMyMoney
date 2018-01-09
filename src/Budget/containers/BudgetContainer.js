import { connect } from 'react-redux';
import Budget from '../components/Budget';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import {
  addBudgetCategoryRequest,
  addEditableFieldErrors,
  updateBudgetEntry
} from '..';

/*********************************************************
Selectors To Pick Apart Redux State At More Granular Level
*********************************************************/
export const getBudgetCategories = (state) => state.getIn(['budget', 'budgetCategories']);

export const getNumberOfBudgetCategories = createSelector(
  getBudgetCategories,
  (budget) => {
    return budget.count()
  }
)

export const getTotalMonthlyBudget = createSelector(
   getBudgetCategories,
   (budget) => budget.toJS().reduce((totalsum, data) => parseInt(data.monthlyCost) + totalsum, 0)
)


const mapStateToProps = state => {
  console.log(getTotalMonthlyBudget(state))
  return {
    userBudgetItems: state.getIn(['budget', 'budgetCategories']).toJS(),
    budgetFormEditableErrors: state.getIn(['budget', 'budgetFormEditable', 'errors']).toJS()[0],
    reduxForm: state.getIn(['form']).toJS(),
    numberOfBudgets: getNumberOfBudgetCategories(state),
    monthlyBudget: getTotalMonthlyBudget(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budget) => dispatch(addBudgetCategoryRequest(budget)),
    addEditableFieldErrors: (field) => dispatch(addEditableFieldErrors(field)),
    updateBudgetEntry: (newBudget, editedStateIndex) => dispatch(updateBudgetEntry({newBudget, editedStateIndex})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
