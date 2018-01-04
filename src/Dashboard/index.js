import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

/**************
INITIAL STATE
***************/
const INITIAL_STATE = Immutable.fromJS({
  headerLinks: [
    { title: "Home", location: "href"},
    { title: "Settings", location: "href"}
  ],
  sideLinks: [
    { title: "Dashboard", location: "href"},
    { title: "Budget", location: "href"},
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
