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

let sideBarLinkProp = [
        { title: "Dashboard", location: "/"},
        { title: "Budget", location: "/editBudget"},
        { title: "Virtual Accounts", location: "/viewAccounts"}
      ]

let headerLinkProp = [
        { title: "Settings", location: "/settings"}
      ]

const wrapper = mount(
  <Router>
    <Dashboard
      sideBarLinks={sideBarLinkProp}
      headerBarLinks={headerLinkProp}
    />
  </Router>
  );

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
      expect(wrapper.find('Header').prop('links')).toEqual(headerLinkProp);
   })
});

describe('>>>D A S H B O A R D --- Sidebar Links',()=>{
  it('+++Properly renders sidebar links into the page', () => {
      expect(wrapper.find('Sidebar').prop('links')).toEqual(sideBarLinkProp);
   })
});

describe('>>>D A S H B O A R D --- Sidebar Links Display Correct Information',()=>{
  it('+++ Properly displays sidebar links into panel with Link', () => {
      expect(wrapper.find('.sb-link').exists()).toEqual(true);
      expect(wrapper.find('.sb-link').children()).toHaveLength(3)

      wrapper.find('.sb-link').forEach((node, index) => {
        expect(node.text()).toEqual(sideBarLinkProp[index].title);
      })
   })
});

describe('>>>D A S H B O A R D --- Header Links Display Correct Information',()=>{
  it('+++ Properly displays header links into panel with Link', () => {
      expect(wrapper.find('.hdr-link').exists()).toEqual(true);
      expect(wrapper.find('.hdr-link').children()).toHaveLength(1)

      wrapper.find('.hdr-link').forEach((node, index) => {
        expect(node.text()).toEqual(headerLinkProp[index].title);
      })
   })
});
