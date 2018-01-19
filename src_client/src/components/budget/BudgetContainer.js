import Budget from './Budget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as budgetActions from '../../actions/budgetActions';
import Immutable from 'immutable';

const mapStateToProps = (state) => {
  let initBudget = {budgetCategory: '', budgetCost: '', budgetDate: ''};
  return {
    budgetObject: initBudget,
    budgets: state.getIn(['budgets', 'budgetItems']).toJS(),
    editingBudget: state.getIn(['budgets', 'editingBudget']).toJS()[0]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(budgetActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
