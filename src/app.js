import React, { Component } from 'react';
import Dashboard from './Dashboard/containers/DashboardContainer';
import Budget from './Budget/containers/BudgetContainer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Budget />
      </div>
    );
  }
}
