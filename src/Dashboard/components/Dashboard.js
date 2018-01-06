import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTestRequest } from '..';
import  Budget from '../../Budget/components/Budget';

import Immutable from 'immutable'
const renderLinks = (props) => {
}

const Sidebar = (props) => {
  return (
    <div style={{float: 'left'}}>
      <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
          {props.links.map((link, i) => {
            return (
              <li key={`SIDEBAR_${i}`} className="nav-item">
                <a className="nav-link" href="#">{link.title}</a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">FinEsse Budgeting Tool</a>
        <div className="pull-right" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
              {props.links.map((link, i) => {
                return (
                  <li key={`HEADER_${i}`} className="nav-item">
                    <a className="nav-link" href="#">{link.title}</a>
                  </li>
                )
              })}
          </ul>
        </div>
      </nav>
      </header>
     </div>
   )
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.sideBarLinks = this.props.sideBarLinks;
    this.headerBarLinks = this.props.headerBarLinks;
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Header links={this.headerBarLinks}/>
        <Sidebar links={this.sideBarLinks}/>
      </div>
    )
  }
}
