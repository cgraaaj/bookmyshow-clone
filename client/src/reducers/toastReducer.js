import { SET_TOAST } from '../actions/types';

const INTIAL_STATE = {
  message: '',
  type: '',
  options: {
    bodyStyle: { color: '#000000' },
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
};

const toastReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOAST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default toastReducer;
