import { connect } from 'react-redux';
import Budget from '../components/Budget';
import { bindActionCreators } from 'redux';
import {
  addBudgetCategoryRequest
} from '..';

const mapStateToProps = state => {
  return {
    budgetCategories: state.getIn(['budget', 'budgetCategories']).toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budget) => dispatch(addBudgetCategoryRequest(budget)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
