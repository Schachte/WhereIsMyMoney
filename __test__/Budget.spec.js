import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import {Provider} from 'react-redux'
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import rootReducer from '../src/configuration/reducers';
import {
  INITIAL_STATE,
  addBudget,
  updateBudgetEntry
 } from '../src/Budget/index';
import Immutable from 'immutable'
import testHelper from './test_helper';
// import configureStore from 'redux-mock-store'
import { configureStore } from '../src/configuration/store';
import BudgetReducer from '../src/Budget';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

/*****************
BUDGET COMPONENTS
******************/
import Budget from '../src/Budget/components/Budget';
import { BudgetWidgetCard } from '../src/Budget/components/Budget';

let mainHeaderTitle = 'Review Current Budget';
let store;
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
  // beforeEach(() => {
  //   store = createStore(BudgetReducer, Immutable.fromJS({}), applyMiddleware(thunk));
  // })

  it('Should successfully add a new budget into the store', () => {
    let newBudgetCategory = testHelper.testBudgetCategory;

    let initial_state = Immutable.fromJS({
      budgetCategories: [],
    });

    let action = addBudget(newBudgetCategory);
    let budgetReducer = BudgetReducer(initial_state, action);

    const actual = budgetReducer.getIn(['budgetCategories']).toJS()
    const expected = [testHelper.testBudgetCategory];
    expect(actual).toEqual(expected);
  })

  it('Should successfully add a new budget then alter a budget within the Redux store', () => {
    // let budgetCategory = testHelper.testBudgetCategory;
    // let editedStateIndex = 1;
    //
    // //Add budget to the redux store
    // let action = addBudgetCategoryRequest(budgetCategory);
    // let actual = store.getState().getIn(['budget', 'budgetCategories']).toJS()
    // let expected = [testHelper.testBudgetCategory];
    //
    // expect(actual).toEqual(expected);

    //Update that newly added budget to an altered budget
    // action = updateBudgetEntry(editedStateIndex, testHelper.testBudgetCategoryAlteration);
    // addBudgetCategoryRequest(testHelper.testBudgetCategoryAlteration);

    // action = addBudget(testHelper.testBudgetCategoryAlteration).then(() => {
    //   console.log("Added successfully!");
    //     let newActual = store.getState().getIn(['budget']).toJS()
    //     console.log("The current value in the store is ");
    //     console.log(newActual);
    // });


  })
})
