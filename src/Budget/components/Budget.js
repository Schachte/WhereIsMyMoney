import React, { Component } from 'react';
import AddBudgetForm from './AddBudgetForm';
import BudgetTable from './BudgetTable';

const metaProperties = {
  pageTitle: 'Review Current Budget',
  budgetCardTitle: 'Add A New Budget Item'
}

const budgetWidgets = [
  'Monthly Budget',
  'Current Status',
  'Amount Left',
  'Avg. Weekly Spent'
];

const BudgetWidgetCard = (props) => {
  return (
    <div className="col-1 col-sm-3 placeholder" style={{float: 'left'}} key={`CARD_${props.i}`}>
      <div className="card card-inverse" style={{backgroundColor: "#333", borderColor: "#333", color: "#FFF", padding: "10px"}}>
        <div className="card-block">
          <h4 className="card-title">{props.title}</h4>
        </div>
      </div>
    </div>
  )
}

export default class Budget extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>{metaProperties.pageTitle}</h1>
          {budgetWidgets.map((widget, i) => {
            return <BudgetWidgetCard title={widget} key={i} />
          })}
          <div className="card" style={{width: '65%', margin: 'auto', marginTop: '150px'}}>
            <h3 className="card-header">{metaProperties.budgetCardTitle}</h3>
            <div className="card-block" style={{padding: '20px'}}>
              <AddBudgetForm addBudget={this.props.addBudget} />
            </div>
          </div>
          <div>
            <BudgetTable
              userBudgetItems={this.props.userBudgetItems}
              updateFieldEnableRequest={this.props.updateFieldEnableRequest}
              budgetFormEditable={this.props.budgetFormEditable}
              addEditableFieldErrors={this.props.addEditableFieldErrors}
              reduxForm={this.props.reduxForm}
              budgetFormEditableErrors={this.props.budgetFormEditableErrors}
              updateBudgetEntry={this.props.updateBudgetEntry}
            />
          </div>
        </main>
      </div>
    )
  }
}
