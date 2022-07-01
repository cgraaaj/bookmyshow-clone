import { HAMBURGER } from '../actions/types';

const INTIAL_STATE = {
  isHamburgerActive: false,
};

const headerReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case HAMBURGER:
      return { ...state, isHamburgerActive: !state.isHamburgerActive };
    default:
      return state;
  }
};

export default headerReducer;
