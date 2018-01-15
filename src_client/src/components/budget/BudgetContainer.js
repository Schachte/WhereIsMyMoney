import Budget from './Budget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as budgetActions from '../../actions/budgetActions';

const mapStateToProps = (state) => {
  let initBudget = {budgetCategory: '', budgetCost: '', budgetDate: ''};
  return {
    budgetObject: initBudget,
    budgets: state.budgets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(budgetActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
