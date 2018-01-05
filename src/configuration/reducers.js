import { combineReducers } from 'redux-immutable';
import dashboard from '../Dashboard';
import budget from '../Budget';
import { reducer as formReducer } from 'redux-form/immutable';

const rootReducer = combineReducers({
  form: formReducer,
  dashboard,
  budget
});

export default rootReducer;
