export function makeFieldEditable(fieldData, updateFieldEnableRequest, editable) {
  updateFieldEnableRequest({
    editable: editable,
    fieldName: fieldData.budgetName
  })
}
export default {
  makeFieldEditable
};
