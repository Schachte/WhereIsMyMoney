export function checkNullValues(state) {

  let errors = {
    budgetNameError: false,
    monthlyCostError: false
  }

  if (state.budgetName.trim() == "" || !state.budgetName) {
    errors.budgetNameError = true;
  }

  if (isNaN(state.monthlyCost) || !state.monthlyCost) {
    errors.monthlyCostError = true;
  }

  return errors;
}
