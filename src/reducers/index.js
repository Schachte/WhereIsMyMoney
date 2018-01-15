import { combineReducers } from 'redux';
import budgetReducer from './budgetReducer';

const rootReducer = combineReducers({
    budgets: budgetReducer
});

export default rootReducer;
