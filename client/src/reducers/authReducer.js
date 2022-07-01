import { LOG_IN, LOG_OUT } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['isSignedIn']
    : null,
  username: JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['username']
    : null,
  email: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      const user = { username: action.payload.username, isSignedIn: true };
      localStorage.setItem('user', JSON.stringify(user));
      return { ...state, isSignedIn: true, ...action.payload };
    case LOG_OUT:
      localStorage.clear();
      return {
        ...INTIAL_STATE,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
