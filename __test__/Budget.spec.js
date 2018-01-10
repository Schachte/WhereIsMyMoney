import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
// import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configureStore } from '../src/configuration/store';
configure({ adapter: new Adapter() });

/**
BUDGET COMPONENTS
**/
import Budget from '../src/Budget/components/Budget';
import { BudgetWidgetCard } from '../src/Budget/components/Budget';

let mainHeaderTitle = 'Review Current Budget';
const store = configureStore();
const wrapper = shallow(<Budget />);

// Snapshot for Budget React Component
describe('>>>B U D G E T --- Snapshot',()=>{
  it('+++capturing Snapshot of Budget', () => {
      const wrapper = shallow(<Budget />);
      expect(wrapper).toMatchSnapshot();
    })
});

describe('>>>B U D G E T --- Elements Getting Rendered Correctly',()=>{
  it('+++correct title is getting rendered as header', () => {
      expect(wrapper.find('h1[name="main-header-title"]').text()).toEqual(mainHeaderTitle);
    })

  it('+++renders the budget widget items correctly', () => {
      expect(wrapper.find(BudgetWidgetCard).length).toEqual(4);
    })
});
