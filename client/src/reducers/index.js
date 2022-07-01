import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import headerReducer from './headerReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  header: headerReducer,
  toast: toastReducer,
});
