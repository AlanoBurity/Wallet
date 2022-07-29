import ACTIONS from '../actions';

const INITIAL_STATE = {
  email: '',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
