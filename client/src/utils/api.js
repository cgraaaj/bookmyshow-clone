import axios from 'axios';

export const API = axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  baseURL: process.env.REACT_APP_API,
});
