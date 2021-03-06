import * as types from './actionTypes';
import courseApi from '../mockAPI/mockCourseApi';

export function addBudget(budget) {
  return {
    type: types.ADD_BUDGET,
    payload: budget
  };
}

export function addBudgetEdit(budget) {
  return {
    type: types.ADD_BUDGET_EDIT,
    payload: budget
  };
}

export function clearEditedBudget() {
  return {
    type: types.ADD_BUDGET_EDIT
  };
}

export function updateExistingBudget(oldBudget, newBudget) {
  console.log(`Data is ${JSON.stringify(oldBudget)}`)
  console.log(`Data is ${JSON.stringify(newBudget)}`)
  return {
    type: types.UPDATE_EXISTING_BUDGET,
    payload: [oldBudget, newBudget]
  };
}

export function removeBudget(budget) {
  console.log(`Removing ${JSON.stringify(budget)}`)
  return {
    type: types.REMOVE_BUDGET,
    payload: budget
  };
}

export function loadBudgetsSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    payload: courses
  };
}

export function loadBudgets() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadBudgetsSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
