import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
// import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import rootReducer from '../src/configuration/reducers';
import {
  INITIAL_STATE,
  addBudget
 } from '../src/Budget/index';
import Immutable from 'immutable'


/*****************
BUDGET COMPONENTS
******************/

import Budget from '../src/Budget/components/Budget';
import { BudgetWidgetCard } from '../src/Budget/components/Budget';

let mainHeaderTitle = 'Review Current Budget';
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

/***********************
TESTING THE REDUX STORE
***********************/

describe('>>>Redux Store for Budget Functionality', () => {
  it('Should successfully add a new budget into the store', () => {
    const store = createStore(rootReducer, Immutable.fromJS({}));

    const budgetCategory = {
      budgetName: 'budgetName',
      monthlyCost: '192',
      rollOverEnabled: "rollOverDisabled",
      dueDate: '02'
    }

    //Will auto dispatch since we are using redux-actions
    const action = addBudget(budgetCategory);
    const actual = store.getState().getIn(['budget', 'budgetCategories']).toJS()
    const expected = [
      {
        budgetName: 'budgetName',
        monthlyCost: '192',
        rollOverEnabled: 'rollOverDisabled',
        dueDate: '02'
      }
    ];

    expect(actual).toEqual(expected);
  })
})
