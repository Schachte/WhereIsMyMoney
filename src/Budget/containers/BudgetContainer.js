import { connect } from 'react-redux';
import Budget from '../components/Budget';

function mapStateToProps(state) {
  return {
    budgetCategories: state.getIn(['budget', 'budgetCategories']).toJS()
  }
}

export default connect(mapStateToProps)(Budget);
