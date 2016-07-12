/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import resetPasswordReducer from './resetPasswordReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  resetPass: resetPasswordReducer,
  user: userReducer
});

export default rootReducer;
