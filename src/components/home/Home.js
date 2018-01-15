import React, { Component } from 'react';
import { Link } from 'react-router';
import Cards from './Cards';
import BreadCrumb from '../common/Breadcrumb';

class Home extends Component {
  render() {
    return (
        <div className="container-fluid">
            <Cards />
            <BreadCrumb />
         </div>
    );
  }
}

export default Home;
