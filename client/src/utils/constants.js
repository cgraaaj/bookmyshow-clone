// export const

export const USER_DATA = '/user';
export const MOVIES_DATA =
  process.env.REACT_APP_ENV !== 'dev' ? '/api/movies' : '/movies';
export const SHOW_DATA =
  process.env.REACT_APP_ENV !== 'dev' ? '/api/theatre' : '/theatre';

export const FETCH_DATA_API =
  process.env.REACT_APP_ENV !== 'dev'
    ? '/api/historical-data'
    : '/historical-data';
export const GET_HOLDINGS =
  process.env.REACT_APP_ENV !== 'dev'
    ? '/api/portfolio/holdings'
    : '/portfolio/holdings';
export const PLACE_ORDER =
  process.env.REACT_APP_ENV !== 'dev'
    ? '/api/order/place_order'
    : '/order/place_order';
export const LOG_IN_API =
  process.env.REACT_APP_ENV !== 'dev' ? '/api/user/login' : '/user/login';
export const LOG_OUT_API =
  process.env.REACT_APP_ENV !== 'dev' ? '/api/user/logout' : '/user/logout';
