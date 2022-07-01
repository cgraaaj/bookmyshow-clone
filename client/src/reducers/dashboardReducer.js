import { GET_MOVIES, GET_SHOWS, GET_SHOW, SET_MODAL } from '../actions/types';

const INTIAL_STATE = {
  movies: [],
  shows: [],
  selectedShow: {},
  modal: {
    flag: false,
    show: {},
  },
};

const dashboardReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, movies: action.payload };
    case GET_SHOWS:
      return { ...state, shows: action.payload };
    case GET_SHOW:
      console.log(action.payload);
      return {
        ...state,
        selectedShow: {
          ...action.payload,
          imageUrl: state.movies.filter(
            (m) => m.id === action.payload.movie_id
          )[0]['image'],
        },
      };
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return { ...state };
  }
};

export default dashboardReducer;
