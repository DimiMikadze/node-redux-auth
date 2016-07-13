import axios from 'axios';
import { API_URL } from '../config';
import {
  FETCH_USERS,
} from './types/index';

/**
 * Fetch all users
 */
export function fetchUsers() {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(API_URL, { headers: { authorization: user.token } })
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data,
        });
      });
  }
}
