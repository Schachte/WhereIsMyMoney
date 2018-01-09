import React, { Component } from 'react';
import Dashboard from './Dashboard/containers/DashboardContainer';
import Budget from './Budget/containers/BudgetContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Dashboard />
            <Route path="/editBudget" component={Budget} />
          </div>
        </Router>
      </div>
    );
  }
}
