// Coloque aqui suas actions

const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
};

export const setEmail = (email) => ({
  type: ACTIONS.SET_EMAIL,
  payload: email,
});

export const REQUEST_API = 'REQUEST_API';

export const GET = 'GET';

export const requestAPI = () => ({ type: REQUEST_API });

export const saveCurr = (currencies) => ({ type: GET, data: currencies });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    return dispatch(saveCurr(Object.keys(data).filter((item) => item !== 'USDT')));
  };
}
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

const forexApi = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export const saveExpenses = (expenses, response) => ({
  type: SAVE_EXPENSES,
  expenses,
  response,
});

export const fetchExpense = (state) => async (dispatch) => {
  const response = await forexApi();
  return dispatch(saveExpenses(state, response));
};
export default ACTIONS;
