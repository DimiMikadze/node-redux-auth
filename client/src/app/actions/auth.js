import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  VERIFY_EMAIL_ERROR,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index';

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Sign up
 */
export function signupUser(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/signup`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });

        browserHistory.push(`/signup/verify-email?email=${props.email}`);
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

/**
 * Resend verification code
 */
export function resendVerification(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/resend-verify-code`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(response => dispatch(authError(SIGNUP_RESEND_FAILURE, response.data)));
  }
}


/**
 * Verify email
 */
export function verifyEmail(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/signup/verify-email`, props)
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('user', JSON.stringify(response.data));

        browserHistory.push('/users');
      })
      .catch(response => dispatch(authError(VERIFY_EMAIL_ERROR, response.data.error)));
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  const { email, password } = props;

  return function (dispatch) {
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('user', JSON.stringify(response.data));

        browserHistory.push('/users');
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER,
  }
}
