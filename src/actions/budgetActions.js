import * as types from './actionTypes';
import courseApi from '../mockAPI/mockCourseApi';
export function addBudget(budget) {
  return {
    type: types.ADD_BUDGET,
    payload: budget
  };
}

export function loadBudgetsSuccess(courses) {
  return { type:
    types.LOAD_COURSES_SUCCESS,
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
