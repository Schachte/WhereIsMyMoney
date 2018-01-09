import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

/**************
INITIAL STATE
***************/
const INITIAL_STATE = Immutable.fromJS({
  headerLinks: [
    { title: "Settings", location: "/settings"}
  ],
  sideLinks: [
    { title: "Dashboard", location: "/"},
    { title: "Budget", location: "/editBudget"},
    { title: "Virtual Accounts", location: "/viewAccounts"},
  ]
});

/**************
TYPES
***************/
export const TEST_ACTION = 'src/Dashboard/TEST_ACTION';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TEST_ACTION:
      console.log('actionpayload is: ' + action.payload)
      return state;
    default:
      return state;
  }
}

/**************
ACTIONS CREATORS
***************/
export const actionTest = createAction(TEST_ACTION);

/**************
ACTION REQUESTS
***************/
export function actionTestRequest(data) {
  console.log("We finally hit the request!");
  return (dispatch) => {
    dispatch(actionTest("this is a test"));
  }
}
