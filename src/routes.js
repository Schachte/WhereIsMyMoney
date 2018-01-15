import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home/Home';
import BudgetContainer from './components/budget/BudgetContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="dashboard" component={Home} />
    <Route path="budget" component={BudgetContainer} />
  </Route>
);
