import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const SideBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <a className="navbar-brand" href="index.html"><i className="fa fa-fw fa-tasks"></i>WhereIsMyMoney</a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <Link to="/dashboard" className="nav-link">
              <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <i className="fa fa-fw fa-dashboard"></i>
                  <span className="nav-link-text"> Dashboard</span>
              </li>
          </Link>
          <Link to="/budget" className="nav-link">
              <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <i className="fa fa-fw fa-cart-plus"></i>
                  <span className="nav-link-text"> Budget</span>
              </li>
          </Link>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-toggle="modal">
              <i className="fa fa-fw fa-sign-out"></i>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
