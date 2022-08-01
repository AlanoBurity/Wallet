import { GET, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
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
  default:
    return state;
  }
};

export default wallet;
