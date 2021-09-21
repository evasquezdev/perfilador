import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';

import login from './login';

export default combineReducers({
  login,
  form: reducerForm,
});