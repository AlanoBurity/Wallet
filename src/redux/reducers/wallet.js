import { GET, SAVE_EXPENSES, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET:
    return {
      ...state,
      currencies: [...action.data],
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses:
        [...state.expenses, { ...action.expenses, exchangeRates: action.response }],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...action.newTable],
    };
  default:
    return state;
  }
};

export default wallet;
