import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const request = async ({ ...options }) => {
  API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`;
  const onSuccess = (resp) => resp;
  const onError = (err) => {
    return err;
  };
  try {
    const resp = await API(options);
    return onSuccess(resp);
  } catch (err) {
    return onError(err);
  }
};
