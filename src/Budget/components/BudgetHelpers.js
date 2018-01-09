export function makeFieldEditable(fieldData, updateFieldEnableRequest, editable) {
  updateFieldEnableRequest({
    editable: editable,
    fieldName: fieldData.budgetName
  })
}

export function constructSubmittedFormObject(formObject) {
  let newFormSubmission = {}
  newFormSubmission.budgetName = formObject.budgetName;
  newFormSubmission.monthlyCost= formObject.monthlyCost;
  newFormSubmission.rollOverEnabled = formObject.rollOverEnabled;
  newFormSubmission.dueDate = formObject.dueDate;
  return newFormSubmission;
}

export function checkEditedFormForErrors(state) {
  console.log(state)
  return (state.budgetNameError == false && state.monthlyCostError == false);
}

export default {
  makeFieldEditable,
  constructSubmittedFormObject
};
