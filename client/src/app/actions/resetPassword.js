import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  AUTH_USER,
} from './types/index';

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  }
}

/**
 * Reset password
 */
export function resetPassword(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/reset-password`, props)
      .then(() => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });

        browserHistory.push(`/reduxauth/reset-password/verify?email=${props.email}`);
      })
      .catch(response => {
        dispatch(authError(RESET_PASSWORD_FAILURE, response.data.error))
      });
  }
}

/**
 * Verify Reset password
 */
export function verifyResetPassword(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/reset-password/verify`, props)
      .then(() => {
        dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS });
      })
      .catch(response => {
        dispatch(authError(VERIFY_RESET_PASSWORD_FAILURE, response.data.error));
      });
  }
}

/**
 * Reset password new
 */
export function resetPasswordNew(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/reset-password/new`, props)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push('/reduxauth/users');
      })
      .catch(response => dispatch(authError(VERIFY_RESET_PASSWORD_FAILURE, response.data)));
  }
}
