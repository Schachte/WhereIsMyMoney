import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/**
DASHBOARD COMPONENTS
**/
import Dashboard from '../src/Dashboard/components/Dashboard';
import Header from '../src/Dashboard/components/Dashboard';

// Snapshot for Dashboard React Component
describe('>>>D A S H B O A R D --- Snapshot',()=>{
  it('+++capturing Snapshot of Dashboard', () => {
      const wrapper = shallow(<Dashboard />);
      expect(wrapper).toMatchSnapshot();
    })
});

describe('>>>D A S H B O A R D --- Child Components Exist',()=>{
  it('+++renders header and sidebar link child components', () => {
      const wrapper = shallow(<Dashboard />);
      expect(wrapper.children()).toHaveLength(2);
    })
});

describe('>>>D A S H B O A R D --- Header Links',()=>{
  it('+++Properly renders header links into the page', () => {
      //Expect that a child component gets rendered successfully

      let linkProp = [
              { title: "Dashboard", location: "/"},
              { title: "Budget", location: "/editBudget"},
              { title: "Virtual Accounts", location: "/viewAccounts"}]

      const wrapper = mount(
        <Router>
          <Dashboard
            sideBarLinks={linkProp}
            headerBarLinks={linkProp}
          />
        </Router>
        );
        expect(wrapper.find('Header').prop('links')).toEqual(linkProp);
   })
});

describe('>>>D A S H B O A R D --- Sidebar Links',()=>{
  it('+++Properly renders sidebar links into the page', () => {
      //Expect that a child component gets rendered successfully

      let linkProp = [
              { title: "Dashboard", location: "/"},
              { title: "Budget", location: "/editBudget"},
              { title: "Virtual Accounts", location: "/viewAccounts"}]

      const wrapper = mount(
        <Router>
          <Dashboard
            sideBarLinks={linkProp}
            headerBarLinks={linkProp}
          />
        </Router>
        );
        expect(wrapper.find('Sidebar').prop('links')).toEqual(linkProp);
   })
});
