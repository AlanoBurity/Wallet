// Coloque aqui suas actions
const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
};

export const setEmail = (email) => ({
  type: ACTIONS.SET_EMAIL,
  payload: email,
});

export default ACTIONS;
