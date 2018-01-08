export function makeFieldEditable(fieldData, updateFieldEnableRequest, editable) {
  updateFieldEnableRequest({
    editable: editable,
    fieldName: fieldData.budgetName
  })
}

export function constructSubmittedFormObject(formObject) {
  let numberOfRelevantFormFields = 5;
  let disabledRadioButton = 3;

  let newFormSubmission = {
    budgetName: null,
    monthlyCost: null,
    rollOverEnabled: null,
    dueDate: null
  }

  Object.keys(formObject).forEach((formField) => {
    switch (Number(formField)) {
      case 0:
        newFormSubmission.budgetName = formObject[formField].value;
        break;
      case 1:
        newFormSubmission.monthlyCost = formObject[formField].value;
        break;
      case 2:
        newFormSubmission.rollOverEnabled = formObject[formField].value;
        break;
      case 4:
        newFormSubmission.dueDate = formObject[formField].value;
        break;
    }
  })
  return newFormSubmission;
}
export default {
  makeFieldEditable,
  constructSubmittedFormObject
};
