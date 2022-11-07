// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCY,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_HAS_FINISHED } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isEditing: false,
  expenseIdToEdit: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCY: return {
    ...state,
    currencies: [...Object.keys(action.obj).filter((currency) => currency !== 'USDT')],
  };
  case ADD_EXPENSE: return {
    ...state,
    expenses: [...state.expenses, action.obj],
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: action.obj,
  };
  case EDIT_EXPENSE: return {
    ...state,
    isEditing: !state.isEditing,
    expenseIdToEdit: action.obj,
  };
  case EDIT_EXPENSE_HAS_FINISHED: return {
    ...state,
    expenses: action.obj,
    isEditing: false,
    expenseIdToEdit: '',
  };
  default: return state;
  }
}

export default wallet;
