import { combineReducers } from 'redux-immutable';
import budgetReducer from './budgetReducer';

const rootReducer = combineReducers({
    budgets: budgetReducer
});

export default rootReducer;
