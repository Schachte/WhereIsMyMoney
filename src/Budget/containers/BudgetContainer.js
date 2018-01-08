import { connect } from 'react-redux';
import Budget from '../components/Budget';
import { bindActionCreators } from 'redux';
import {
  addBudgetCategoryRequest,
  updateFieldEnableRequest
} from '..';

const mapStateToProps = state => {
  return {
    userBudgetItems: state.getIn(['budget', 'budgetCategories']).toJS(),
    budgetFormEditable: state.getIn(['budget', 'budgetFormEditable']).toJS(),
    reduxForm: state.getIn(['form']).toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budget) => dispatch(addBudgetCategoryRequest(budget)),
    updateFieldEnableRequest: (field) => dispatch(updateFieldEnableRequest(field)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
