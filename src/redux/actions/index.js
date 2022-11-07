// Coloque aqui suas actions
export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_HAS_FINISHED = 'EDIT_EXPENSE_HAS_FINISHED';

export const addUserEmail = (email) => ({ type: ADD_USER_EMAIL, email });

export const addExpense = (obj) => ({ type: ADD_EXPENSE, obj });

export const deleteExpense = (obj) => ({ type: DELETE_EXPENSE, obj });

export const editExpense = (obj) => ({ type: EDIT_EXPENSE, obj });

export const editExpenseHasFinished = (obj) => ({ type: EDIT_EXPENSE_HAS_FINISHED, obj });

const fetchCurrency = (obj) => ({ type: ADD_CURRENCY, obj });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      dispatch(fetchCurrency(data));
    } catch (error) {
      console.log(error);
    }
  };
}
