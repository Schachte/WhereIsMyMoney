import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { actionTestRequest } from '..';

function mapStateToProps(state) {
  return {
    headerBarLinks: state.getIn(['dashboard', 'headerLinks']).toJS(),
    sideBarLinks: state.getIn(['dashboard', 'sideLinks']).toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
      sideBarLinkGrabber: () => dispatch(actionTestRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
