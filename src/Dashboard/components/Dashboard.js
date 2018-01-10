import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTestRequest } from '..';
import  Budget from '../../Budget/components/Budget';
import { Link, NavLink, BrowserRouter as Router, withRouter } from 'react-router-dom';
import Immutable from 'immutable'

export const Sidebar = ((props) => {
  return (
    <div style={{float: 'left'}}>
      <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
          {props.links.map((link, i) => {
            return (
              <li key={`SIDEBAR_${i}`} className="nav-item">
                <NavLink exact className='nav-link' activeClassName='nav-link active' to={`${link.location}`}>
                  {link.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
})

export const Header =((props) => {
  return (
    <div>
      <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">WhereIsMyMoney</a>
        <div className="pull-right" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
              {props.links.map((link, i) => {
                return (
                  <li key={`HEADER_${i}`} className="nav-item">
                    <NavLink exact className='nav-link' activeClassName='nav-link active' to={`${link.location}`}>
                      {link.title}
                    </NavLink>
                  </li>
                )
              })}
          </ul>
        </div>
      </nav>
      </header>
     </div>
   )
})

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.sideBarLinks = this.props.sideBarLinks;
    this.headerBarLinks = this.props.headerBarLinks;
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
