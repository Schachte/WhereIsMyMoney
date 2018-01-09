import { connect } from 'react-redux';
import Budget from '../components/Budget';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import {
  addBudgetCategoryRequest,
  addEditableFieldErrors,
  updateBudgetEntry
} from '..';

const mapStateToProps = state => {
  return {
    userBudgetItems: state.getIn(['budget', 'budgetCategories']).toJS(),
    budgetFormEditableErrors: state.getIn(['budget', 'budgetFormEditable', 'errors']).toJS()[0],
    reduxForm: state.getIn(['form']).toJS()
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
