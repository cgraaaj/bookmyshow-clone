import { API, request } from '../utils/api';
import {
  LOG_IN,
  LOG_OUT,
  HAMBURGER,
  GET_MOVIES,
  GET_SHOW,
  SET_TOAST,
  GET_SHOWS,
  SET_MODAL,
} from './types';
import {
  LOG_IN_API,
  LOG_OUT_API,
  MOVIES_DATA,
  SHOW_DATA,
} from '../utils/constants';

const onError = (dispatch, err) => {
  if (err.response) {
    if (err.response.status === 401) {
      dispatch({
        type: LOG_OUT,
        payload: {},
      });
    }
  }
  if (err.message) {
    setToast(dispatch, { message: err.message, type: 'warn' });
  }
};

export const login = (credentials) => async (dispatch) => {
  let response = '';
  try {
    response = await API.post(`${LOG_IN_API}`, {
      username: credentials.username,
      password: credentials.password,
    });
    const payload = {
      username: credentials.username,
      data: response.data,
    };
    dispatch({
      type: LOG_IN,
      payload,
    });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const logout = () => async (dispatch) => {
  let response = '';
  try {
    response = await API.post(`${LOG_OUT_API}`);
    dispatch({
      type: LOG_OUT,
      payload: {},
    });
    setToast(dispatch, { message: response.data.msg, type: 'success' });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const getMovies = () => async (dispatch) => {
  let response = '';
  try {
    response = await request({
      url: `${MOVIES_DATA}`,
    });
    response = await API.get(`${MOVIES_DATA}`);
    dispatch({
      type: GET_MOVIES,
      payload: response.data.data,
    });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const getShows = () => async (dispatch) => {
  let response = '';
  try {
    response = await request({
      url: `${SHOW_DATA}`,
    });
    response = await API.get(`${SHOW_DATA}`);
    dispatch({
      type: GET_SHOWS,
      payload: response.data.data,
    });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const getShow = (movieId) => async (dispatch) => {
  let response = '';
  try {
    response = await request({
      url: `${SHOW_DATA}/${movieId}`,
    });
    response = await API.get(`${SHOW_DATA}/${movieId}`);
    dispatch({
      type: GET_SHOW,
      payload: response.data,
    });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const onClickHamburger = () => {
  return {
    type: HAMBURGER,
    payload: {},
  };
};

export const setToast = (dispatch, toast) => {
  dispatch({
    type: SET_TOAST,
    payload: toast,
  });
};

export const setModal = (modal) => {
  return {
    type: SET_MODAL,
    payload: modal,
  };
};
