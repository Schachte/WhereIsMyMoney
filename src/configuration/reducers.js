import { combineReducers } from 'redux-immutable';
import dashboard from '../Dashboard';
import budget from '../Budget';
import { reducer as formReducer } from 'redux-form/immutable';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  form: formReducer,
  dashboard: dashboard,
  budget: budget
});

export default rootReducer;
